import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  inquiryType: string;
  message: string;
  consent: boolean;
  honeypot?: string; // Bot protection
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    // 1. Honeypot check (hidden field populated only by bots)
    if (body.honeypot && body.honeypot.trim() !== '') {
      return NextResponse.json(
        { success: true, message: 'Inquiry processed successfully' },
        { status: 200 }
      );
    }

    // 2. Validation
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required' },
        { status: 400 }
      );
    }

    if (!body.email || !body.email.includes('@') || !body.email.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'A valid commercial or professional email address is required' },
        { status: 400 }
      );
    }

    if (!body.message || body.message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please provide at least 10 characters detailing your inquiry' },
        { status: 400 }
      );
    }

    if (!body.consent) {
      return NextResponse.json(
        { success: false, error: 'Consent to privacy terms is required to proceed' },
        { status: 400 }
      );
    }

    // 3. Generate reference number for enterprise audit trail
    const refCode = `APX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // 4. Log structured inquiry server-side (ready for SMTP / CRM webhook integration)
    console.info(`[Enterprise Lead Received] Reference: ${refCode}`, {
      name: body.name,
      company: body.company || 'N/A',
      email: body.email,
      inquiryType: body.inquiryType,
      country: body.country || 'N/A',
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      referenceCode: refCode,
      message: 'Your inquiry has been registered. An institutional advisor will review and respond within 1 business day.',
    });
  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry. Please retry or contact us directly via email.' },
      { status: 500 }
    );
  }
}
