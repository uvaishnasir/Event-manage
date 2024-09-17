const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User.model.js");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  //check user with this email is exist or not.
  try {
    let user = await User.findOne({ email });
    if (user) {
      success = false;
      return res
        .status(400)
        .json({ success, error: "This email already exist." });
    }
    const salt = await bcrypt.genSalt(10);

    const securedPass = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password: securedPass });

    // const data = {
    //   user: {
    //     id: user.id,
    //   },
    // };
    // const authToken = jwt.sign(data, "IamTHE$007");

    return res.json({
      success: true,
      // authToken,
      message: "User created Successfully.",
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Internal Server Error");
  }
};

const loginUser = async (req, res) => {
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
    console.log(passCompare);

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
    return res.json({
      success: true,
      authToken,
      message: "Logged in Successfully.",
    });
  } catch (e) {
    console.error(e.message);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { createUser, loginUser };
