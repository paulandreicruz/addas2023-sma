//entry point
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

dotenv.config();

//Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

//Mongodb Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database Error => ", err));

//port connection
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
