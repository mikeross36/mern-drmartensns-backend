"use strict";
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const footwearRouter = require("./footwearRoutes");
const authController = require("../controllers/authController");

router.use("/:categoryId/footwears", footwearRouter);

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(
    authController.tokenProtect,
    authController.restrictTo("admin"),
    categoryController.createCategory
  );

router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(
    authController.tokenProtect,
    authController.restrictTo("admin"),
    categoryController.updateCategory
  )
  .delete(
    authController.tokenProtect,
    authController.restrictTo("admin"),
    categoryController.deleteCategory
  );

module.exports = router;
