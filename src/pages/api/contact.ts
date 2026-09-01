import type { APIRoute } from 'astro';
import { getDb } from '../../db';
import { inquiries } from '../../db/schema';
import { env } from "cloudflare:workers";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, company, projectType, budget, timeline, source, message } = data;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert into DB
    const db = getDb(env.DB);
    const id = crypto.randomUUID();
    await db.insert(inquiries).values({
      id,
      name,
      email,
      company: company || '',
      projectType: projectType || '',
      budget: budget || '',
      timeline: timeline || '',
      source: source || '',
      message,
      status: 'unread',
      createdAt: new Date(),
    });

    // Send email via Brevo if API key is configured
    if (env.BREVO_API_KEY && env.BREVO_SENDER_EMAIL && env.BREVO_RECEIVER_EMAIL) {
      const emailPayload = {
        sender: { name: "AbdurRahman.Top System", email: env.BREVO_SENDER_EMAIL },
        to: [{ email: env.BREVO_RECEIVER_EMAIL, name: "Admin" }],
        subject: `New Inquiry from ${name}`,
        htmlContent: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
          <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
          <p><strong>Timeline:</strong> ${timeline || 'N/A'}</p>
          <p><strong>Source:</strong> ${source || 'N/A'}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        `
      };

      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "api-key": env.BREVO_API_KEY
        },
        body: JSON.stringify(emailPayload)
      }).catch(err => console.error('Brevo API Error:', err));
    }

    return new Response(JSON.stringify({ success: true, message: 'Inquiry submitted successfully.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
