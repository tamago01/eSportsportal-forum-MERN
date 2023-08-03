const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const coachRequestSchema = Schema({
  pidx: String,
  txnId: String,
  amount: Number,
  mobile: String,
  purchase_order_id: String,
  purchase_order_name: String,
  transaction_id: String,
  customer_info: {
    name: String,
    email: String,
    phone: String,
  },
});
module.exports = mongoose.model("CoachRequest", coachRequestSchema);
