const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentcSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coachId: {
      type: Schema.Types.ObjectId,
      ref: "Coach",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commentc", commentcSchema);
