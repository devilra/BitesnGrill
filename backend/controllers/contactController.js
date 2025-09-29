const nodemailer = require("nodemailer");

exports.contactForm = async (req, res) => {
  try {
    const { name, email, subject, phone, message } = req.body;

    // ✅ Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    // ✅ Mail options

    const mailOptions = {
      from: email,
      to: "rockraja91338@gmail.com", //bitesngrill admin email
      subject: `New Contact Form: ${subject}`,
      replyTo: email,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    // ✅ Send mail
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};
