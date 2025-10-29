const mongoose = require("mongoose");

const MinistryResponseSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: mongoose.Schema.Types.Mixed }
}, { _id: false });

const MinistryEntrySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  joinedAt: { type: Date, default: Date.now },
  responses: { type: [MinistryResponseSchema], default: [] }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  firstname: { type: String, trim: true, required: true },
  lastname: { type: String, trim: true, required: true },
  email: { type: String, trim: true, lowercase: true, unique: true, required: true, index: true },
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
  timestamps: true,
  versionKey: false
});

// 🔍 Index on embedded field
UserSchema.index({ 'ministries.name': 1 });

// 🧩 Method: hide sensitive fields
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.otpHash;
  delete obj.otpExpiry;
  return obj;
};

// 🧠 Optional OTP validation helper
UserSchema.methods.isOtpValid = function (otpHash, now = new Date()) {
  return this.otpHash === otpHash && this.otpExpiry && now < this.otpExpiry;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
