"use strict";
const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  slug: String,
  coverImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    max: 60,
    trim: true,
    required: true,
  },
  footwears: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Footwear",
    },
  ],
});

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

categorySchema.pre(/^find/, function (next) {
  this.populate({ path: "footwears", select: "-slug" });
  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
