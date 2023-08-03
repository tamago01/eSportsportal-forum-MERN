const express = require("express");
const Router = express.Router();
const multer = require("multer");
const upload = multer();
const { userAuth } = require("../middlewares/userAuth");
const {
  deleteCoach,
  getCoach,
  createCoach,
  updateCoach,
  updateComment,
  upvote,
  downvote,
  fetchCoachbyAuthor,
  fetchCoachbyId,
  getCoachesBySearch,
  getRequest,
} = require("../controller/coach-controller");

Router.get("/", getCoach);

Router.post("/create", upload.single("image"), createCoach); //creates new Coach, Inputs: title, description, tags, userId

Router.put("/update", updateCoach); //updates Coach, Inputs: id,updateFields(object)
Router.route("/make-request").post(getRequest);
Router.put("/update/comment", updateComment); //add comment / updates Coach, Inputs: userId, CoachId, content
Router.get("/search", getCoachesBySearch);
Router.put("/:id/upvote", upvote); // updates Coach to upvote, Inputs: CoachId and userId
Router.delete("/:id", userAuth, deleteCoach);
Router.put("/:id/downvote", downvote); // updates Coach to upvote, Inputs: CoachId and userId

Router.get("/user/:id", fetchCoachbyAuthor); // fetches all Coach by user

Router.get("/:id", fetchCoachbyId);

module.exports = Router;
