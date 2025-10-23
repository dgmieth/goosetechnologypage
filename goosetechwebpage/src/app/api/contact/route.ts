// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, locale } = body

    // Validação básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Aqui você pode adicionar lógica para enviar email
    // Por exemplo, usando Nodemailer, SendGrid, ou outro serviço
    // Para agora, apenas logamos e retornamos sucesso

    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      locale,
      timestamp: new Date().toISOString(),
    })

    // TODO: Implementar envio de email real
    // const emailSent = await sendEmail({
    //   to: 'contact@goosetechnology.com',
    //   subject: `New Contact Form: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //   `
    // })

    return NextResponse.json(
      { success: true, message: 'Message received' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
