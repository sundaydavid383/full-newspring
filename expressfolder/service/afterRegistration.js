const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/after/registration', (req, res) => {
  const filePath = path.join(__dirname, '../data/speeches.json');

  fs.readFile(filePath, 'utf-8', (err, jsonData) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read speech data' });
    }

    const data = JSON.parse(jsonData);
    const speechText = data?.afterRegistration || "Thank you for registering.";

    res.json({ speech: speechText });
  });
});

module.exports = router;