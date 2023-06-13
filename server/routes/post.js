const express = require("express");
const router = require("express").Router();

//Import middleware from auth.js
const { requireSignin } = require("../middleware/auth");

//Import controllers from post.js
const { createPost } = require("../controllers/post");

//ROUTES
router.post("/post", requireSignin, createPost);

module.exports = router;
