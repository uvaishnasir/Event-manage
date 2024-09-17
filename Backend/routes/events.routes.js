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
router.post("/create", auth, createEvent);

// Route 1--READ all events using -GET- "api/events/get-events". login required.
router.get("/get-all", auth, getEvents);

// Route 3--UPDATE note using -PUT-- "api/events/update-event". login required.
router.put("/update/:id", auth, updateEvent);

// Route 4--DELETE note using -DELETE-- "api/events/delete-event". login required.
router.delete("/delete/:id", auth, deleteEvent);

module.exports = router;
