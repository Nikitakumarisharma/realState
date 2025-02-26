import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, contact, message } = body;

    if (!name || !email || !contact || !message) {
      return new Response(JSON.stringify({ success: false, message: "All fields are required" }), { status: 400 });
    }

    if (!/^[0-9]{10}$/.test(contact)) {
      return new Response(JSON.stringify({ success: false, message: "Invalid contact number" }), { status: 400 });
    }

    // Ensure environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECEIVER) {
      return new Response(JSON.stringify({ success: false, message: "Missing email configuration" }), { status: 500 });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `📩 Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nContact: ${contact}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully!" }), { status: 200 });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return new Response(JSON.stringify({ success: false, message: "Email could not be sent", error: error.message }), { status: 500 });
  }
}
