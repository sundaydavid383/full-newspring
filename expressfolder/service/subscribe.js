// routes/subscribe.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

// Define schema + model
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

const Tim412Subscriber =
  mongoose.models.Tim412Subscriber ||
  mongoose.model("Tim412Subscriber", subscriberSchema);

// --- Subscribe endpoint ---
router.post("/api/subscribe", async (req, res) => {
  console.log("📩 Incoming subscription request:", req.body);

  const { email } = req.body;

  if (!email) {
    console.error("❌ Subscription failed: no email provided");
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error("❌ Invalid email format:", email);
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  try {
    console.log("🔍 Checking if email already exists in DB:", email);

    const existing = await Tim412Subscriber.findOne({ email });
    if (existing) {
      console.warn("⚠️ Email already subscribed:", email);
      return res.status(400).json({ success: false, message: "Already subscribed" });
    }

    let newSub;
    console.log("✅ Email not found, creating new subscriber...");
    try {
      newSub = new Tim412Subscriber({ email });
      await newSub.save();
    } catch (err) {
      if (err.code === 11000) {
        console.warn("⚠️ Duplicate email detected at save:", email);
        return res.status(400).json({ success: false, message: "Already subscribed" });
      }
      throw err;
    }

    // ✅ Send welcome email immediately
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use SMTP settings if custom
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Tim412" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to Tim412 Newsletter!",
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; padding:20px; background:var(--white); color:var(--black); border-radius:8px; box-shadow: var(--box-shadow);">
              <!-- Logo / Header -->
      <div style="text-align:center; margin-bottom:20px;">
        <img src="https://res.cloudinary.com/dr0pxpbnj/image/upload/v1757701119/logo2_mnya0k.jpg" 
             alt="Newspring Logo" 
             width="100" 
             style="border-radius:10px; box-shadow:0px 4px 8px rgba(0,0,0,.2);"/>
      </div>
      <h1 style="color:var(--darkbrown);">Welcome to <span style="color:var(--gold);">Tim412</span> 🎉</h1>
          <p style="font-size:16px;">
            Hello <strong>${email}</strong>,<br/>
            Thank you for subscribing to <span style="color:var(--brown); font-weight:bold;">Tim412 Newsletter</span>. 
            You’ll now receive our latest updates, events, and messages directly in your inbox.
          </p>
          
          <p style="margin-top:15px; font-size:14px; color:var(--lightBlack);">
            Stay tuned for upcoming events, teachings, and resources to help you grow in Christ.
          </p>

          <div style="margin-top:20px; text-align:center;">
            <a href="${process.env.BASE_URL}" 
              style="display:inline-block; padding:10px 20px; background:var(--darkbrown); color:var(--white); border-radius:6px; text-decoration:none; font-weight:bold;">
              Visit Our Website
            </a>
          </div>

          <p style="margin-top:30px; font-size:12px; color:var(--gray); text-align:center;">
            You are receiving this email because you subscribed to <strong style="color:var(--brown);">Tim412</strong>.<br/>
            If this was not you, you can 
            <a href="${process.env.BASE_URL}/api/unsubscribe?email=${encodeURIComponent(
        email
      )}" style="color:var(--sharpgold); text-decoration:underline;">unsubscribe here</a>.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Welcome email sent to:", email);

    // ✅ Respond to frontend
    return res.status(200).json({
      success: true,
      message: "Subscribed successfully and welcome email sent",
      subscriber: newSub,
    });
  } catch (error) {
    console.error("💥 Error subscribing:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});
// --- Send Newsletter ---
router.post("/api/sendNewsletter", async (req, res) => {
  console.log("📨 Newsletter request received:", req.body);

  const { subject, message } = req.body;

  if (!subject || !message) {
    console.error("❌ Newsletter failed: Missing subject or message");
    return res.status(400).json({ success: false, message: "Subject and message are required" });
  }

  try {
    console.log("🔍 Fetching all subscribers from DB...");
    const subscribers = await Tim412Subscriber.find({});
    console.log("📊 Total subscribers found:", subscribers.length);

    if (subscribers.length === 0) {
      console.warn("⚠️ No subscribers to send to");
      return res.status(400).json({ success: false, message: "No subscribers available" });
    }

    if (!process.env.EMAIL_USER || !process.env.MAIL_PASS) {
  console.error("❌ Mail credentials missing");
  return res.status(500).json({ success: false, message: "Mail server not configured" });
}

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    for (const sub of subscribers) {
      console.log(`📤 Sending email to: ${sub.email}`);
      await transporter.sendMail({
        from: `"Tim412" <${process.env.EMAIL_USER}>`,
        to: sub.email,
        subject: subject || "Newsletter",
        text: message || "Stay blessed!",
      });
    }

    console.log("✅ Newsletter sent successfully to all subscribers");
    return res.status(200).json({ success: true, message: "Newsletter sent!" });
  } catch (error) {
    console.error("💥 Error sending newsletter:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Failed to send newsletter",
      error: error.message,
    });
  }
});

// --- Unsubscribe endpoint ---
router.post("/api/unsubscribe", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    console.error("❌ Unsubscribe failed: no email provided");
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    console.log("🔍 Attempting to unsubscribe:", email);
    const unsubscribed = await Tim412Subscriber.findOneAndDelete({ email });

    if (!unsubscribed) {
      console.warn("⚠️ Email not found in DB:", email);
      return res.status(404).json({ success: false, message: "Email not found" });
    }

    console.log("✅ Successfully unsubscribed:", email);
    return res.status(200).json({
      success: true,
      message: `Unsubscribed successfully: ${email}`,
    });
  } catch (error) {
    console.error("💥 Error unsubscribing:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// --- Delete ALL subscribers (⚠️ Admin only) ---
router.delete("/api/deleteAllSubscribers", async (req, res) => {
  try {
    console.log("⚠️ Deleting all subscribers...");
    const result = await Tim412Subscriber.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} subscribers`);

    return res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} subscribers`,
    });
  } catch (error) {
    console.error("💥 Error deleting subscribers:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Failed to delete subscribers",
      error: error.message,
    });
  }
});

// --- Send Newsletter with media (text + images + videos) ---
router.post("/api/sendRichNewsletter", async (req, res) => {
  console.log("📨 Rich newsletter request received:", req.body);

  const { subject, message, attachments } = req.body;

  if (!subject || !message) {
    console.error("❌ Newsletter failed: Missing subject or message");
    return res
      .status(400)
      .json({ success: false, message: "Subject and message are required" });
  }

  try {
    console.log("🔍 Fetching all subscribers...");
    const subscribers = await Tim412Subscriber.find({});
    console.log("📊 Subscribers found:", subscribers.length);

    if (subscribers.length === 0) {
      console.warn("⚠️ No subscribers to send to");
      return res
        .status(400)
        .json({ success: false, message: "No subscribers available" });
    }

    if (!process.env.EMAIL_USER || !process.env.MAIL_PASS) {
      console.error("❌ Mail credentials missing");
      return res
        .status(500)
        .json({ success: false, message: "Mail server not configured" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    for (const sub of subscribers) {
      console.log(`📤 Sending rich newsletter to: ${sub.email}`);

      await transporter.sendMail({
        from: `"Tim412" <${process.env.EMAIL_USER}>`,
        to: sub.email,
        subject: subject,
       html: `
  <div style="font-family: Arial, sans-serif; line-height:1.6; max-width:600px; margin:auto; background:rgb(176, 233, 181); padding:20px; border-radius:10px; box-shadow:0px 0px 10px rgba(0,0,0,.5);">
    
    <!-- Header -->
        <!-- Logo / Header -->
      <div style="text-align:center; margin-bottom:20px;">
        <img src="https://res.cloudinary.com/dr0pxpbnj/image/upload/v1757701119/logo2_mnya0k.jpg" 
             alt="Newspring Logo" 
             width="100" 
             style="border-radius:10px; box-shadow:0px 4px 8px rgba(0,0,0,.2);"/>
      </div>
    <h2 style="color:rgb(8, 51, 11); border-bottom:2px solid rgb(189, 185, 185); padding-bottom:10px; text-align:center;">
      ${subject}
    </h2>
    
    <!-- Main Message -->
    <p style="color:rgb(27, 27, 27); font-size:15px; margin-top:15px;">
      ${message}
    </p>

    <!-- Attachments Section -->
    ${
      attachments && attachments.length > 0
        ? `
          <div style="margin-top:20px; padding:15px; background:#f7f7f7; border:1px solid rgb(189, 185, 185); border-radius:6px;">
            <h3 style="color:rgb(19, 97, 26); font-size:16px; margin-bottom:10px;">Attached Media:</h3>
            ${attachments
              .map(
                (file) =>
                  `<p style="margin:5px 0;">
                    <a href="${file.url}" target="_blank" style="color:rgba(105, 107, 240, 0.973); text-decoration:none; font-weight:bold;">
                      📎 ${file.name}
                    </a>
                  </p>`
              )
              .join("")}
          </div>`
        : ""
    }

    <!-- Footer -->
    <p style="margin-top:30px; font-size:12px; color:rgb(104, 100, 100); text-align:center;">
      You are receiving this newsletter as a subscriber of <strong style="color:rgb(8, 51, 11);">Tim412</strong>.<br/>
      If you no longer wish to receive these, you can 
      <a href="${process.env.BASE_URL}unsubscribe?email=${encodeURIComponent(
  sub.email
)}" style="color:rgba(255, 238, 0, 0.973); text-decoration:underline;">unsubscribe here</a>.
    </p>
  </div>
`,
      });
    }

    console.log("✅ Rich newsletter sent to all subscribers");
    return res
      .status(200)
      .json({ success: true, message: "Rich newsletter sent!" });
  } catch (error) {
    console.error("💥 Error sending rich newsletter:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Failed to send newsletter",
      error: error.message,
    });
  }
});

module.exports = router;