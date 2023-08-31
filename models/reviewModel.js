"use strict";
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      max: 60,
      trim: true,
    },
    footwear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Footwear",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      max: 5,
      min: 1,
      default: 1,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name photo" });
  next();
});

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "footwear", select: "name coverImage" });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
