const express = require("express");
const Router = express.Router();
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const { userAuth } = require("../middlewares/userAuth");
const { createAccount, verifyAccount, getAccount, getMe, editProfile, resetPassword } = require("../controller/user-controller");
const upload = multer();

Router.post("/create", upload.single("avatar"), createAccount);
Router.post("/verify", verifyAccount);
Router.get("/me", userAuth, getMe);
Router.post("/reset-password", resetPassword);
Router.post("/:id", getAccount);
Router.put("/edit-profile/:id", userAuth, upload.single("avatar"), editProfile);

module.exports = Router;
