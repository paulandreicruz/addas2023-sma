const express = require("express");
const router = require("express").Router();

//Import middleware from auth.js
const { requireSignin } = require("../middleware/auth");

//Import controllers from post.js
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  getTimelinePosts,
} = require("../controllers/post");

//ROUTES

//POST
router.post("/post", requireSignin, createPost);

//PUT
router.put("/:id", requireSignin, updatePost);
router.put("/:id/like", requireSignin, likePost);
router.put("/:id/dislike", requireSignin, dislikePost);

//GET
router.get("/home", requireSignin, getTimelinePosts);
router.get("/:id", getPost);

//DELETE
router.delete("/:id", requireSignin, deletePost);

module.exports = router;
