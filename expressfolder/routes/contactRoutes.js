const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../models/contact"); // Contact form
const RetreatContact = require("../models/retreatContact"); // Retreat form

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "sundayudoh383@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/oncontact", async (req, res) => {
  const { firstname, lastname, email, message, age, address, phone, formType } = req.body;

  console.log("📩 Incoming /oncontact request:", req.body);

  if (!firstname || !email || !age || !formType) {
    console.warn("⚠️ Invalid input received");
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  try {
    let savedUser;

    if (formType === "retreat") {
      console.log("🔍 Checking RetreatContact model for existing user...");
      const existingUser = await RetreatContact.findOne({ firstname, lastname, email });

      if (existingUser) {
        console.log("🚫 Retreat user already exists:", existingUser._id);
        return res.status(409).json({
          success: false,
          message: "User already registered for the retreat",
          code: "ALREADY_REGISTERED"
        });
      }

      console.log("✅ No existing user found. Creating new retreat registration...");
      const newRetreat = new RetreatContact({ firstname, lastname, email, message, age, address, phone });
      savedUser = await newRetreat.save();

    } else if (formType === "contact") {
      console.log("💬 Saving new contact message...");
      const newContact = new Contact({ firstname, lastname, email, message, age, address, phone });
      savedUser = await newContact.save();

    } else {
      console.warn("⚠️ Invalid formType received:", formType);
      return res.status(400).json({ success: false, message: "Invalid form type" });
    }

    // Determine Sunday or weekday for message
    const now = new Date();
    const time = now.getHours();
    const day = now.getDay();
    let sundayOrWeekday = day === 0 && time <= 10 ? "today" : "on Sunday";

    // HTML Email Templates
    const userHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head><meta charset="UTF-8" /></head>
        <body>
          <div>
            <h1>Hello ${firstname},</h1>
            ${
              formType === "retreat"
                ? `<p>Thank you for registering for our retreat! We will reach you via <strong>${email}</strong> or <strong>${phone}</strong>.</p><p>See you ${sundayOrWeekday}!</p>`
                : `<p>Thank you for contacting us! We have received your message:</p><blockquote>${message}</blockquote>`
            }
            <p>Best regards,<br><strong>The NewSprings Team</strong></p>
          </div>
        </body>
      </html>
    `;

    const adminHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <body>
          <h2>${formType === "retreat" ? "New Retreat Registration" : "New Contact Message"}</h2>
          <ul>
            <li>Name: ${firstname} ${lastname}</li>
            <li>Email: ${email}</li>
            ${formType === "retreat" ? `<li>Phone: ${phone}</li><li>Age: ${age}</li><li>Address: ${address}</li>` : ""}
            ${formType === "contact" ? `<li>Message: ${message}</li>` : ""}
          </ul>
        </body>
      </html>
    `;

    console.log("📧 Sending confirmation email to user:", email);
    await transporter.sendMail({
      from: '"NewSprings Team" <sundayudoh383@gmail.com>',
      to: email,
      subject: formType === "retreat" ? "Retreat Registration Received" : "We Received Your Message",
      html: userHtml
    });

    console.log("📧 Sending notification email to admin...");
    await transporter.sendMail({
      from: '"NewSprings Team" <sundayudoh383@gmail.com>',
      to: "admin@newsprings.com", // replace with actual admin email
      subject: formType === "retreat" ? "New Retreat Registration" : "New Contact Message",
      html: adminHtml
    });

    console.log("✅ Successfully saved and emails sent.");
    return res.status(200).json({
      success: true,
      message: "Saved successfully and emails sent to user and admin",
      data: savedUser
    });

  } catch (error) {
    console.error("❌ Error saving or sending email:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;