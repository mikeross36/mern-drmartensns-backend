"use strict";
const Review = require("../models/reviewModel");
const mainController = require("./mainController");

exports.setFootwearUserIds = function (req, res, next) {
  if (!req.body.footwear) req.body.footwear = req.params.footwearId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

exports.getAllReviews = mainController.getAll(Review);
exports.getReview = mainController.getOne(Review);
exports.createReview = mainController.createOne(Review);
exports.updateReview = mainController.updateOne(Review);
exports.deleteReview = mainController.deleteOne(Review);
