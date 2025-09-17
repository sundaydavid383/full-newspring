// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../userModel"); 

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  console.log("➡️ POST /api/auth/login");

  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    // Find user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No account found for this email.",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong password. Please try again.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" }
    );

    console.log("✅ User logged in:", user.email);

    const sentUser = { ...user.toObject(), password: undefined, __v: undefined };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        ...sentUser,
        token,
      },
    });
  } catch (err) {
    console.error("❌ Error in /api/auth/login:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
});

module.exports = router;
