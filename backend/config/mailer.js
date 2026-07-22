const nodemailer = require("nodemailer");

// Works with any SMTP provider (Gmail app password, SendGrid, Mailgun, SES SMTP, etc).
// Fill these in backend/.env — see .env.example for the exact variable names.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false for 587/25
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendMail({ to, subject, html }) {
  if (!process.env.SMTP_HOST) {
    // Fail loudly in dev instead of silently pretending an email was sent.
    console.warn(
      `[mailer] SMTP is not configured — would have sent "${subject}" to ${to}. ` +
        "Set SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS in backend/.env to actually send email."
    );
    return { skipped: true };
  }

  return transporter.sendMail({
    from: process.env.SMTP_FROM || `"SkSync Cosmetics" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
  });
}

module.exports = { sendMail };
