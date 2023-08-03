const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  username: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Message", messageSchema);
