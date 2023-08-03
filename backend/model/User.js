const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: { type: String },
    avatar: {
      type: String,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
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
    resetToken: String, // Token generated for password reset
    resetTokenExpires: Date, // Expiration date for the reset token
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
// var User = mongoose.model("User", userSchema);
// export default User;
