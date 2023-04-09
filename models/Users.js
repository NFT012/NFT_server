const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    wid: {
      type: String,
      required: true,
    } 
  
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", Schema);
