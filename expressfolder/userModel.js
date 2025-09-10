const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
    },
    school: {
      type: String,
    },
    occupation: {
      type: String,
    },
    hobbies: {
      type: String,
    },
    heardAboutUs: {
      type: String,
    },
    interest: {
      type: String,
    },
    image: {
      type: String, // For profile or any uploaded image
    },
    department: {
      type: String, // Example: "ushering", "media", "music", or "none"
    },
    education: {
      type: String, // Education level input
    },
      ministries: {
      type: [String], // array of ministry names
      default: []
    },  
    isVerified: { type: Boolean, default: false },

  // We store a hashed version of the OTP, not the OTP itself:
  otpHash: { type: String, default: null },
  otpExpiry: { type: Date, default: null },

  // Resend/rate limiting metadata
  otpResendCount: { type: Number, default: 0 }, // number of resends within window
  otpLastSentAt: { type: Date, default: null }, // last time OTP was sent
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;