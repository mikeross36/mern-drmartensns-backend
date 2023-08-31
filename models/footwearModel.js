"use strict";
const mongoose = require("mongoose");
const slugify = require("slugify");

const footwearSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["unisex", "men", "women", "kids"],
      required: true,
    },
    category: {
      type: String,
      enum: ["boots", "shoes", "sandals", "platforms"],
      default: "boots",
      required: true,
    },
    slug: String,
    coverImage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    material: {
      type: String,
      default: "leather",
      required: true,
    },
    soleHeight: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      max: 60,
      reqired: true,
    },
    care: {
      type: String,
      max: 60,
      required: true,
    },
    rating: {
      type: Number,
      default: 4,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

footwearSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

footwearSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "footwear",
  localField: "_id",
});

const Footwear = mongoose.model("Footwear", footwearSchema);

module.exports = Footwear;
