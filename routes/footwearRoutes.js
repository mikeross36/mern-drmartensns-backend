"use strict";
const express = require("express");
const router = express.Router({ mergeParams: true });
const footwearController = require("../controllers/footwearController");
const authController = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

router.use("/:footwearId/reviews", reviewRouter);

router.get("/search-footwear", footwearController.searchFootwear);

router
  .route("/")
  .get(footwearController.getAllFootwear)
  .post(
    authController.tokenProtect,
    authController.restrictTo("admin"),
    footwearController.createFootwear
  );

router
  .route("/:id")
  .get(footwearController.getFootwear)
  .patch(
    authController.tokenProtect,
    authController.restrictTo("admin"),
    footwearController.updateFootwear
  )
  .delete(
    authController.tokenProtect,
    authController.restrictTo("admin"),
    footwearController.deleteFootwear
  );

module.exports = router;
