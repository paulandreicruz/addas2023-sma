const Post = require("../models/post");
const User = require("../models/user");

/** Controller function for creating a post */
const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const authenticatedUserId = req.user._id;

    const newPost = new Post({
      user: authenticatedUserId,
      content,
    });

    const savedPost = await newPost.save();

    await User.findByIdAndUpdate(authenticatedUserId, {
      $push: { posts: savedPost._id },
    });

    res.status(200).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

module.exports = { createPost };
