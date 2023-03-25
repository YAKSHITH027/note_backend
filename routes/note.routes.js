const express = require("express");
const { NoteModel } = require("../Models/note.model");
const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ userId: req.body.userId });
    res.status(200).send(notes);
  } catch (error) {
    res.send("error");
  }
});

noteRouter.post("/add", async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).send({ msg: "note has been added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

noteRouter.patch("/update/:noteId", async (req, res) => {
  const payload = req.body;
  const noteId = req.params.noteId;
  try {
    await NoteModel.findByIdAndUpdate({ _id: noteId }, payload);
    res.status(200).send({ msg: "note has been updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

noteRouter.delete("/delete/:noteId", async (req, res) => {
  const noteId = req.params.noteId;
  const note = NoteModel.findOne({ _id: noteId });
  const userIdInNote = note.userId;
  try {
    if (req.body.userId == userIdInNote) {
      await NoteModel.findByIdAndDelete({ _id: noteId });
      res.status(200).send({ msg: "note has been deleted" });
    } else {
      res.status(400).send({ msg: "get the hell out of here" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { noteRouter };
