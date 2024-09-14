const express = require("express");
const router = express.Router();

const { createUser, loginUser } = require("../controllers/auth.controller.js");

// Route-1- create the user using -POST-- "api/auth/sign-up". No login required.
router.post("/sign-up", createUser);

// Route-2- login the user using -POST-- "api/auth/login".
router.post("/login", loginUser);

module.exports = router;
