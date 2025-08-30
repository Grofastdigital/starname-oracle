
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== Razorpay Payment Function Started ===");
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    
    console.log("Supabase URL:", supabaseUrl);
    console.log("Supabase Anon Key exists:", !!supabaseAnonKey);
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    console.log("Auth header exists:", !!authHeader);
    
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) {
      console.error("User authentication error:", userError);
      throw new Error(`Authentication failed: ${userError.message}`);
    }
    
    const user = data.user;
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    console.log("Authenticated user ID:", user.id);

    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
      console.log("Request body:", requestBody);
    } catch (error) {
      console.error("Failed to parse request body:", error);
      throw new Error("Invalid request body");
    }

    const { amount, credits, package_name } = requestBody;
    
    if (!amount || !credits || !package_name) {
      throw new Error("Missing required fields: amount, credits, or package_name");
    }

    console.log("Payment details:", { amount, credits, package_name });

    // Get Razorpay credentials
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    console.log("Razorpay Key ID:", razorpayKeyId);
    console.log("Razorpay Key Secret exists:", !!razorpayKeySecret);

    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error("Missing Razorpay credentials");
      throw new Error("Razorpay credentials not configured");
    }

    // Create Razorpay order
    const orderData = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `order_${Date.now()}_${user.id.substring(0, 8)}`,
      notes: {
        user_id: user.id,
        credits: credits.toString(),
        package_name: package_name
      }
    };

    console.log("Creating Razorpay order with data:", orderData);

    // Create Basic Auth header
    const authString = `${razorpayKeyId}:${razorpayKeySecret}`;
    const encodedAuth = btoa(authString);
    
    console.log("Making request to Razorpay API...");

    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${encodedAuth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    console.log("Razorpay response status:", razorpayResponse.status);
    console.log("Razorpay response headers:", Object.fromEntries(razorpayResponse.headers.entries()));

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error("Razorpay API error response:", errorText);
      throw new Error(`Razorpay API error (${razorpayResponse.status}): ${errorText}`);
    }

    const order = await razorpayResponse.json();
    console.log("Razorpay order created successfully:", order);

    // Store payment record in Supabase using service role
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseServiceKey) {
      throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
    }

    const supabaseService = createClient(
      supabaseUrl,
      supabaseServiceKey,
      { auth: { persistSession: false } }
    );

    console.log("Inserting payment record...");

    const { error: insertError } = await supabaseService.from("payments").insert({
      user_id: user.id,
      razorpay_order_id: order.id,
      amount: amount,
      credits_purchased: credits,
      status: "pending"
    });

    if (insertError) {
      console.error("Error inserting payment record:", insertError);
      throw new Error(`Failed to create payment record: ${insertError.message}`);
    }

    console.log("Payment record created successfully");

    // Prepare response data
    const responseData = {
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: razorpayKeyId
      },
      user: {
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email,
        contact: user.user_metadata?.phone || ''
      },
      package: {
        name: package_name,
        credits: credits
      }
    };

    console.log("Sending successful response:", responseData);

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("=== Payment Function Error ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      details: "Check edge function logs for more information"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
