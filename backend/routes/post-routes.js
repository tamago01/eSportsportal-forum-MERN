const express = require("express");
const Router = express.Router();
const multer = require("multer");
const upload = multer();
const { userAuth } = require("../middlewares/userAuth");
const { deletePost, getPost, createPost, updatePost, updateComment, upvote, downvote, fetchPostbyAuthor, fetchPostbyId, getPostsBySearch } = require("../controller/post-controller");

Router.get("/", getPost);

Router.post("/create", upload.single("image"), createPost); //creates new post, Inputs: title, description, tags, userId

Router.put("/update", updatePost); //updates post, Inputs: id,updateFields(object)

Router.put("/update/comment", updateComment); //add comment / updates post, Inputs: userId, postId, content
Router.get("/search", getPostsBySearch);
Router.put("/:id/upvote", upvote); // updates post to upvote, Inputs: postId and userId
Router.delete("/:id", userAuth, deletePost);
Router.put("/:id/downvote", downvote); // updates post to upvote, Inputs: postId and userId

Router.get("/user/:id", fetchPostbyAuthor); // fetches all post by user

Router.get("/:id", fetchPostbyId);

module.exports = Router;
