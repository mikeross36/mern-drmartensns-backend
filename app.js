"use strict";
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const { notFound, errorHandler } = require("./utils/errorHandler");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  cors({
    origin: ["https://drmartensns.onrender.com", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  keyGenerator: (req, res) => {
    return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  },
  message: "To many requests from this IP! Try again in an hour",
});
app.use("/api", limiter);

const footwearRouter = require("./routes/footwearRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const reviewRouter = require("./routes/reviewRoutes");

app.use("/api/v1/footwear", footwearRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    return res.json({ message: "404 not found!" });
  } else {
    return res.type("text").send("404 not found!");
  }
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
