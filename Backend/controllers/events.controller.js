const Events = require("../models/Event.model.js");

const getEvents = async (req, res) => {
  try {
    const events = await Events.find({ user: req.user.id });
    res.send(events);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, reminders } = req.body;
    const event = new Events({
      title,
      description,
      date,
      location,
      reminders,
      user: req.user.id,
    });
    const savedEvent = await event.save();
    res.json({
      success: true,
      message: "Event created successfully",
      savedEvent,
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
};

const updateEvent = async (req, res) => {
  const { title, description, date, location, reminders } = req.body;
  //create the new dummy event.
  try {
    const newData = {};
    if (title) {
      newData.title = title;
    }
    if (description) {
      newData.description = description;
    }
    if (date) {
      newData.date = date;
    }
    if (location) {
      newData.location = location;
    }
    if (reminders) {
      newData.reminders = reminders;
    }

    //find the event to be updated and update it.
    let event = await Events.findById(req.params.id);

    if (!event) return res.status(404).send("Event doesn't exist");

    //check the user and update event.
    if (event.user.toString() !== req.user.id)
      return res.status(401).send("Only Owner can update/delete the Events.");
    event = await Events.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { new: true }
    );
    res.json({ success: true, message: "Event updated Successfully", event });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
};

const deleteEvent = async (req, res) => {
  try {
    //find the event to be deleted and delete it.
    let event = await Events.findById(req.params.id);
    // check if event exist or not.
    if (!event) return res.status(404).send("event doesn't exist");

    //check the user is owner or not and delete the event.
    if (event.user.toString() !== req.user.id)
      return res.status(401).send("Only Owner can update/delete the Events.");
    event = await Events.findByIdAndDelete(req.params.id);
    res.json({ Success: "Event has been deleted.", event });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
