require("dotenv").config;
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Coach = require("../model/Coach.js");
const User = require("../model/User.js");
const Commentc = require("../model/Commentc");
const CoachRequest = require("../model/coachRequest.js");

exports.getRequest = asyncHandler(async (req, res) => {
  const { request, creator, email } = req.body;
  const newRequest = new CoachRequest({ ...request, creator: creator, email: email, createdAt: new Date().toISOString() });
  try {
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});
exports.deleteCoach = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Coach with id: ${id}`);

  await Coach.findByIdAndRemove(id);

  res.json({ message: "Coach deleted successfully." });
});
exports.getCoach = asyncHandler(async (req, res) => {
  const coachess = await Coach.find().sort({ votes: "desc" }).populate(["author", "comments"]);
  res.status(200).json(coachess);
});

exports.getCoachesBySearch = asyncHandler(async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const coach = await Coach.find({
      $or: [{ title }, { tags: { $in: tags?.split(",") } }],
    });

    res.json({ data: coach });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

exports.createCoach = asyncHandler(async (req, res) => {
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

  const newCoach = new Coach({
    title: title,
    description: description,
    tags: tags,
    image: imageUrl,
    author: author,
  });
  await newCoach.save();
  res.status(200).json(newCoach);
});

exports.updateCoach = asyncHandler(async (req, res) => {
  const { coachId, updateFields } = req.body;
  const updatedCoach = await Coach.findByIdAndUpdate(coachId, { $set: updateFields }, { new: true });
  res.status(200).json(updatedCoach);
});

exports.updateComment = asyncHandler(async (req, res) => {
  const { author, coachId, content } = req.body;
  const newComment = await Commentc({
    author: author,
    coachId: coachId,
    content: content,
  });
  newComment.save();
  const updatedCoach = await Coach.findByIdAndUpdate(coachId, { $push: { comments: { $each: [newComment] } } }, { new: true })
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "-password -email",
      },
    })
    .populate("author", "-password -email");
  res.status(200).json(updatedCoach);
});

exports.upvote = asyncHandler(async (req, res) => {
  const coachId = req.params.id;
  const author = req.body.author;
  const currentCoach = await Coach.findById(coachId)
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "-password -email",
      },
    })
    .populate("author", "-password -email");
  if (currentCoach.upvoters.includes(author)) {
    // User has already upvoted, so remove their upvote
    currentCoach.upvoters.pull(author);
    currentCoach.votes -= 1;
  } else {
    // User has not upvoted, so add their upvote
    if (currentCoach.downvoters.includes(author)) {
      // User had previously downvoted, so remove their downvote
      currentCoach.downvoters.pull(author);
      currentCoach.votes += 1;
    }
    currentCoach.upvoters.push(author);
    currentCoach.votes += 1;
  }
  await currentCoach.save();
  res.status(200).json(currentCoach);
});

exports.downvote = asyncHandler(async (req, res) => {
  const coachId = req.params.id;
  const author = req.body.author;
  const currentCoach = await Coach.findById(coachId)
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "-password -email",
      },
    })
    .populate("author", "-password -email");
  if (currentCoach.downvoters.includes(author)) {
    // User has already downvoted, so remove their downvote
    currentCoach.downvoters.pull(author);
    currentCoach.votes += 1;
  } else {
    // User has not downvoted, so add their downvote
    if (currentCoach.upvoters.includes(author)) {
      // User had previously upvoted, so remove their upvote
      currentCoach.upvoters.pull(author);
      currentCoach.votes -= 1;
    }
    currentCoach.downvoters.push(author);
    currentCoach.votes -= 1;
  }
  await currentCoach.save();
  res.status(200).json(currentCoach);
});

//    const updatedCoach = await Coach.findByIdAndUpdate(CoachId, { $push: { vote: { $each: [userId] } } }, { new: true });
exports.fetchCoachbyAuthor = asyncHandler(async (req, res) => {
  const author = req.params.id;
  const userCoaches = await Coach.find({ author: author }).sort({ updatedAt: -1 }).populate(["author", "comments"]);
  res.status(200).json(userCoaches);
});

exports.fetchCoachbyId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const currentCoach = await Coach.findById(id)
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "-password -email",
      },
    })
    .populate("author", "-password -email");
  res.status(200).json(currentCoach);
});
