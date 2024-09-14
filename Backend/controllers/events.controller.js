const Notes = require("../models/Notes.js");
const { validationResult } = require("express-validator");

const getEvents = async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
};

const createEvent = async (req, res) => {
  const errors = validationResult(req); //if errors-> return bad request.
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, tag } = req.body;
    const note = new Notes({ title, description, tag, user: req.user.id });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
};

const updateEvent = async (req, res) => {
  const { title, description, tag } = req.body;
  //create the new dummy note.
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated and update it.
    let note = await Notes.findById(req.params.id);

    if (!note) return res.status(404).send("Note doesn't exist");

    //check the user and update note.
    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Only Owner can update/delete the notes.");
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
};

const deleteEvent = async (req, res) => {
  try {
    //find the note to be deleted and delete it.
    let note = await Notes.findById(req.params.id);
    // check if note exist or not.
    if (!note) return res.status(404).send("Note doesn't exist");

    //check the user is owner or not and delete the note.
    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Only Owner can update/delete the notes.");
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted.", note: note });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
