require("dotenv").config;
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Post = require("../model/Post.js");
const User = require("../model/User.js");
const Comment = require("../model/Comment");
// Bubble sort algorithm

exports.deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
});
exports.getPost = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ votes: "desc" }).populate(["author", "comments"]);
  res.status(200).json(posts);
});

exports.getPostsBySearch = asyncHandler(async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags?.split(",") } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

exports.createPost = asyncHandler(async (req, res) => {
  const { title, description, tags, author } = req.body;
  const image = req.file;
  let imageUrl;

  if (image) {
    const body = {
      image: image.buffer.toString("base64"), // Convert the file buffer to a base64-encoded string
      type: "base64",
    };

    const headers = {
      Authorization: `Client-ID 9fe1ae1568fc82d`,
    };

    try {
      const res = await axios.post("https://api.imgur.com/3/image", body, { headers });
      imageUrl = res.data.data.link;
    } catch (error) {
      return res.status(501).json({ message: "File Upload Error" });
    }
  }

  const newPost = new Post({
    title: title,
    description: description,
    tags: tags,
    image: imageUrl,
    author: author,
  });
  await newPost.save();
  res.status(200).json(newPost);
});

exports.updatePost = asyncHandler(async (req, res) => {
  const { postId, updateFields } = req.body;
  const updatedPost = await Post.findByIdAndUpdate(postId, { $set: updateFields }, { new: true });
  res.status(200).json(updatedPost);
});

exports.updateComment = asyncHandler(async (req, res) => {
  const { author, postId, content } = req.body;
  const newComment = await Comment({
    author: author,
    postId: postId,
    content: content,
  });
  newComment.save();
  const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { comments: { $each: [newComment] } } }, { new: true })
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "-password -email",
      },
    })
    .populate("author", "-password -email");
  res.status(200).json(updatedPost);
});

exports.upvote = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const author = req.body.author;
  const currentPost = await Post.findById(postId)
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "-password -email",
      },
    })
    .populate("author", "-password -email");
  if (currentPost.upvoters.includes(author)) {
    // User has already upvoted, so remove their upvote
    currentPost.upvoters.pull(author);
    currentPost.votes -= 1;
  } else {
    // User has not upvoted, so add their upvote
    if (currentPost.downvoters.includes(author)) {
      // User had previously downvoted, so remove their downvote
      currentPost.downvoters.pull(author);
      currentPost.votes += 1;
    }
    currentPost.upvoters.push(author);
    currentPost.votes += 1;
  }
  await currentPost.save();
  res.status(200).json(currentPost);
});

exports.downvote = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const author = req.body.author;
  const currentPost = await Post.findById(postId)
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "-password -email",
      },
    })
    .populate("author", "-password -email");
  if (currentPost.downvoters.includes(author)) {
    // User has already downvoted, so remove their downvote
    currentPost.downvoters.pull(author);
    currentPost.votes += 1;
  } else {
    // User has not downvoted, so add their downvote
    if (currentPost.upvoters.includes(author)) {
      // User had previously upvoted, so remove their upvote
      currentPost.upvoters.pull(author);
      currentPost.votes -= 1;
    }
    currentPost.downvoters.push(author);
    currentPost.votes -= 1;
  }
  await currentPost.save();
  res.status(200).json(currentPost);
});

//    const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { vote: { $each: [userId] } } }, { new: true });
exports.fetchPostbyAuthor = asyncHandler(async (req, res) => {
  const author = req.params.id;
  const userPosts = await Post.find({ author: author }).sort({ updatedAt: -1 }).populate(["author", "comments"]);
  res.status(200).json(userPosts);
});

exports.fetchPostbyId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const currentPost = await Post.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "-password -email",
      },
    })
    .populate("author", "-password -email");
  res.status(200).json(currentPost);
});
