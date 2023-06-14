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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/** Controller function for getting a post */
const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/** Controller function for updating a post */
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;
    const authenticatedUserId = req.user._id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== authenticatedUserId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    post.content = content;
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/** Controller function for deleting a post */
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authenticatedUserId = req.user._id;
    const post = await Post.findOne({ _id: postId, user: authenticatedUserId });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Post.deleteOne({ _id: postId });

    await User.findByIdAndUpdate(authenticatedUserId, {
      $pull: { posts: postId },
    });

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/** Controller function for liking a post */
const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authenticatedUserId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.likes.includes(authenticatedUserId)) {
      return res
        .status(403)
        .json({ message: "You have already liked this post" });
    }

    post.likes.push(authenticatedUserId);
    await post.save();
    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: err.message });
  }
};

/** Controller function for disliking a post */
const dislikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authenticatedUserId = req.user._id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!post.likes.includes(authenticatedUserId)) {
      return res.status(403).json({ message: "You have not liked this post" });
    }

    post.likes = post.likes.filter((userId) => userId !== authenticatedUserId);

    await post.save();
    res.status(200).json({ message: "Post disliked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: err.message });
  }
};

/** Controller function for getting timeline post for authenticated user */
const getTimelinePosts = async (req, res) => {
  try {
    const authenticatedUserId = req.user._id;
    const user = await User.findById(authenticatedUserId);
    const followingIds = user.following;

    followingIds.push(authenticatedUserId);

    const posts = await Post.find({ user: { $in: followingIds } })
      .sort({ createdAt: -1 })
      .populate("user", ["username", "avatar"]);

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/** Controller function for getting timeline post for unauthenticated user */
// const unauthorizedTimelinePost = async (req, res) => {
//   try {
//     const authenticatedUserId = req.user ? req.user._id : null;

//     let posts;

//     if (authenticatedUserId) {
//       const user = await User.findById(authenticatedUserId);
//       const followingIds = user.following;

//       followingIds.push(authenticatedUserId);

//       posts = await Post.find({ user: { $in: followingIds } })
//         .sort({ createdAt: -1 })
//         .populate("user", "username avatar");
//     } else {
//       posts = await Post.find()
//         .populate("user", "username avatar")
//         .populate({
//           path: "user",
//           match: { followers: { $gte: 2 } },
//           select: "username avatar",
//         })
//         .sort({ createdAt: -1 });
//     }

//     res.status(200).json(posts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  getTimelinePosts,
};
