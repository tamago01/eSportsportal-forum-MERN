const bodyParser = require("body-parser");
const Post = require("./model/Post.js");
const User = require("./model/User.js");
const Coach = require("./model/Coach.js");
const Comment = require("./model/Comment.js");
const Commentc = require("./model/Commentc.js");
const Message = require("./model/Message.js");
const RequestData = require("./model/RequestData.js");
const CoachRequest = require("./model/coachRequest.js");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const axios = require("axios");
const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const coachRoutes = require("./routes/coach-routes");
const followRoutes = require("./routes/follow-routes");
const threadRoutes = require("./routes/thread-routes");

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
mongoose
  .connect("mongodb+srv://tamangjake:nepal123@cluster0.yzf04mi.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/thread", threadRoutes);
app.use("/api/coach", coachRoutes);

app.listen(PORT, () => console.log(`${PORT}`));

app.post("/updateUserType", async (req, res) => {
  const { userId, userType } = req.body;
  try {
    // Find the user by _id and update the userType field
    await User.findByIdAndUpdate(userId, { userType });
    res.send({ status: "Ok", data: "User type updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error", data: "Failed to update user type" });
  }
});

app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});
app.get("/getAllMessage", async (req, res) => {
  try {
    const allMessage = await Message.find({});
    res.send({ status: "ok", data: allMessage });
  } catch (error) {
    console.log(error);
  }
});
app.post("/deleteMessage", async (req, res) => {
  const { messageid } = req.body;
  try {
    await Message.deleteOne({ _id: mssageid });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});
app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    await User.deleteOne({ _id: userid });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});
app.get("/getAllPost", async (req, res) => {
  try {
    const allPost = await Post.find({});
    res.send({ status: "ok", data: allPost });
  } catch (error) {
    console.log("This is");
  }
});
app.get("/getAllRequest", async (req, res) => {
  try {
    const allRequest = await RequestData.find({});
    res.send({ status: "ok", data: allRequest });
  } catch (error) {
    console.log(zxzcv);
  }
});
app.post("/deletePost", async (req, res) => {
  const { postid } = req.body;
  try {
    await Post.deleteOne({ _id: postid });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});
app.post("/deleteComment", async (req, res) => {
  const { postid } = req.body;
  try {
    await Comment.deleteOne({ _id: postid });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});
app.post("/deleteCoachComment", async (req, res) => {
  const { coachid } = req.body;
  try {
    await Commentc.deleteOne({ _id: coachid });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});
app.get("/getAllCoach", async (req, res) => {
  try {
    const allCoach = await Coach.find({});
    res.send({ status: "ok", data: allCoach });
  } catch (error) {
    console.log(error);
  }
});
app.post("/deleteCoach", async (req, res) => {
  const { coachid } = req.body;
  try {
    await Coach.deleteOne({ _id: coachid });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});
app.post("/deleteRequest", async (req, res) => {
  const { requestid } = req.body;
  try {
    await RequestData.deleteOne({ _id: requestid });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});
app.post("/feedback", async (req, res) => {
  try {
    const { message, author, username } = req.body;

    // Save feedback to the database
    const newMessage = new Message({ message, author, username });
    await newMessage.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
});
const khaltiApi = "https://a.khalti.com/api/v2/epayment/initiate/";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/khalti/", async (req, res) => {
  const data = req.body;

  try {
    const response = await axios({
      method: "POST",
      headers: {
        Authorization: "Key bc9df274e3584889adf0454fb16e478b",
      },
      url: khaltiApi,
      data: data,
    });

    console.log(response.data);

    // Save the CoachRequest with customer_info to the database
    const newCoachRequest = new CoachRequest({
      pidx: response.data.pidx,
      txnId: response.data.txnId,
      amount: data.amount,
      mobile: data.customer_info.phone,
      purchase_order_id: data.purchase_order_id,
      purchase_order_name: data.purchase_order_name,
      transaction_id: data.transaction_id,
      customer_info: {
        name: data.customer_info.name,
        email: data.customer_info.email,
        phone: data.customer_info.phone,
      },
    });

    // Save the CoachRequest data to the database
    await newCoachRequest.save();

    // Save the data to the RequestData model
    const newRequestData = new RequestData({
      name: data.customer_info.name,
      email: data.customer_info.email,
      phone: data.customer_info.phone,
      amount: data.amount,
      // Add any other fields you want to save.
    });

    await newRequestData.save();

    res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});
app.get("/khalti/confirm", async (req, res) => {
  res.send("hello");
});
