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
      } 
      catch (err) {
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

// --- Unsubscribe endpoint ---
router.post("/api/unsubscribe", async (req, res) => {
  const { email } = req.body;

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

    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.error("❌ Mail credentials missing");
      return res
        .status(500)
        .json({ success: false, message: "Mail server not configured" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    for (const sub of subscribers) {
      console.log(`📤 Sending rich newsletter to: ${sub.email}`);

      await transporter.sendMail({
        from: `"Tim412" <${process.env.MAIL_USER}>`,
        to: sub.email,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; line-height:1.6;">
            <h2>${subject}</h2>
            <p>${message}</p>
            ${
              attachments && attachments.length > 0
                ? `<div>
                    <h3>Attached Media:</h3>
                    ${attachments
                      .map(
                        (file) =>
                          `<p><a href="${file.url}" target="_blank">${file.name}</a></p>`
                      )
                      .join("")}
                   </div>`
                : ""
            }
            <p style="margin-top:20px; font-size:12px; color:#555;">
              You are receiving this newsletter as a subscriber of Tim412.<br/>
              <a href="${process.env.BASE_URL}/unsubscribe?email=${encodeURIComponent(
          sub.email
        )}">Unsubscribe</a>
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