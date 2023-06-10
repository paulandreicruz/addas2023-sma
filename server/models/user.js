const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 100,
      // minLength: 16,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    coverphoto: {
      type: String,
    },
    about: {
      type: String,
    },
    livesin: {
      type: String,
    },
    worksat: {
      type: String,
    },
    relationship: {
      type: String,
    },
    streetaddress: {
      type: String,
    },
    followers: [],
    following: [],
    verificationtoken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationtokenexpiry: {
      type: Date,
    },
    verificationtokenresend: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
