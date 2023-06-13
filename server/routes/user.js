//Imports
const express = require("express");
const router = require("express").Router();

//Import middleware from auth.js
const { requireSignin } = require("../middleware/auth");

//Import controllers from user.js
const {
  getUser,
  getAllUsers,
  updateUserDetails,
  updateUserInfo,
  followUser,
  unfollowUser,
} = require("../controllers/user");

//ROUTES

//GET
router.get("/get/:id", getUser);
router.get("/all", getAllUsers);

//PUT
router.put("/profile", requireSignin, updateUserDetails);
router.put("/info", requireSignin, updateUserInfo);
router.put("/follow", requireSignin, followUser);
router.put("/unfollow", requireSignin, unfollowUser);

module.exports = router;
