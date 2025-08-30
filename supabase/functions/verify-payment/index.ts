
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
    console.log("=== Payment Verification Started ===");
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase environment variables");
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

    console.log("Verifying payment for user:", user.id);

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();
    
    console.log("Payment details:", {
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      signature: razorpay_signature?.substring(0, 10) + "..."
    });

    // Verify payment with Razorpay
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    
    if (!razorpayKeySecret) {
      throw new Error("Razorpay key secret not configured");
    }
    
    // Create signature for verification
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

    console.log("Signature verification result:", expectedSignature === razorpay_signature);

    if (expectedSignature !== razorpay_signature) {
      throw new Error("Invalid payment signature");
    }

    // Update payment status and add credits using service role
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
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

    console.log("Found payment record with credits:", payment.credits_purchased);

    // Update payment status
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

    console.log("Payment status updated to completed");

    // Add credits to user profile
    const { data: profile, error: profileError } = await supabaseService
      .from("user_profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Failed to get user profile:", profileError);
      throw new Error("Failed to get user profile");
    }

    const newCreditBalance = profile.credits + payment.credits_purchased;
    console.log("Updating user credits from", profile.credits, "to", newCreditBalance);

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

    console.log("Credits updated successfully");

    const responseData = {
      success: true,
      credits_added: payment.credits_purchased,
      new_credit_balance: newCreditBalance
    };

    console.log("Payment verification completed:", responseData);

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("=== Payment Verification Error ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
