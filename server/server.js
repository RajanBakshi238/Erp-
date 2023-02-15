const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require('express');
const cookieParser = require("cookie-parser");

const app = require("./app");
const corsOptions = require("./config/corsOptions");

dotenv.config({ path: "./config.env" });

// const allowedOrigins = [
//   'https://www.yoursite.com',
//   'http://127.0.0.1:5500',
//   'http://localhost:3500',
//   'http://localhost:3000/',
//   'http://localhost:3001'
// ];

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   // if (allowedOrigins.includes(origin)) {
//     // console.log("?????????????????????????")
//     res.header("Access-Control-Allow-Credentials", true);
//   // }
//   next();
// });
// app.use(cors('*'));

// app.use(express.json());
// app.use(cookieParser());

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down ...");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 4000;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log("Network or Connection error");
  });

const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
