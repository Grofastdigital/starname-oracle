
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  email: string;
  astrologerName: string;
  date: string;
  time: string;
  consultationType: string;
  price: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, astrologerName, date, time, consultationType, price }: BookingEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "AstroName Oracle <onboarding@resend.dev>",
      to: [email],
      subject: "🌟 Booking Confirmation - Astrologer Consultation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;">
          <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #6366f1; margin: 0; font-size: 28px;">⭐ AstroName Oracle ⭐</h1>
              <p style="color: #666; font-size: 16px; margin: 10px 0;">Astrologer Consultation Confirmed</p>
            </div>

            <div style="background: #f0f9ff; padding: 25px; border-radius: 10px; border-left: 4px solid #6366f1;">
              <h2 style="color: #1e40af; margin-top: 0;">✅ Your Consultation is Confirmed!</h2>
              <p style="font-size: 16px; color: #374151;">Thank you for booking with AstroName Oracle. Here are your consultation details:</p>
            </div>

            <div style="background: #fef3c7; padding: 20px; border-radius: 10px; margin: 25px 0;">
              <h3 style="color: #7c3aed; margin-top: 0;">📋 Consultation Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Astrologer:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${astrologerName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Date:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Time:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${time}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Consultation Type:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${consultationType}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;"><strong>Total Amount:</strong></td>
                  <td style="padding: 10px 0; color: #059669; font-weight: bold;">₹${price}</td>
                </tr>
              </table>
            </div>

            <div style="background: #ecfdf5; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
              <h3 style="color: #059669; margin-top: 0;">📝 Important Instructions</h3>
              <ul style="color: #374151; line-height: 1.6;">
                <li>Please be available 5 minutes before your scheduled time</li>
                <li>Keep your birth details ready for accurate consultation</li>
                <li>For video calls, ensure stable internet connection</li>
                <li>You will receive a reminder 30 minutes before the session</li>
                <li>To reschedule, contact us at least 2 hours in advance</li>
              </ul>
            </div>

            <div style="text-align: center; background: #f8fafc; padding: 20px; border-radius: 10px;">
              <h3 style="color: #6366f1; margin-top: 0;">🔮 What to Expect</h3>
              <p style="color: #374151; margin: 10px 0;">Your astrologer will provide personalized insights based on your birth chart, lucky numbers, planetary positions, and cosmic influences for name selection.</p>
            </div>

            <div style="text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
              <p style="color: #666; font-style: italic;">✨ AstroName Oracle - Unveiling Cosmic Secrets ✨</p>
              <p style="color: #666; font-size: 14px;">For support: support@astroname-oracle.com</p>
            </div>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
