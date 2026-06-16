import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Please provide a name, email address, and message." },
        { status: 400 }
      );
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    // If environment variables are unconfigured, run in mock diagnostic mode
    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        "EmailJS environment keys are not configured. Running /api/contact in MOCK fallback mode."
      );
      
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 800));

      return NextResponse.json(
        { 
          success: true, 
          mock: true, 
          message: "Message received in local diagnostic mock mode successfully." 
        },
        { status: 200 }
      );
    }

    // Call EmailJS REST API directly
    const emailJsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: name.trim(),
          from_email: email.trim(),
          message: message.trim()
        }
      })
    });

    if (!emailJsRes.ok) {
      const errorText = await emailJsRes.text();
      console.error("EmailJS dispatch failed:", errorText);
      throw new Error(`EmailJS server returned code: ${emailJsRes.status}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error in POST /api/contact proxy:", err);
    return NextResponse.json(
      { message: "Failed to dispatch email. Please try again later.", error: errorMessage },
      { status: 500 }
    );
  }
}
