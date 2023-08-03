const mongoose = require("mongoose");

const requestDataSchema = new mongoose.Schema(
  {
    // Define the schema fields as per your requirements.
    // For example:
    name: String,
    email: String,
    phone: String,
    amount: Number,
    // Add any other fields you want to store.
  },
  { timestamps: true }
);

const RequestData = mongoose.model("RequestData", requestDataSchema);

module.exports = RequestData;
