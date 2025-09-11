const mongoose = require("mongoose");

const MinistryResponseSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: mongoose.Schema.Types.Mixed } // text, array, object etc.
}, { _id: false });

const MinistryEntrySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  joinedAt: { type: Date, default: Date.now },
  responses: { type: [MinistryResponseSchema], default: [] }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  firstname: { type: String, trim: true },
  lastname: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true, index: true },
  password: { type: String },
  phone: { type: String },
  age: { type: Number },
  school: { type: String },
  occupation: { type: String },
  hobbies: { type: String },
  heardAboutUs: { type: String },
  interest: { type: String },
  image: { type: String },
  department: { type: String },
  education: { type: String },

  ministries: { type: [MinistryEntrySchema], default: [] },

  isVerified: { type: Boolean, default: false },

  otpHash: { type: String, default: null },
  otpExpiry: { type: Date, default: null },
  otpResendCount: { type: Number, default: 0 },
  otpLastSentAt: { type: Date, default: null }
}, {
  timestamps: true
});

// add index on embedded ministry name for faster lookup
UserSchema.index({ 'ministries.name': 1 });

const User = mongoose.model("User", UserSchema);
module.exports = User;