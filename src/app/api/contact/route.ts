import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, type, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 },
      )
    }

    // In production: send via Resend, SendGrid, or Nodemailer
    // For now we log and return success
    console.log('📧 New Safari Enquiry:', { name, email, phone, type, message, timestamp: new Date().toISOString() })

    return NextResponse.json({
      success: true,
      message: `Thank you ${name}. We will respond to ${email} within 4 hours.`,
    })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
