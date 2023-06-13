//Imports
const express = require("express");
const router = require("express").Router();

//Import controllers from auth.js
const {
  resendEmailVerification,
  verifyEmail,
  registerAuth,
  loginAuth,
} = require("../controllers/auth");

//ROUTES

//POST
router.post("/register", registerAuth);
router.post("/rsend-verificaiton", resendEmailVerification);
router.post("/login", loginAuth);

//GET
router.get("/verify-email/:token", verifyEmail);

module.exports = router;
