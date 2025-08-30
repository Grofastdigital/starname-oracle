
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
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();

    // Verify payment with Razorpay
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    
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

    if (expectedSignature !== razorpay_signature) {
      throw new Error("Invalid payment signature");
    }

    // Update payment status and add credits
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get payment record to know credits to add
    const { data: payment, error: paymentError } = await supabaseService
      .from("payments")
      .select("credits_purchased")
      .eq("razorpay_order_id", razorpay_order_id)
      .eq("user_id", user.id)
      .single();

    if (paymentError || !payment) {
      throw new Error("Payment record not found");
    }

    // Update payment status
    const { error: updatePaymentError } = await supabaseService
      .from("payments")
      .update({
        razorpay_payment_id,
        status: "completed"
      })
      .eq("razorpay_order_id", razorpay_order_id);

    if (updatePaymentError) {
      throw new Error("Failed to update payment status");
    }

    // Add credits to user profile
    const { data: profile, error: profileError } = await supabaseService
      .from("user_profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (profileError) {
      throw new Error("Failed to get user profile");
    }

    const { error: creditUpdateError } = await supabaseService
      .from("user_profiles")
      .update({
        credits: profile.credits + payment.credits_purchased
      })
      .eq("id", user.id);

    if (creditUpdateError) {
      throw new Error("Failed to update user credits");
    }

    return new Response(JSON.stringify({ 
      success: true,
      credits_added: payment.credits_purchased,
      new_credit_balance: profile.credits + payment.credits_purchased
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
