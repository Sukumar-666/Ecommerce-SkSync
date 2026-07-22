const { sendMail } = require("../config/mailer");

const BRAND_COLOR = "#1e40af"; // royal/indigo blue, matches the new frontend theme
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

function layout(title, bodyHtml) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
      <h2 style="color:${BRAND_COLOR};margin-bottom:8px;">SkSync Cosmetics</h2>
      <h3 style="margin-top:0;color:#111827;">${title}</h3>
      ${bodyHtml}
      <p style="color:#9ca3af;font-size:12px;margin-top:32px;">
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>
  `;
}

async function sendVerificationEmail(user, rawToken) {
  const link = `${CLIENT_URL}/verify-email/${rawToken}`;
  const html = layout(
    "Verify your email address",
    `
      <p>Hi ${user.name},</p>
      <p>Thanks for signing up. Please confirm your email address to activate your account.</p>
      <p style="text-align:center;margin:28px 0;">
        <a href="${link}" style="background:${BRAND_COLOR};color:#fff;padding:12px 28px;border-radius:999px;text-decoration:none;font-weight:600;">
          Verify Email
        </a>
      </p>
      <p style="font-size:13px;color:#6b7280;">This link expires in 24 hours.</p>
    `
  );
  return sendMail({ to: user.email, subject: "Verify your SkSync account", html });
}

async function sendOtpEmail(user, otp) {
  const html = layout(
    "Your login verification code",
    `
      <p>Hi ${user.name},</p>
      <p>Use this one-time code to complete your login:</p>
      <p style="text-align:center;font-size:32px;font-weight:800;letter-spacing:8px;color:${BRAND_COLOR};margin:24px 0;">
        ${otp}
      </p>
      <p style="font-size:13px;color:#6b7280;">This code expires in 5 minutes. Do not share it with anyone.</p>
    `
  );
  return sendMail({ to: user.email, subject: "Your SkSync login code", html });
}

module.exports = { sendVerificationEmail, sendOtpEmail };
