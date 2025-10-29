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
  console.log("🚀 sendOtpEmail() called");
  console.log("➡️ toEmail:", toEmail);
  console.log("➡️ otp:", otp);

  try {
    // Log environment variables presence (not values for security)
    console.log("🔍 Checking environment variables...");
    console.log("EMAIL_USER present:", !!process.env.EMAIL_USER);
    console.log("EMAIL_PASS present:", !!process.env.EMAIL_PASS);
    console.log("SMTP_FROM present:", !!process.env.SMTP_FROM);

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log("✅ Using Gmail transporter");

      const nodemailer = require("nodemailer");
      const OTP_EXPIRY_MINUTES = 5; // Ensure you define this

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      console.log("📦 Transporter created");

      const expiryTime = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
      console.log("🕒 Expiry time:", expiryTime);

      const formattedExpiry = expiryTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      console.log("🕰️ Formatted expiry:", formattedExpiry);

      const from = process.env.SMTP_FROM || `"No Reply" <${process.env.EMAIL_USER}>`;
      console.log("📤 From:", from);

      const mailOptions = {
        from: `"Newspring Church" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Your Verification Code",
        text: `Your verification code is ${otp}. It expires in ${OTP_EXPIRY_MINUTES} minutes.`,
        html: `
        <div style="font-family: Arial, sans-serif; background: #f9f5ef; padding: 40px;">
          <div style="max-width: 500px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 30px;">

            <div style="text-align:center; margin-bottom: 20px;">
              <img src="https://res.cloudinary.com/dr0pxpbnj/image/upload/v1757701119/logo2_mnya0k.jpg" 
                   alt="Newspring Logo" 
                   width="100" 
                   style="border-radius:10px; box-shadow:0px 4px 8px rgba(0,0,0,.2);"/>
            </div>

            <h2 style="color: #5b3a1a; text-align:center; margin-bottom: 15px;">
              🔐 Your OTP Code
            </h2>

            <p style="font-size:16px; text-align:center; margin-bottom: 20px;">
              Your verification code is: 
              <b style="font-size:20px; color: #d4af37; letter-spacing: 2px;">
                ${otp}
              </b>
            </p>

            <p style="text-align:center; font-size:14px; color: #444; margin-bottom: 15px;">
              This code will expire at <b style="color: #d4af37;">${formattedExpiry}</b> 
              (in ${OTP_EXPIRY_MINUTES} minutes).
            </p>

            <p style="text-align:center; font-size:12px; color: #777;">
              If you did not request this, please ignore this email.
            </p>

          </div>
        </div>
        `,
      };

      console.log("📧 Mail options ready:", mailOptions);

      const info = await transporter.sendMail(mailOptions);
      console.log("✅ OTP email sent successfully!");
      console.log("📨 Message ID:", info.messageId);
      console.log("🧾 Response:", info.response);

      return true;
    } else {
      console.warn("⚠️ EMAIL_USER or EMAIL_PASS missing — using DEV fallback");
      console.log(`[DEV] OTP for ${toEmail}: ${otp}`);
      return true;
    }
  } catch (err) {
    console.error("❌ sendOtpEmail() failed:", err);
    return false;
  }
};


// 5️⃣ Helper: Expiry timestamp
exports.getExpiryTime = () => {
  return new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
};