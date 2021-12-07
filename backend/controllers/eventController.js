const Event = require("../models/event");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");

// get all bills

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).populate("user category", req.body.id).exec();
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// get bill by id
const getEventById = async (req, res) => {
  const paramID = req.params.id;

  if (ObjectId.isValid(req.params.id)) {
    try {
      const event = await Event.findById({ _id: paramID });
      res.status(200).json(event);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  } else {
    res.status(400).json({ message: "Id is not valid" });
  }
};

const addEvent = async (req, res) => {
  const newEvent = new Event({
    user: mongoose.Types.ObjectId(req.body.user),
    category: mongoose.Types.ObjectId(req.body.category),
    amount: req.body.amount,
    isDeposit: req.body.isDeposit,
    description: req.body.description,
  });
  try {
    await newEvent.save();
    res.status(201).json("Succes");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

//delete bill

const deleteEvent = async (req, res) => {
  const paramID = req.params.id;

  try {
    await Event.deleteOne({ _id: paramID });
    res.status(200).json("Event was succesfully removed");
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { getEvents, getEventById, addEvent, deleteEvent };
