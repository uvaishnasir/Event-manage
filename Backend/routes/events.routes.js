const express = require("express");
const { auth } = require("../middleware/auth.js");
const router = express.Router();
const { body } = require("express-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events.controller.js");

// Route 1--READ all events using -GET- "api/notes/fetchnotes". login required.
router.get("/fetchallnotes", auth, getEvents);

// Route 2--CREATE note using -POST-- "api/notes/createnote". login required.
router.post(
  "/createnote",
  auth,
  [
    body("title", "title must be at least 3 chars long").isLength({ min: 3 }),
    body("description", "description must be at least 5 chars long").isLength({
      min: 5,
    }),
  ],
  createEvent
);

// Route 3--UPDATE note using -PUT-- "api/notes/updatenote". login required.
router.put("/updatenote/:id", auth, updateEvent);

// Route 4--DELETE note using -DELETE-- "api/notes/deletenote". login required.
router.delete("/deletenote/:id", auth, deleteEvent);

module.exports = router;
