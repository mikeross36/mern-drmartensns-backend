"use strict";
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/signup-user", authController.signupUser);
router.post("/login-user", authController.loginUser);
router.post("/logout-user", authController.logoutUser);

router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);

router.use(authController.tokenProtect);

router.patch("/update-password", authController.updatePassword);
router.patch(
  "/update-user-account",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateUserAccount
);
router.get(
  "/user-profile",
  userController.getUserProfile,
  userController.getUser
);

router
  .route("/")
  .get(authController.restrictTo("admin"), userController.getAllUsers);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
