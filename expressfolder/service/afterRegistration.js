const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

router.post('/after/registration', (req, res) => {
  const {
    firstname, lastname, email, phone,
    age, school, occupation, hobbies,
    heardAboutUs, interest
  } = req.body;

  const filePath = path.join(__dirname, '../data/speeches.json');

  fs.readFile(filePath, 'utf-8', (err, jsonData) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read speech data' });
    }

    try {
      const data = JSON.parse(jsonData);
      const template = data?.afterRegistration || "Thank you for registering.";

      const replacement = {
        '{greeting}': getGreeting(),
        '{firstname}': firstname || '',
        '{lastname}': lastname || '',
        '{email}': email || '',
        '{phone}': phone || '',
        '{age}': age || '',
        '{school}': school || '',
        '{occupation}': occupation || '',
        '{hobbies}': hobbies || '',
        '{heardAboutUs}': heardAboutUs || '',
        '{interest}': interest || ''
      };

      const personalizedSpeech = Object.entries(replacement).reduce(
        (text, [key, value]) => text.replace(new RegExp(key, 'g'), value),
        template
      );
      console.log(req.body)
      res.json({ speech: personalizedSpeech });
    } catch (error) {
      res.status(500).json({ error: 'Invalid speech data format' });
    }
  });
});

module.exports = router;