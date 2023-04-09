const mongoose = require("mongoose");
const User = require("./Users");
const Schema = new mongoose.Schema({
  transactionids: {
    type: [
      {
        transactionid: {
          type: String,
          required: true,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
});
module.exports = mongoose.model("Transactions", Schema);
