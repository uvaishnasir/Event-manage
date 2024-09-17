const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
      required: true,
    },
    reminders: [Date], // Dates when reminders should be sent.
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("events", eventSchema);
