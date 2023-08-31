"use strict";
const mainController = require("./mainController");
const Footwear = require("../models/footwearModel");
const asyncHandler = require("express-async-handler");

exports.getAllFootwear = mainController.getAll(Footwear);
exports.getFootwear = mainController.getOne(Footwear, { path: "reviews" });
exports.createFootwear = mainController.createOne(Footwear);
exports.updateFootwear = mainController.updateOne(Footwear);
exports.deleteFootwear = mainController.deleteOne(Footwear);

exports.searchFootwear = asyncHandler(async function (req, res) {
  function querySearch() {
    return req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { gender: { $regex: req.query.search, $options: "i" } },
            { category: { $regex: req.query.search, $options: "i" } },
            { material: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  }
  const footwear = await Footwear.find(querySearch());
  if (!footwear) {
    return res
      .status(404)
      .json({ message: "There is no results on your search term!" });
  }
  return res.status(200).json(footwear);
});
