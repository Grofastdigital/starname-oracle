
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
    console.log("=== PAYMENT FUNCTION DEBUG START ===");
    console.log("Request method:", req.method);
    console.log("Request headers:", Object.fromEntries(req.headers.entries()));
    
    // Check environment variables immediately
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const razorpayKeyId = Deno.env.get("RAZORPAY_KEY_ID");
    const razorpayKeySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    
    console.log("Environment check:");
    console.log("- SUPABASE_URL:", supabaseUrl ? "✓ Set" : "✗ Missing");
    console.log("- SUPABASE_ANON_KEY:", supabaseAnonKey ? "✓ Set" : "✗ Missing");
    console.log("- SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? "✓ Set" : "✗ Missing");
    console.log("- RAZORPAY_KEY_ID:", razorpayKeyId ? "✓ Set" : "✗ Missing");
    console.log("- RAZORPAY_KEY_SECRET:", razorpayKeySecret ? "✓ Set" : "✗ Missing");
    
    if (!supabaseUrl || !supabaseAnonKey) {
      const error = "Missing Supabase environment variables";
      console.error("CRITICAL ERROR:", error);
      return new Response(JSON.stringify({ error, debug: "supabase_env_missing" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    if (!razorpayKeyId || !razorpayKeySecret) {
      const error = "Missing Razorpay credentials";
      console.error("CRITICAL ERROR:", error);
      console.error("RAZORPAY_KEY_ID:", razorpayKeyId ? "Set" : "Missing");
      console.error("RAZORPAY_KEY_SECRET:", razorpayKeySecret ? "Set" : "Missing");
      return new Response(JSON.stringify({ 
        error, 
        debug: "razorpay_credentials_missing",
        details: {
          key_id_present: !!razorpayKeyId,
          key_secret_present: !!razorpayKeySecret
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log("✓ All environment variables present");

    // Initialize Supabase client
    let supabaseClient;
    try {
      supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
      console.log("✓ Supabase client initialized");
    } catch (error) {
      console.error("Failed to initialize Supabase client:", error);
      return new Response(JSON.stringify({ error: "Supabase initialization failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Get authenticated user
    const authHeader = req.headers.get("Authorization");
    console.log("Auth header present:", !!authHeader);
    
    if (!authHeader) {
      console.error("Missing Authorization header");
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("Token extracted, length:", token.length);

    let user;
    try {
      const { data, error: userError } = await supabaseClient.auth.getUser(token);
      if (userError) {
        console.error("User authentication error:", userError);
        return new Response(JSON.stringify({ error: `Authentication failed: ${userError.message}` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        });
      }
      
      user = data.user;
      if (!user) {
        console.error("No user returned from auth");
        return new Response(JSON.stringify({ error: "User not authenticated" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        });
      }
      
      console.log("✓ User authenticated:", user.id);
    } catch (error) {
      console.error("Exception during user authentication:", error);
      return new Response(JSON.stringify({ error: "Authentication exception" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
      console.log("✓ Request body parsed:", JSON.stringify(requestBody, null, 2));
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const { amount, credits, package_name } = requestBody;
    
    console.log("Request validation:");
    console.log("- amount:", amount, typeof amount);
    console.log("- credits:", credits, typeof credits);
    console.log("- package_name:", package_name, typeof package_name);
    
    if (!amount || !credits || !package_name) {
      const error = "Missing required fields: amount, credits, or package_name";
      console.error("Validation error:", error);
      return new Response(JSON.stringify({ 
        error,
        received: { amount, credits, package_name }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    console.log("✓ Request validated");

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

    console.log("Creating Razorpay order:");
    console.log("- Order data:", JSON.stringify(orderData, null, 2));
    console.log("- Using Key ID:", razorpayKeyId);
    console.log("- Key Secret length:", razorpayKeySecret.length);

    // Create Basic Auth header
    let encodedAuth;
    try {
      const authString = `${razorpayKeyId}:${razorpayKeySecret}`;
      encodedAuth = btoa(authString);
      console.log("✓ Auth header created, length:", encodedAuth.length);
    } catch (error) {
      console.error("Failed to create auth header:", error);
      return new Response(JSON.stringify({ error: "Auth header creation failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    
    console.log("Making request to Razorpay API...");

    let razorpayResponse;
    try {
      razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${encodedAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      
      console.log("Razorpay response received:");
      console.log("- Status:", razorpayResponse.status);
      console.log("- Status text:", razorpayResponse.statusText);
      console.log("- Headers:", Object.fromEntries(razorpayResponse.headers.entries()));
      
    } catch (error) {
      console.error("Network error calling Razorpay API:", error);
      return new Response(JSON.stringify({ 
        error: "Network error calling Razorpay API",
        details: error.message 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    let responseText;
    try {
      responseText = await razorpayResponse.text();
      console.log("Razorpay response body:", responseText);
    } catch (error) {
      console.error("Failed to read Razorpay response:", error);
      return new Response(JSON.stringify({ error: "Failed to read Razorpay response" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    if (!razorpayResponse.ok) {
      console.error("Razorpay API error:");
      console.error("- Status:", razorpayResponse.status);
      console.error("- Response:", responseText);
      
      let errorDetails;
      try {
        errorDetails = JSON.parse(responseText);
      } catch {
        errorDetails = { raw_response: responseText };
      }
      
      return new Response(JSON.stringify({ 
        error: `Razorpay API error (${razorpayResponse.status})`,
        razorpay_error: errorDetails,
        debug_info: {
          key_id: razorpayKeyId,
          request_data: orderData
        }
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    let order;
    try {
      order = JSON.parse(responseText);
      console.log("✓ Razorpay order created successfully:", JSON.stringify(order, null, 2));
    } catch (error) {
      console.error("Failed to parse Razorpay response:", error);
      return new Response(JSON.stringify({ error: "Invalid Razorpay response format" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Store payment record in Supabase using service role
    if (!supabaseServiceKey) {
      console.error("Missing SUPABASE_SERVICE_ROLE_KEY");
      return new Response(JSON.stringify({ error: "Missing service role key" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    let supabaseService;
    try {
      supabaseService = createClient(
        supabaseUrl,
        supabaseServiceKey,
        { auth: { persistSession: false } }
      );
      console.log("✓ Service role client initialized");
    } catch (error) {
      console.error("Failed to initialize service role client:", error);
      return new Response(JSON.stringify({ error: "Service client initialization failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log("Inserting payment record...");
    try {
      const { error: insertError } = await supabaseService.from("payments").insert({
        user_id: user.id,
        razorpay_order_id: order.id,
        amount: amount,
        credits_purchased: credits,
        status: "pending"
      });

      if (insertError) {
        console.error("Error inserting payment record:", insertError);
        return new Response(JSON.stringify({ 
          error: `Failed to create payment record: ${insertError.message}`,
          details: insertError
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }

      console.log("✓ Payment record created successfully");
    } catch (error) {
      console.error("Exception inserting payment record:", error);
      return new Response(JSON.stringify({ error: "Payment record insertion exception" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

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

    console.log("✓ Success! Sending response:", JSON.stringify(responseData, null, 2));
    console.log("=== PAYMENT FUNCTION DEBUG END ===");

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("=== PAYMENT FUNCTION CRITICAL ERROR ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Error properties:", Object.getOwnPropertyNames(error));
    
    return new Response(JSON.stringify({ 
      error: error.message || "Unknown error occurred",
      type: error.constructor.name,
      debug: "critical_exception"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
