//Import bcrypt module to has password
const bcrypt = require("bcrypt");
const crypto = require("crypto");

/** Helper function for hashing the password*/
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

/** Helper function for comparing the password*/
const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

/** Helper function for generating the verification token*/
const generateVerificationtoken = () => {
  const token = crypto.randomBytes(20).toString("hex");
  const expirationDate = Date.now() + 5 * 60 * 1000; // Expiry time 5minutes from now.
  return { token, expirationDate };
};

module.exports = {
  hashPassword,
  comparePassword,
  generateVerificationtoken,
};
