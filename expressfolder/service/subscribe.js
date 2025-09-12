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

    console.log("✅ Email not found, creating new subscriber...");
   try {
  const newSub = new Tim412Subscriber({ email });
  await newSub.save();
} catch (err) {
  if (err.code === 11000) {
    console.warn("⚠️ Duplicate email detected at save:", email);
    return res.status(400).json({ success: false, message: "Already subscribed" });
  }
  throw err;
}

    console.log("🎉 Subscription successful for:", email);
    return res.status(200).json({
      success: true,
      message: "Subscribed successfully",
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

    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
  console.error("❌ Mail credentials missing");
  return res.status(500).json({ success: false, message: "Mail server not configured" });
}

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    for (const sub of subscribers) {
      console.log(`📤 Sending email to: ${sub.email}`);
      await transporter.sendMail({
        from: `"Tim412" <${process.env.MAIL_USER}>`,
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

module.exports = router;