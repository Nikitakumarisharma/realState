import nodemailer from "nodemailer";

export async function POST(req) {  // ✅ Named export for POST method
  try {
    const body = await req.json();
    const { name, email, contact } = body;

    if (!name || !email) {
      return new Response(JSON.stringify({ success: false, message: "Name and email are required" }), { status: 400 });
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
      subject: `🎉 New Signup: ${name}`,
      text: `New User Signed Up!\n\nName: ${name}\nEmail: ${email}\nContact: ${contact}`,
      html: `
        <h2>New User Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact:</strong> ${contact}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully!" }), { status: 200 });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return new Response(JSON.stringify({ success: false, message: "Email could not be sent", error: error.message }), { status: 500 });
  }
}
