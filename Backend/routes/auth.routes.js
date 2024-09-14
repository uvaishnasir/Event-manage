const express = require("express");
const router = express.Router();
const { body} = require("express-validator");

const {auth} = require("../middleware/auth.js");
const { createUser, loginUser, getUser } = require("../controllers/auth.controller.js");
// Route-1- create the user using -POST-- "api/auth/createuser". No login required.
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Name must be at least 3 chars long").isLength({ min: 3 }),
    body("password", "password must be at least 5 chars long").isLength({
      min: 5,
    }),
  ],
  createUser
);

// Route-2- login the user using -POST-- "api/auth/login".
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  loginUser
);

// Route-3- get the user using -POST-- "api/auth/getuser". login required.
router.post("/getuser", auth, getUser);

module.exports = router;
