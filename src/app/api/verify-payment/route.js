import nodemailer from "nodemailer";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {  // ✅ Ensure POST is exported correctly
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const contact = formData.get("contact");
    const plotNo = formData.get("plotNo"); // ✅ Get Plot Number
    const image = formData.get("image");

    if (!name || !contact || !plotNo || !image) {
      return new Response(JSON.stringify({ success: false, message: "All fields are required" }), { status: 400 });
    }

    // Save the image temporarily
    const imageData = await image.arrayBuffer();
    const imagePath = path.join(process.cwd(), "public", image.name);
    await writeFile(imagePath, Buffer.from(imageData));

    // Ensure email environment variables exist
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
      subject: `📩 Payment Verification Request from ${name}`,
      text: `Name: ${name}\nContact: ${contact}\nPlot No: ${plotNo}\n\nPayment verification request received.`,
      attachments: [
        {
          filename: image.name,
          path: imagePath, // Path to the saved file
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, message: "Payment verification email sent successfully!" }), { status: 200 });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return new Response(JSON.stringify({ success: false, message: "Email could not be sent", error: error.message }), { status: 500 });
  }
}
