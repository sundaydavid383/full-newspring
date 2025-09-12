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
      const existingUser = await RetreatContact.findOne({ email });

      if(existingUser && (existingUser.firstname !== firstname || existingUser.lastname !== lastname)) {
        console.log("❌ Name mismatch for the provided email in retreat registration.");
        return res.status(200).json({
          success: false,
          message: "Please make sure the name matches the one linked to this email.",
          code: "EMAIL_NAME_MISMATCH"
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
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: var(--white);
        color: var(--black);
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: var(--box-shadow);
        background: var(--blurwhite);
      }
      .logo {
        display: block;
        margin: 0 auto 1.5rem auto;
        width: 120px;
        height: auto;
      }
      h1 {
        color: var(--brown);
        text-align: center;
      }
      p {
        font-size: 1rem;
        line-height: 1.6;
        margin: 1rem 0;
      }
      strong {
        color: var(--darkbrown);
      }
      blockquote {
        background-color: var(--lightbrown);
        padding: 0.8rem 1rem;
        border-left: 5px solid var(--brown);
        margin: 1rem 0;
        font-style: italic;
      }
      ul {
        margin: 1rem 0;
        padding-left: 1.2rem;
      }
      li {
        margin: 0.5rem 0;
      }
      .highlight {
        color: var(--gold);
        font-weight: bold;
      }
      footer {
        margin-top: 2rem;
        font-size: 0.95rem;
        color: var(--lightBlack);
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img class="logo" src="https://res.cloudinary.com/dr0pxpbnj/image/upload/v1757701119/logo2_mnya0k.jpg" alt="NewSprings Logo" />
      <h1>Hello ${firstname},</h1>
      ${
        formType === "retreat"
          ? `<p>Thank you for registering for our <strong>retreat</strong>! We are thrilled to have you join us. Our team will reach out soon via <strong>${email}</strong> or <strong>${phone}</strong> with more details.</p>
             <p>Here’s what you can look forward to:</p>
             <ul>
               <li><span class="highlight">Inspirational sessions</span> to deepen your faith.</li>
               <li><span class="highlight">Engaging activities</span> to connect with fellow participants.</li>
               <li><span class="highlight">Practical workshops</span> to grow spiritually and personally.</li>
             </ul>
             <p>We look forward to seeing you ${sundayOrWeekday}! Come ready to be inspired, encouraged, and uplifted.</p>`
          : `<p>Thank you for reaching out! We’ve received your message and our team will respond as soon as possible.</p>
             <p>Here’s a copy of your message:</p>
             <blockquote>${message}</blockquote>
             <p>We are committed to addressing your concerns and will be in touch shortly. Thank you for connecting with us!</p>`
      }
      <footer>
        <p>With blessings,<br><strong>The NewSprings Team</strong></p>
      </footer>
    </div>
  </body>
</html>
`;

const adminHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: var(--white);
        color: var(--black);
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: var(--box-shadow);
        background: var(--blurwhite);
      }
      .logo {
        display: block;
        margin: 0 auto 1rem auto;
        width: 100px;
      }
      h2 {
        color: var(--brown);
        text-align: center;
      }
      ul {
        list-style: none;
        padding: 0;
        margin-top: 1rem;
      }
      li {
        margin: 0.6rem 0;
        line-height: 1.5;
      }
      strong {
        color: var(--darkbrown);
      }
      .highlight {
        color: var(--gold);
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img class="logo" src="https://res.cloudinary.com/dr0pxpbnj/image/upload/v1757701119/logo2_mnya0k.jpg" alt="NewSprings Logo" />
      <h2>${formType === "retreat" ? "New Retreat Registration" : "New Contact Message"}</h2>
      <ul>
        <li><strong>Name:</strong> ${firstname} ${lastname}</li>
        <li><strong>Email:</strong> ${email}</li>
        ${formType === "retreat" ? `<li><strong>Phone:</strong> ${phone}</li>
                                    <li><strong>Age:</strong> ${age}</li>
                                    <li><strong>Address:</strong> ${address}</li>` : ""}
        ${formType === "contact" ? `<li><strong>Message:</strong> ${message}</li>` : ""}
      </ul>
      <p class="highlight">Please follow up promptly to ensure a great experience for our participant!</p>
    </div>
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