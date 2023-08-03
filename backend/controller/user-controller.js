require("dotenv").config();
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");
const crypto = require("crypto");
exports.createAccount = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  const avatar = req.file;
  let imageUrl;

  const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
  if (existingUser) {
    return res.status(409).json({ error: "Already exist" });
  }

  const body = {
    image: avatar.buffer.toString("base64"), // Convert the file buffer to a base64-encoded string
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
  const encry_password = bcrypt.hashSync(password);
  const newUser = new User({
    name: name,
    username: username,
    email: email,
    password: encry_password,
    avatar: imageUrl,
    userType: "User",
  });
  await newUser.save();

  //TODO token
  res.status(200).json({
    _id: newUser._id,
    name: newUser.name,
    username: newUser.username,
    email: newUser.email,
    avatar: newUser.avatar,
    token: generateToken(newUser._id),
  });
});

// exports.verifyAccount = asyncHandler(async (req, res) => {
//   const { username, email, password } = req.body;
//   const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });

//   if (!existingUser) {
//     return res.status(404).json({ message: "Account doesn't exist" });
//   }

//   if (bcrypt.compare(password, existingUser.password)) {
//     res.status(200).json({
//       _id: existingUser._id,
//       name: existingUser.name,
//       username: existingUser.username,
//       email: existingUser.email,
//       token: generateToken(existingUser._id),
//     });
//   } else {
//     res.status(401).json({ message: "Password does not match" });
//   }
// });
exports.verifyAccount = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({ message: "Account doesn't exist" });
  }

  // Check if the provided password matches the temporary password in the database
  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (passwordMatch) {
    res.status(200).json({
      _id: existingUser._id,
      name: existingUser.name,
      username: existingUser.username,
      email: existingUser.email,
      token: generateToken(existingUser._id),
    });
  } else {
    res.status(401).json({ message: "Password does not match" });
  }
});

// exports.editProfile = asyncHandler(async (req, res) => {
//   const { username } = req.body;
//   const avatar = req.file; // Assuming you are uploading a new avatar image

//   // Check if the username already exists (except for the current user)
//   const existingUser = await User.findOne({ username, _id: { $ne: req.user._id } }); // Use $ne (not equal) to exclude the current user's ID
//   if (existingUser) {
//     return res.status(409).json({ error: "Username is already taken" });
//   }

//   let imageUrl = req.user.avatar;

//   // If a new avatar image is uploaded, update the avatar
//   if (avatar) {
//     const body = {
//       image: avatar.buffer.toString("base64"), // Convert the file buffer to a base64-encoded string
//       type: "base64",
//     };

//     const headers = {
//       Authorization: `Client-ID 9fe1ae1568fc82d`,
//     };

//     try {
//       const response = await axios.post("https://api.imgur.com/3/image", body, { headers });
//       imageUrl = response.data.data.link;
//     } catch (error) {
//       return res.status(501).json({ message: "File Upload Error" });
//     }
//   }

//   // Update the user's username and avatar
//   req.user.username = username;
//   req.user.avatar = imageUrl;

//   // Save the updated user details
//   await req.user.save();

//   res.status(200).json({
//     _id: req.user._id,
//     name: req.user.name,
//     username: req.user.username,
//     email: req.user.email,
//     avatar: req.user.avatar,
//     userType: req.user.userType,
//   });
// });
exports.editProfile = asyncHandler(async (req, res) => {
  const { username, newPassword } = req.body;
  const avatar = req.file; // Assuming you are uploading a new avatar image

  // Check if the username already exists (except for the current user)
  const existingUser = await User.findOne({ username, _id: { $ne: req.user._id } }); // Use $ne (not equal) to exclude the current user's ID
  if (existingUser) {
    return res.status(409).json({ error: "Username is already taken" });
  }

  let imageUrl = req.user.avatar;

  // If a new avatar image is uploaded, update the avatar
  if (avatar) {
    const body = {
      image: avatar.buffer.toString("base64"), // Convert the file buffer to a base64-encoded string
      type: "base64",
    };

    const headers = {
      Authorization: `Client-ID 9fe1ae1568fc82d`,
    };

    try {
      const response = await axios.post("https://api.imgur.com/3/image", body, { headers });
      imageUrl = response.data.data.link;
    } catch (error) {
      return res.status(501).json({ message: "File Upload Error" });
    }
  }

  // Update the user's username and avatar
  req.user.username = username;
  req.user.avatar = imageUrl;

  // If a new password is provided, update the password
  if (newPassword) {
    // Hash the new password
    const hashedNewPassword = bcrypt.hashSync(newPassword);

    // Update the user's password
    req.user.password = hashedNewPassword;
  }

  // Save the updated user details
  await req.user.save();

  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
    avatar: req.user.avatar,
    userType: req.user.userType,
  });
});

exports.getAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) return res.status(404).json({ message: "User does not exist" });

  res.status(200).json(user);
});

exports.getMe = asyncHandler(async (req, res) => {
  res.send(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a temporary password
    const temporaryPassword = crypto.randomBytes(8).toString("hex");

    // Hash the temporary password
    const hashedTemporaryPassword = bcrypt.hashSync(temporaryPassword);

    // Update the user's password with the hashed temporary password
    user.password = hashedTemporaryPassword;

    // Save the updated user object
    await user.save();

    // Respond with the temporary password
    res.status(200).json({ temporaryPassword });
  } catch (err) {
    console.error("Error in resetPassword controller:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
