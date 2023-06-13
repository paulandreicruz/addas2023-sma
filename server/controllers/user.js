const User = require("../models/user");

/** Controller function for getting a User */
const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (user) {
      const { password, ...userDetails } = user._doc;

      res.status(200).json(userDetails);
    } else {
      res.status(400).json("User doesn't exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/** Controller function for getting all the users */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const userDetails = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(userDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/** Controller function for updating user details */
const updateUserDetails = async (req, res) => {
  try {
    const { username, firstname, lastname } = req.body;
    console.log("User ID:", req.user._id);
    const user = await User.findById(req.user._id);
    console.log("User:", user);

    if (!firstname.trim()) {
      return res.json({ error: "Firstname is required" });
    }
    if (!lastname.trim()) {
      return res.json({ error: "Lastname is required" });
    }
    const existingusername = await User.findOne({ username });
    console.log("Existing username:", existingusername);

    if (existingusername) {
      return res.json({ error: "Username is taken" });
    }

    const updatedProfile = await User.findByIdAndUpdate(
      req.user._id,
      {
        username: username || user.username,
        firstname: firstname || user.firstname,
        lastname: lastname || user.lastname,
      },
      {
        new: true,
      }
    );

    console.log("Updated profile:", updatedProfile);

    res.status(200).json(updatedProfile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/** Controller function for updating user information */
const updateUserInfo = async (req, res) => {
  try {
    const { about, livesin, worksat, streetaddress } = req.body;

    const updatedInfo = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          about,
          livesin,
          worksat,
          streetaddress,
        },
      },
      { new: true }
    );

    if (!updatedInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

/** Controller function for following a user */
const followUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const authenticatedUserId = req.user._id;

    if (_id === authenticatedUserId) {
      return res.status(403).json("Cannot follow yourself");
    } else {
      try {
        const followUser = await User.findById(_id);
        const authenticatedUser = await User.findById(authenticatedUserId);

        if (!followUser.followers.includes(authenticatedUserId)) {
          await followUser.updateOne({
            $push: { followers: authenticatedUserId },
          });
          await authenticatedUser.updateOne({
            $push: { following: _id },
          });
          res.status(200).json("User followed!");
        } else {
          res.status(403).json("You are already following this user");
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { _id } = req.body;
    const authenticatedUserId = req.user._id;

    if (_id === authenticatedUserId) {
      return res.status(403).json("Cannot unfollow yourself");
    } else {
      try {
        const unfollowUser = await User.findById(_id);
        const authenticatedUser = await User.findById(authenticatedUserId);

        if (unfollowUser.followers.includes(authenticatedUserId)) {
          await unfollowUser.updateOne({
            $pull: { followers: authenticatedUserId },
          });
          await authenticatedUser.updateOne({
            $pull: { following: _id },
          });
          res.status(200).json("User unfollowed!");
        } else {
          res.status(403).json("You are not following this user");
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  getAllUsers,
  updateUserDetails,
  updateUserInfo,
  followUser,
  unfollowUser,
};
