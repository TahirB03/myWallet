const Event = require("../models/event");
const User = require("../models/user");
const Category = require("../models/category");
const ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");

// get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({})
      .populate("user category", req.body.id)
      .exec();
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// get event by id
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

// Crate an event
const addEvent = async (req, res) => {
  if (!req?.body?.amount) {
    return res.status(400).json({ message: "You need to give an amount" });
  }

  if (
    ObjectId.isValid(req.body.user) === false ||
    ObjectId.isValid(req.body.category) === false
  ) {
    res.status(400).json("Id was invalid");
    return;
  }
  if ((await User.exists({ _id: req.body.user })) === false) {
    res.status(400).json("User is not found in database");
    return;
  }
  if ((await Category.exists({ _id: req.body.category })) === false) {
    res.status(400).json("Category is not found in database");
    return;
  }
  if (req.body.amount <= 0) {
    res.status(400).json("Amount must be greater than 0");
    return;
  }
  //E fillojme sessionin e mongoosit
  const session = await mongoose.startSession();
  const typeOfCategory = await Category.findById(req.body.category)
  const userDetails = await User.findById(req.body.user)
  const biggestValue = {biggestDeposit: userDetails.biggestDeposit,biggestWithdraw:userDetails.biggestWithdraw}
  if (typeOfCategory.isDeposit===true){
    biggestValue.biggestDeposit = req.body.amount>=biggestValue.biggestDeposit ? req.body.amount : biggestValue.biggestDeposit;
  }else{
    biggestValue.biggestWithdraw = req.body.amount>=biggestValue.biggestWithdraw ? req.body.amount : biggestValue.biggestWithdraw;

  }
  if (typeOfCategory.isDeposit===false){
  if (req.body.amount>userDetails.balance){
    res.status(400).json("Amount is greater than you balance, please check you balance")
    return;
  }}
  try {
    session.startTransaction();
     await User.findByIdAndUpdate(
      req.body.user,
        { 
          $set:biggestValue,
          $inc: { 
            "balance": typeOfCategory.isDeposit===true ? req.body.amount : -1*req.body.amount,
            "nrOfDeposits": typeOfCategory.isDeposit===true ? 1 : 0,
            "nrOfWithdraws": typeOfCategory.isDeposit===false ? 1 : 0,
          },
        },
      { session: session }
    ).exec();
    await Event.create(
      [
        {
          user: mongoose.Types.ObjectId(req.body.user),
          category: mongoose.Types.ObjectId(req.body.category),
          amount: req.body.amount,
          isDeposit: req.body.isDeposit,
          description: req.body.description,
        },
      ],
      { session: session }
    );
    await session.commitTransaction();
    res.status(201).json("Succes");
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    res.status(400).json({ message: error });
    console.log(error);
  }
  session.endSession(); 
};

//delete event
const deleteEvent = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    try {
      await Event.deleteOne({ _id: paramID });
      res.status(200).json("Event was succesfully removed");
    } catch (err) {
      res.status(400).json({ message: err });
    }
  } else {
    res.status(400).json("Id was invalid");
  }
};

const getEventByUser = async (req, res) => {
  //E kontrollon ne fillim nqs id eshte valide
  if (ObjectId.isValid(req.params.id) === false) {
    res.status(400).json("Id was invalid");
    return;
  }
  //E kontrollon nqs useri ekzison ne databaz
  if ((await User.exists({ _id: req.params.id })) === false) {
    res.status(200).json("User is not found in database");
    return;
  }
  try {
    // Marrim reponse nga databza
    const response = await Event.find({ user: req.params.id })
      .populate("category", "categoryName")
      .exec();
    if (response[0] === undefined) {
      // Nqs eshte liste boshe atehere japim response qe ska event
      res.status(404).json("No events were found");
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json("Bad request");
  }
};

const getEventByUserCategory = async (req, res) => {
  if (
    ObjectId.isValid(req.params.userId) === false ||
    ObjectId.isValid(req.params.categoryId) === false
  ) {
    res.status(400).json("Id was invalid");
    return;
  }
  if ((await User.exists({ _id: req.params.userId })) === false) {
    res.status(400).json("User is not found in database");
    return;
  }
  if ((await Category.exists({ _id: req.params.categoryId })) === false) {
    res.status(400).json("Category is not found in database");
    return;
  }
  try {
    const response = await Event.find({
      user: req.params.userId,
      category: req.params.categoryId,
    })
      .populate({
        path: "category",
        select: "categoryName",
      })
      .exec();
    if (response[0] === undefined) {
      // Nqs eshte liste boshe atehere japim response qe ska event
      res.status(404).json("No events were found");
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json("Bad request");
  }
};

const getAllEventsDeposit = async (req, res) => {
  if (ObjectId.isValid(req.params.userId) === false) {
    res.status(400).json("Id was invalid");
    return;
  }
  //E kontrollon nqs useri ekzison ne databaz
  if ((await User.exists({ _id: req.params.userId })) === false) {
    res.status(200).json("User is not found in database");
    return;
  }
  try {
    const response = await Event.find({
      user: req.params.userId,
    })
      .populate({
        path: "category",
        match: { isDeposit: true },
        select: "categoryName",
      })
      .exec();
    if (response[0] === undefined) {
      // Nqs eshte liste boshe atehere japim response qe ska event
      res.status(404).json("No events were found");
      return;
    }
    var i = response.length;
    while (i--) {
      if (response[i].category == null) {
        response.splice(i, 1);
      }
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json("Bad request");
  }
};

const getAllEventsWithdraw = async (req, res) => {
  if (ObjectId.isValid(req.params.userId) === false) {
    res.status(400).json("Id was invalid");
    return;
  }
  //E kontrollon nqs useri ekzison ne databaz
  if ((await User.exists({ _id: req.params.userId })) === false) {
    res.status(200).json("User is not found in database");
    return;
  }
  try {
    const response = await Event.find({
      user: req.params.userId,
    })
      .populate({
        path: "category",
        match: { isDeposit: false },
        select: "isDeposit",
      })
      .exec();
    if (response[0] === undefined) {
      // Nqs eshte liste boshe atehere japim response qe ska event
      res.status(404).json("No events were found");
      return;
    }
    var i = response.length;
    while (i--) {
      if (response[i].category == null) {
        response.splice(i, 1);
      }
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json("Bad request");
  }
};

module.exports = {
  getEvents,
  getEventById,
  addEvent,
  deleteEvent,
  getEventByUser,
  getEventByUserCategory,
  getAllEventsDeposit,
  getAllEventsWithdraw,
};
