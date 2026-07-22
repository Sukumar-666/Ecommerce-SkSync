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

  const isGmail = host.includes("gmail");
  const port = isGmail ? 465 : (Number(process.env.SMTP_PORT) || 587);
  const secure = isGmail || port === 465;

  const transporterOptions = {
    host: isGmail ? "smtp.gmail.com" : host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
  };

  const transporter = nodemailer.createTransport(transporterOptions);

  // Gmail SMTP strictly requires the FROM email to match the authenticated SMTP_USER address
  const fromAddress = isGmail
    ? `"SkSync Cosmetics" <${user}>`
    : (process.env.SMTP_FROM || `"SkSync Cosmetics" <${user}>`);

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      html
    });
    console.log(`[mailer] Email successfully sent to ${to}. ID: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error(`[mailer] Error sending email to ${to}:`, err);
    return { error: err.message };
  }
}

module.exports = { sendMail };


