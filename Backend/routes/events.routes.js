const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth.js");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events.controller.js");

// Route 2--CREATE note using -POST-- "api/events/create-event". login required.
router.post("/create-event", auth, createEvent);

// Route 1--READ all events using -GET- "api/events/get-events". login required.
router.get("/get-events", auth, getEvents);

// Route 3--UPDATE note using -PUT-- "api/events/update-event". login required.
router.put("/update-event/:id", auth, updateEvent);

// Route 4--DELETE note using -DELETE-- "api/events/delete-event". login required.
router.delete("/delete-event/:id", auth, deleteEvent);

module.exports = router;
