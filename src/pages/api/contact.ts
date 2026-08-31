export const prerender = false;
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const message = data.get('message') as string;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ success: false, error: 'All fields are required.' }), { status: 400 });
    }

    const apiKey = import.meta.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY not found in environment');
      return new Response(JSON.stringify({ success: false, error: 'Server misconfiguration.' }), { status: 500 });
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        sender: { name, email },
        to: [{ email: 'Contact@AbdurRahman.Top', name: 'AbdurRahman Md Ghufran' }],
        subject: `New Contact Form Submission from ${name}`,
        htmlContent: `<html><body>
          <h2>New Message via Techily Fly Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        </body></html>`
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Brevo API Error:', errorText);
      return new Response(JSON.stringify({ success: false, error: 'Failed to send email.' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, message: 'Message sent successfully!' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), { status: 500 });
  }
};
