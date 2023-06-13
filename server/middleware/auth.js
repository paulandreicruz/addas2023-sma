const jwt = require("jsonwebtoken");
const User = require("../models/user");

/** Middleware function for JWT Token */
const requireSignin = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    req.user = decoded;
    console.log("User information:", req.user);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json(err);
  }
};

/** Middleware function for Admin Auth */
const adminAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.isAdmin !== false) {
      return res.status(401).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { requireSignin, adminAuth };
