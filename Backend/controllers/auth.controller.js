const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/User");


const createUser = async (req, res) => {
  let success = false;
  const errors = validationResult(req); //if errors-> return bad request.
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({ success, errors: errors.array() });
  }
  //check user with this email is exist or not.
  try {
    let user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {
      success = false;
      return res
        .status(400)
        .json({ success, error: "Sorry, This email already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const securedPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securedPass,
    });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, "IamTHE$007");
    success = true;
    res.json({ success, authToken });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req); //if errors-> return bad request.
  let success = false;
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({ success, errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res
        .status(400)
        .json({ success, error: "Please login with correct credentials" });
    }
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      success = false;
      return res
        .status(400)
        .json({ success, error: "Please login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, "IamTHE$007");
    success = true;
    res.json({ success, authToken });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
};

// exporting the controller
module.exports = { createUser, loginUser, getUser };
