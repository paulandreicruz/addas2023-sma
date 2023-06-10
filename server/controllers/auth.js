/** Imports*/
const User = require("../models/user");
const {
  hashPassword,
  comparePassword,
  generateVerificationtoken,
} = require("../helpers/auth");
const nodemailer = require("nodemailer");

/** Controller function for user registration*/
const register = async (req, res) => {
  try {
    const { username, password, email, firstname, lastname } = req.body;

    //Validator messages for user registration

    if (!firstname.trim()) {
      return res.json({ error: "Firstname is required" });
    }
    if (!lastname.trim()) {
      return res.json({ error: "Lastname is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.json({
        error:
          "Password must contain at least one uppercase letter, one special character, and one number, and be at least 8 characters long.",
      });
    }
    const existingemail = await User.findOne({ email });
    if (existingemail) {
      return res.json({ error: "Email is taken" });
    }
    const existingusername = await User.findOne({ username });
    if (existingusername) {
      return res.json({ error: "Username is taken" });
    }

    const hashedPassword = await hashPassword(password);
    const verificationtoken = generateVerificationtoken();

    const user = new User({
      username,
      firstname,
      email,
      lastname,
      password: hashedPassword,
      verificationtoken: verificationtoken.token,
      verificationtokenexpiry: verificationtoken.expirationDate,
    });

    await user.save();

    //Nodemailer email verification
    const verificationlink = `${process.env.CLIENT_URL}/verify-email/${verificationtoken.token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const verificationmessage = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Email Verification",
      html: `
      <div style="background-color: #F5F5F5; padding: 20px; color: black">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; padding: 40px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center;">
          <img src="https://scontent.fmnl5-2.fna.fbcdn.net/v/t39.30808-6/295513367_417116773770605_4039671274580630735_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeEdTcyi4CcYe3wIoeENTvbz3B4F9XFE2-3cHgX1cUTb7TSasIuz-FYKMzneXqMZwtsFkou0Q6iJ4kOY2y40QJHC&_nc_ohc=LJslj-n-HwcAX_1CzoL&_nc_ht=scontent.fmnl5-2.fna&oh=00_AfCWrbvRPpxUQKdoQsqRh-BLF1lJovu9C0knObkaZIds_g&oe=645CB0D2" alt="" style="max-width: 150px;">
        </div>
        <div style="text-align: center;">
          <img src="https://www.pngall.com/wp-content/uploads/8/Email-Verification.png" alt="" style="max-width: 150px;">
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <h1 style="font-size: 36px; font-family: sans-serif; margin: 0;">Verify Your Email Address</h1>
        </div>
        <div style="font-size: 20px; font-family: sans-serif; margin-top: 30px; line-height: 1.5; text-align: center; color: gray">
          <p>To have full access to the website, we need to verify your email. Please click the verification link below:</p>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <a href="${verificationlink}" style="display: inline-block; background-color: #277DA1; color: #fff; text-decoration: none; padding: 16px 24px; font-size: 24px; font-family: sans-serif; border-radius: 4px; width: 80%">Click to Verify</a>
        </div>
      </div>
    </div>
      `,
    };

    transporter.sendMail(verificationmessage, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res
      .status(201)
      .json({ message: "Registration Successful, Check email address." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const verifyemail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationtoken: token });

    //Token Validation
    if (!user) {
      return res.json({ error: "Invalid or expired token" });
    }
    if (user.verificationtokenexpiry < Date.now()) {
      return res.json({ error: "Verification token has expired" });
    }

    //Update user verification status
    user.isVerified = true;
    user.verificationtoken = null;
    user.verificationtokenexpiry = null;

    await user.save();

    return res.status(201).json({ message: "Email has successfully verified" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
};

const resendemailverification = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // Check the resend verification email counter
    if (user.resendemailverification >= 5) {
      return res.status(400).json({
        error: "Maximum resend verification email limit reached",
      });
    }

    //Increment the number of resend verification email
    user.resendemailverification = user.resendemailverification + 1;

    // Generate new verification token and expiry date and save to user's account
    const verificationtoken = generateVerificationtoken();

    user.verificationtoken = verificationtoken.token;
    user.verificationtokenexpiry = verificationtoken.expiryDate;

    await user.save();

    const verificationlink = `${process.env.CLIENT_URL}/verify-email/${verificationtoken.token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const verificationmessage = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Email Verification",
      html: `
      <div style="background-color: #F5F5F5; padding: 20px; color: black">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; padding: 40px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center;">
          <img src="https://scontent.fmnl5-2.fna.fbcdn.net/v/t39.30808-6/295513367_417116773770605_4039671274580630735_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeEdTcyi4CcYe3wIoeENTvbz3B4F9XFE2-3cHgX1cUTb7TSasIuz-FYKMzneXqMZwtsFkou0Q6iJ4kOY2y40QJHC&_nc_ohc=LJslj-n-HwcAX_1CzoL&_nc_ht=scontent.fmnl5-2.fna&oh=00_AfCWrbvRPpxUQKdoQsqRh-BLF1lJovu9C0knObkaZIds_g&oe=645CB0D2" alt="" style="max-width: 150px;">
        </div>
        <div style="text-align: center;">
          <img src="https://www.pngall.com/wp-content/uploads/8/Email-Verification.png" alt="" style="max-width: 150px;">
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <h1 style="font-size: 36px; font-family: sans-serif; margin: 0;">Verify Your Email Address</h1>
        </div>
        <div style="font-size: 20px; font-family: sans-serif; margin-top: 30px; line-height: 1.5; text-align: center; color: gray">
          <p>To have full access to the website, we need to verify your email. Please click the verification link below:</p>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <a href="${verificationlink}" style="display: inline-block; background-color: #277DA1; color: #fff; text-decoration: none; padding: 16px 24px; font-size: 24px; font-family: sans-serif; border-radius: 4px; width: 80%">Click to Verify</a>
        </div>
      </div>
    </div>
      `,
    };

    transporter.sendMail(verificationmessage, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.json({ message: "New verification email sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured" });
  }
};

module.exports = { register, verifyemail, resendemailverification };
