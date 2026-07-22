const nodemailer = require("nodemailer");

async function sendMail({ to, subject, html }) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, "") : "";

  if (!host || !user || !pass) {
    console.warn(
      `[mailer] SMTP credentials incomplete (host: ${!!host}, user: ${!!user}, pass: ${!!pass}). ` +
        "Ensure SMTP_HOST, SMTP_USER, and SMTP_PASS are all set in environment variables."
    );
    return { skipped: true };
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  return transporter.sendMail({
    from: process.env.SMTP_FROM || `"SkSync Cosmetics" <${user}>`,
    to,
    subject,
    html
  });
}

module.exports = { sendMail };

