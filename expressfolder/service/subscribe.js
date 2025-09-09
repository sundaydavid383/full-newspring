const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');
const router = express.Router();

const FILE_PATH = '../data/subscribers.json';

// Add a new subscriber
router.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
try {
         const subscribers = JSON.parse(fs.readFileSync(FILE_PATH));
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    fs.writeFileSync(FILE_PATH, JSON.stringify(subscribers, null, 2));
  }
  res.status(200).json({ message: "Subscribed successfully" });
} catch (error) {
    console.error("an error occured:", error)
}

});

// Send a message to all subscribers
router.post('/api/sendNewsletter', async (req, res) => {
  const { subject, message } = req.body;
  const subscribers = JSON.parse(fs.readFileSync(FILE_PATH));

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your@email.com',
      pass: 'your_app_password'
    }
  });

  for (const email of subscribers) {
    await transporter.sendMail({
      from: '"NewSprings" <your@email.com>',
      to: email,
      subject: subject || "Newsletter",
      text: message || "Stay blessed!",
    });
  }

  res.status(200).json({ message: "Newsletter sent!" });
});

module.exports = router;