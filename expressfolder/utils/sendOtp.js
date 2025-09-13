const nodemailer = require("nodemailer");
const crypto = require("crypto");

const OTP_EXPIRY_MINUTES = 10; // valid for 10 mins

// 1️⃣ Generate OTP
exports.generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  return otp;
};

// 2️⃣ Hash OTP
exports.hashOtp = (otp) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

// 3️⃣ Verify OTP (compare hash)
exports.verifyOtp = (plainOtp, hashedOtp) => {
  const hash = crypto.createHash("sha256").update(plainOtp).digest("hex");
  return hash === hashedOtp;
};

// 4️⃣ Send OTP Email
exports.sendOtpEmail = async (toEmail, otp) => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS ) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    const from = process.env.SMTP_FROM || `"No Reply" <${process.env.EMAIL_USER}>`;
    const mailOptions = {
    from: `"Newspring Church" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Verification Code",
    text: `Your verification code is ${otp}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="text-align:center; margin-bottom: 20px;">
          <img src="https://res.cloudinary.com/dr0pxpbnj/image/upload/v1757701119/logo2_mnya0k.jpg" alt="Newspring Logo" width="120" style="border-radius:10px;"/>
        </div>
        <h2 style="color: #1c1c1c; text-align:center;">Your OTP Code</h2>
        <p style="font-size:16px; text-align:center;">
          Your verification code is: <b style="font-size:18px; color:#1f7a8c;">${otp}</b>
        </p>
        <p style="text-align:center; font-size:14px; color:#555;">
          This code will expire in <b>${OTP_EXPIRY_MINUTES} minutes</b>.
        </p>
        <p style="text-align:center; font-size:12px; color:#888;">
          If you did not request this, please ignore this email.
        </p>
      </div>
    `,
  };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ OTP email sent:", info.messageId);
      return true;
    } catch (err) {
      console.error("❌ Failed to send OTP email:", err);
      return false;
    }
  } else {
    // fallback for dev
    console.log(`[DEV] OTP for ${toEmail}: ${otp}`);
    return true;
  }
};

// 5️⃣ Helper: Expiry timestamp
exports.getExpiryTime = () => {
  return new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
};