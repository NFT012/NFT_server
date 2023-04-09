const User = require("../models/Users");

const dotenv = require("dotenv").config();

const LoginController = async (req, res) => {
  try {
    console.log(req.body);
    const wid = req.body.wid;

    // Simple validation
    if (!wid) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const user = await User.findOne({ wid: wid });
    if (!user)
      return res
        .status(400)
        .json({ msg: "User Does not exist , Invalid Credentials" });
    else if (user) {
      console.log(user);

      res.status(200).json({
        username: user.username,
        wid: wid,
        userid: user._id,
      });

      console.log(result); // true
    } else {
      res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "OOPS! There Is Error In Server Side" });
  }
};

const RegController = async (req, res) => {
  try {
    const { username, wid } = req.body;
    const existingUser = await User.findOne({ wid: wid });
    if (existingUser) {
      return res
        .status(400)
        .json({data : existingUser });
    }

    const user = new User({
      username,
      wid,
    });
    const z = await user.save();
    res.json({ data: z });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "OOPS! There Is Error In Server Side" });
  }
};
module.exports = {
  LoginController,
  RegController,
};
