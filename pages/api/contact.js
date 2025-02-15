import nodemailer from "nodemailer";

export default async function handler(req, res) { // ✅ Removed TypeScript types
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, email, message, contact } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    // Ensure environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_RECEIVER) {
      return res.status(500).json({ success: false, message: "Missing email configuration" });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Determine email type (Signup OR Contact Form)
    const isSignup = Boolean(contact); // If `contact` exists, it's a signup request

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: isSignup
        ? `🎉 New Signup: ${name}`
        : `📩 Contact Form Submission from ${name}`,
      text: isSignup
        ? `New User Signed Up!\n\nName: ${name}\nEmail: ${email}\nContact: ${contact}`
        : `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
      html: isSignup
        ? `
          <h2>New User Signup</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Contact:</strong> ${contact}</p>
        `
        : `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent successfully! (${isSignup ? "Signup" : "Contact Form"})`);
    return res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return res.status(500).json({ success: false, message: "Email could not be sent", error: error.message });
  }
}
