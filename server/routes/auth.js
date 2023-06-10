//Imports
const express = require("express");
const router = require("express").Router();

//Import controllers from auth.js
const {
  register,
  verifyemail,
  resendemailverification,
} = require("../controllers/auth");

//ROUTES
router.post("/register", register);
router.get("/verify-email/:token", verifyemail);
router.post("/rsend-verificaiton", resendemailverification);

module.exports = router;
