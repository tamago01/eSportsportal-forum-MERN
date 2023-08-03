const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coachSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxLength: 16,
      },
    ],

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Commentc",
      },
    ],

    upvoters: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    downvoters: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coach", coachSchema);
// var Post = mongoose.model("Post", postSchema);
// export default Post;
