const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter a first name"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter a last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email address"],
    },
    phone: {
      type: String,
      required: [true, "Please enter a phone number"],
    },
    age: {
      type: Number,
      required: [true, "Please enter your age"],
    },
    school: {
      type: String,
      required: [true, "Please enter your school name"],
    },
    occupation: {
      type: String,
      required: [true, "Please enter your occupation"],
    },
    hobbies: {
      type: String,
      required: [true, "Please enter your hobbies or interests"],
    },
    heardAboutUs: {
      type: String,
      required: [true, "Please tell us how you heard about us"],
    },
    interest: {
      type: String,
      required: [true, "Please specify your area of interest"],
    },
    image: {
      type: String,
      required: false, // Optional field for image
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;