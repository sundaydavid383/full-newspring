const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../models/contact");
const RetreatContact = require("../models/retreatContact");

console.log("🛠️ Contact route loaded at", new Date().toLocaleString());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "sundayudoh383@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});


// 🧹 DELETE all retreat registrations
router.delete("/delete-all-retreats", async (req, res) => {
  console.log("\n[START] DELETE /delete-all-retreats at", new Date().toLocaleString());

  try {
    console.log("[CHECK] Verifying RetreatContact model is loaded...");
    if (!RetreatContact) {
      console.error("[ERROR] RetreatContact model not found!");
      return res.status(500).json({ success: false, message: "Retreat model missing." });
    }

    console.log("[DELETE] Fetching all retreat records before deletion...");
    const allRetreats = await RetreatContact.find({});
    console.log(`[INFO] Found ${allRetreats.length} retreat registrations.`);

    if (allRetreats.length === 0) {
      console.warn("[WARN] No retreat records found to delete.");
      return res.status(200).json({ success: false, message: "No retreat registrations found." });
    }

    console.log("[ACTION] Deleting all retreat registrations...");
    const deleteResult = await RetreatContact.deleteMany({});
    console.log("[SUCCESS] Deleted all retreat records. Mongo result:", deleteResult);

    return res.status(200).json({
      success: true,
      message: `${deleteResult.deletedCount} retreat registrations deleted successfully.`,
    });
  } catch (error) {
    console.error("[ERROR] Exception in /delete-all-retreats:", error.stack || error.message || error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during retreat deletion.",
    });
  }
});

router.post("/oncontact", async (req, res) => {
  const { firstname, lastname, email, message, age, address, phone, formType } = req.body;
  console.log("\n[START] /oncontact", new Date().toLocaleString());
  console.log("Payload:", req.body);

  if (!firstname || !lastname || !email || !age || !formType) {
    console.warn("[VALIDATION] Missing required fields.");
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  try {
    // Choose model based on formType
    let Model;
    if (formType === "retreat") Model = RetreatContact;
    else if (formType === "contact") Model = Contact;
    else {
      console.warn("[VALIDATION] Invalid formType:", formType);
      return res.status(400).json({ success: false, message: "Invalid form type" });
    }


     const sundayOrWeekday = () => {
      const now = new Date();

      const day = now.getDay()
      const hours = now.getHours()
      const minutes = now.getMinutes()

      const sundayStart = { day:0, hour:8, minute:0}
      const sundayEnd = { day:0, hour:12, minute:0}
      const tuesdayStart = { day: 2, hour: 18, minute: 0 };
      const tuesdayEnd = { day: 2, hour: 19, minute: 0 };

      function isAfter(time){
        if(day > time.day) return true
        if (day < time.day) return false;
        if (hours > time.hour) return true;
        if (hours < time.hour) return false;
        return minutes >= time.minute;
      }

      function isBefore(time) {
    if (day < time.day) return true;
    if (day > time.day) return false;
    if (hours < time.hour) return true;
    if (hours > time.hour) return false;
    return minutes < time.minute;
  }

  // 1️⃣ Before Sunday 8 AM
  if (day === 6 || (day === 0 && isBefore(sundayStart))) {
    return "Next service is on Sunday at 8:00 AM.";
  }

  // 2️⃣ During Sunday service
  if (day === 0 && !isBefore(sundayStart) && isBefore(sundayEnd)) {
    return "Sunday service is currently ongoing — ends by 12:00 PM.";
  }

  // 3️⃣ After Sunday 12 PM but before Tuesday 6 PM
  if ((day === 0 && isAfter(sundayEnd)) || day === 1 || (day === 2 && isBefore(tuesdayStart))) {
    return "Next service is on Tuesday at 6:00 PM.";
  }

  // 4️⃣ During Tuesday service
  if (day === 2 && !isBefore(tuesdayStart) && isBefore(tuesdayEnd)) {
    return "Tuesday service is currently ongoing — ends by 7:00 PM.";
  }

  // 5️⃣ After Tuesday 7 PM → Next Sunday
  if ((day === 2 && isAfter(tuesdayEnd)) || day > 2) {
    return "Next service is on Sunday at 8:00 AM.";
  }

  return "Unable to determine the next service time.";
     }
    // 1) Check for exact duplicate (firstname + lastname + email)
    console.log("[DUP CHECK] Searching for existing record with same firstname+lastname+email...");
    const duplicate = await Model.findOne({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim().toLowerCase(),
    });

    if (duplicate) {
      console.log("[DUP CHECK] Exact duplicate found:", duplicate._id);

      // Friendly user message for duplicates
      const duplicateUserHtml = `
        <!doctype html><html><body>
          <p>Hi ${firstname},</p>
          <p>Thanks for reaching out. Our records show that an account/registration already exists for <strong>${firstname} ${lastname}</strong> with the email <strong>${email}</strong>.</p>
          <p>If you think this is a mistake or you want to update your details, please reply to this email or contact us and we'll assist you personally.</p>
          <p>God bless,<br/>The NewSprings Team</p>
        </body></html>
      `;

      // Admin notification for duplicates
      const duplicateAdminHtml = `
        <!doctype html><html><body>
          <p>Admin,</p>
          <p>A duplicate attempt was made for ${firstname} ${lastname} (${email}). Record id: ${duplicate._id}</p>
          <p>Message (if any): ${message || "No message provided."}</p>
          <p>Please follow up if needed.</p>
        </body></html>
      `;

      // try sending duplicate-notice emails (don't crash if email fails)
      try {
        console.log("[EMAIL] Sending duplicate-notice to user:", email);
        await transporter.sendMail({
          from: '"NewSprings Team" <' + (process.env.EMAIL_USER || "sundayudoh383@gmail.com") + '>',
          to: email,
          subject: formType === "retreat" ? "Retreat Registration Already Exists" : "Contact Already Received",
          html: duplicateUserHtml,
        });
        console.log("[EMAIL] Duplicate notice sent to user.");
      } catch (emailErr) {
        console.error("[EMAIL ERROR] Sending duplicate notice to user:", emailErr && emailErr.message);
      }

      try {
        console.log("[EMAIL] Notifying admin about duplicate attempt...");
        await transporter.sendMail({
          from: '"NewSprings Team" <' + (process.env.EMAIL_USER || "sundayudoh383@gmail.com") + '>',
          to: "admin@newsprings.com",
          subject: `[Duplicate] ${formType} attempt by ${firstname} ${lastname}`,
          html: duplicateAdminHtml,
        });
        console.log("[EMAIL] Admin notified of duplicate.");
      } catch (adminEmailErr) {
        console.error("[EMAIL ERROR] Sending admin duplicate notification:", adminEmailErr && adminEmailErr.message);
      }

      return res.status(200).json({
        success: false,
        code: "ALREADY_EXISTS",
        message: "A registration/contact with this name and email already exists. We've notified you and the admin.",
        data: { existingId: duplicate._id },
      });
    }

    // 2) If no duplicate, create new record
    console.log("[CREATE] No duplicate found. Creating new record...");
    const newDoc = new Model({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim().toLowerCase(),
      message,
      age,
      address,
      phone,
    });

    const savedUser = await newDoc.save();
    console.log("[CREATE] Saved record id:", savedUser._id);

    // 3) Build personalized emails (minimal templates below; replace with full HTML if you want)
  const userHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #ffffff;
        color: #222222;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 650px;
        margin: 2rem auto;
        padding: 2rem;
        border-radius: 12px;
        background: #f9f9f9;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      }
      .logo {
        display: block;
        margin: 0 auto 1.5rem;
        width: 120px;
      }
      h1 {
        color: #6b3f1e;
        text-align: center;
      }
      p {
        line-height: 1.6;
        font-size: 1rem;
      }
      blockquote {
        background: #f5e8dc;
        padding: 1rem;
        border-left: 5px solid #6b3f1e;
        font-style: italic;
      }
      footer {
        margin-top: 2rem;
        font-size: 0.9rem;
        text-align: center;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img class="logo" src="https://res.cloudinary.com/dr0pxpbnj/image/upload/v1757701119/logo2_mnya0k.jpg" alt="NewSprings Logo" />
      <h1>Hi ${firstname},</h1>
      ${
        formType === "retreat"
          ? `
          <p>Thank you for registering for our upcoming <strong>NewSprings Retreat</strong>! 🌿</p>
          <p>We’re so glad to have you join us, ${firstname}. Our heart is that every attendee encounters God in a fresh, life-changing way.</p>
          <p>Our team will reach out soon via <strong>${email}</strong> or <strong>${phone}</strong> with details about location, time, and what to expect. In the meantime, here’s what you can look forward to:</p>
          <ul>
            <li>✨ Spirit-filled worship and teaching</li>
            <li>🤝 Genuine connections and fun group sessions</li>
            <li>🙏 Quiet moments to hear God personally</li>
          </ul>
          <p>We look forward to seeing you ${sundayOrWeekday()}! Come expectant — God is ready to do great things in you.</p>
          `
          : `
          <p>Thank you for reaching out to <strong>NewSprings</strong>!</p>
          <p>We’ve received your message, and one of our team members will get back to you personally soon.</p>
          <p>Here’s a copy of what you shared with us:</p>
          <blockquote>${message}</blockquote>
          <p>${firstname}, we truly value your time and trust. Whether you’re seeking guidance, prayer, or just to connect — know that we’re here for you.</p>
          <p>God bless you richly as you continue to walk with Him.</p>
          `
      }
      <footer>
        <p>With love and blessings,<br><strong>The NewSprings Family</strong><br>💒</p>
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
        background-color: #ffffff;
        color: #222222;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 650px;
        margin: 2rem auto;
        padding: 1.5rem;
        border-radius: 12px;
        background: #f4f4f4;
        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      }
      .logo {
        display: block;
        margin: 0 auto 1rem;
        width: 100px;
      }
      h2 {
        color: #6b3f1e;
        text-align: center;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        margin: 0.6rem 0;
      }
      strong {
        color: #333;
      }
      .highlight {
        color: #9c661f;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <img class="logo" src="https://res.cloudinary.com/dr0pxpbnj/image/upload/v1757701119/logo2_mnya0k.jpg" alt="NewSprings Logo" />
      <h2>${formType === "retreat" ? "🕊️ New Retreat Registration" : "📬 New Contact Message"}</h2>
      <p><strong>Dear Admin,</strong></p>
      ${
        formType === "retreat"
          ? `
          <p>${firstname} ${lastname} just registered for the retreat.</p>
          <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Age:</strong> ${age}</li>
            <li><strong>Address:</strong> ${address}</li>
            <li><strong>Message:</strong> ${message || "No additional note provided."}</li>
          </ul>
          <p class="highlight">Please reach out warmly to confirm their registration and provide next steps.</p>
          `
          : `
          <p>${firstname} ${lastname} has just sent a new contact message.</p>
          <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone || "Not provided"}</li>
            <li><strong>Message:</strong></li>
          </ul>
          <blockquote>${message}</blockquote>
          <p class="highlight">Kindly respond soon and offer any needed support or prayer.</p>
          `
      }
      <footer>
        <p>📅 Received: ${new Date().toLocaleString()}</p>
      </footer>
    </div>
  </body>
</html>
`;

    // 4) Send confirmation emails (attempt, but don't let email failure crash the whole request)
    try {
      console.log("[EMAIL] Sending confirmation to user:", email);
      const userMail = await transporter.sendMail({
        from: '"NewSprings Team" <' + (process.env.EMAIL_USER || "sundayudoh383@gmail.com") + '>',
        to: email,
        subject: formType === "retreat" ? "Retreat Registration Received" : "We Received Your Message",
        html: userHtml,
      });
      console.log("[EMAIL] User mail sent:", userMail && userMail.messageId);
    } catch (err) {
      console.error("[EMAIL ERROR] Failed sending user confirmation:", err && err.message);
    }

    try {
      console.log("[EMAIL] Sending notification to admin...");
      const adminMail = await transporter.sendMail({
        from: '"NewSprings Team" <' + (process.env.EMAIL_USER || "sundayudoh383@gmail.com") + '>',
        to: "admin@newsprings.com",
        subject: formType === "retreat" ? "New Retreat Registration" : "New Contact Message",
        html: adminHtml,
      });
      console.log("[EMAIL] Admin mail sent:", adminMail && adminMail.messageId);
    } catch (err2) {
      console.error("[EMAIL ERROR] Failed sending admin notification:", err2 && err2.message);
    }

    console.log("[SUCCESS] Completed /oncontact flow for:", savedUser._id);
    return res.status(200).json({
      success: true,
      message: "Saved successfully and emails sent to user and admin",
      data: savedUser,
    });
  } catch (error) {
    console.error("[ERROR] Exception in /oncontact:", error && (error.stack || error.message || error));
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
