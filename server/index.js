//Entry point
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

//dotenv configuration
dotenv.config();

//Creating http server using socket io
const httpServer = createServer(app).listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
const io = new Server(httpServer);

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Mongodb Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database Error => ", err));
