
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== PAYMENT VERIFICATION DEBUG START ===");
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    
    console.log("Environment check:");
    console.log("- SUPABASE_URL:", supabaseUrl ? "✓ Set" : "✗ Missing");
    console.log("- SUPABASE_ANON_KEY:", supabaseAnonKey ? "✓ Set" : "✗ Missing");
    console.log("- SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? "✓ Set" : "✗ Missing");
    console.log("- RAZORPAY_KEY_SECRET:", razorpayKeySecret ? "✓ Set" : "✗ Missing");
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase environment variables");
    }

    if (!razorpayKeySecret) {
      console.error("RAZORPAY_KEY_SECRET is missing");
      throw new Error("Razorpay key secret not configured");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user) {
      throw new Error("User not authenticated");
    }

    console.log("✓ User authenticated:", user.id);

    let requestBody;
    try {
      requestBody = await req.json();
      console.log("Payment verification request:", JSON.stringify(requestBody, null, 2));
    } catch (error) {
      console.error("Failed to parse request body:", error);
      throw new Error("Invalid request body");
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = requestBody;
    
    console.log("Verification data:");
    console.log("- payment_id:", razorpay_payment_id);
    console.log("- order_id:", razorpay_order_id);
    console.log("- signature present:", !!razorpay_signature);

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      throw new Error("Missing payment verification data");
    }

    // Verify payment signature with Razorpay
    console.log("Verifying payment signature...");
    
    try {
      const crypto = await import("https://deno.land/std@0.190.0/crypto/mod.ts");
      const encoder = new TextEncoder();
      const key = await crypto.crypto.subtle.importKey(
        "raw",
        encoder.encode(razorpayKeySecret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      
      const signature = await crypto.crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(`${razorpay_order_id}|${razorpay_payment_id}`)
      );
      
      const expectedSignature = Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      console.log("Signature verification:");
      console.log("- Expected signature:", expectedSignature.substring(0, 10) + "...");
      console.log("- Received signature:", razorpay_signature.substring(0, 10) + "...");
      console.log("- Match:", expectedSignature === razorpay_signature);

      if (expectedSignature !== razorpay_signature) {
        console.error("Signature verification failed");
        throw new Error("Invalid payment signature");
      }

      console.log("✓ Payment signature verified");
    } catch (error) {
      console.error("Signature verification error:", error);
      throw new Error(`Signature verification failed: ${error.message}`);
    }

    // Update payment status and add credits using service role
    if (!supabaseServiceKey) {
      throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
    }

    const supabaseService = createClient(
      supabaseUrl,
      supabaseServiceKey,
      { auth: { persistSession: false } }
    );

    // Get payment record to know credits to add
    console.log("Fetching payment record...");
    const { data: payment, error: paymentError } = await supabaseService
      .from("payments")
      .select("credits_purchased")
      .eq("razorpay_order_id", razorpay_order_id)
      .eq("user_id", user.id)
      .single();

    if (paymentError || !payment) {
      console.error("Payment record not found:", paymentError);
      throw new Error("Payment record not found");
    }

    console.log("✓ Found payment record:", JSON.stringify(payment, null, 2));

    // Update payment status
    console.log("Updating payment status...");
    const { error: updatePaymentError } = await supabaseService
      .from("payments")
      .update({
        razorpay_payment_id,
        status: "completed"
      })
      .eq("razorpay_order_id", razorpay_order_id);

    if (updatePaymentError) {
      console.error("Failed to update payment status:", updatePaymentError);
      throw new Error("Failed to update payment status");
    }

    console.log("✓ Payment status updated to completed");

    // Add credits to user profile
    console.log("Fetching user profile...");
    const { data: profile, error: profileError } = await supabaseService
      .from("user_profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Failed to get user profile:", profileError);
      throw new Error("Failed to get user profile");
    }

    console.log("Current user profile:", JSON.stringify(profile, null, 2));

    const newCreditBalance = profile.credits + payment.credits_purchased;
    console.log("Updating credits:", profile.credits, "→", newCreditBalance);

    const { error: creditUpdateError } = await supabaseService
      .from("user_profiles")
      .update({
        credits: newCreditBalance
      })
      .eq("id", user.id);

    if (creditUpdateError) {
      console.error("Failed to update user credits:", creditUpdateError);
      throw new Error("Failed to update user credits");
    }

    console.log("✓ Credits updated successfully");

    const responseData = {
      success: true,
      credits_added: payment.credits_purchased,
      new_credit_balance: newCreditBalance
    };

    console.log("✓ Payment verification completed:", JSON.stringify(responseData, null, 2));
    console.log("=== PAYMENT VERIFICATION DEBUG END ===");

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("=== PAYMENT VERIFICATION ERROR ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      type: error.constructor.name,
      debug: "verification_exception"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
