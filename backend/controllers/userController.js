const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;
var validator = require("email-validator");
const { phone } = require("phone");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getUserById = async (req, res) => {
  const paramID = req.params.id;

  if (ObjectId.isValid(req.params.id)) {
    try {
      const user = await User.findById({ _id: paramID });
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  } else {
    res.status(400).json({ message: "Id is not valid" });
  }
};

//create new user

const postUser = async (req, res) => {
  const data = req.body;
  if (
    !req?.body?.name ||
    !req?.body?.surname ||
    !req?.body?.age ||
    !req?.body?.email ||
    !req?.body?.phoneNumber ||
    !req?.body?.balance
  ) {
    return res
      .status(400)
      .json({ message: "You need to fill the requried information" });
  }
  if (data.name?.length < 3 || data.name?.length > 20)
    res
      .status(400)
      .json("Name should be longer than 3 characters and shorter than 20");
  else if (data.surname?.length < 3 || data.name?.length > 20)
    res
      .status(400)
      .json("Surname should be longer than 3 characters and shorter than 20");

  !validator.validate(data.email) &&
    res.status(400).json("Bad email was given");
  !phone(data.phoneNumber).isValid &&
    res.status(400).json("Bad phone number was given");
  data.balance < 0 && res.status(400).json("You need more money than 0");

  const newUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    balance: req.body.balance,
  });
  try {
    await newUser.save();
    res.status(201).json("User added succesfully");
  } catch (error) {
    res.status(401).json({
      message: error,
    });
  }
};

const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Id is not valid");
  } else {
    try {
      const updateUserData = await User.findByIdAndUpdate(
        req.params.id,
        {
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
        },
        { new: true }
      );
      if (req.body.email && !validator.validate(updateUserData.email))
        res.status(400).json("Bad email was given");
      else if (
        req.body.phoneNumber &&
        !phone(updateUserData.phoneNumber).isValid
      )
        res.status(400).json("Bad phone number was given");
      else res.status(200).json(updateUserData);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
};

//delete user

const deleteUser = async (req, res) => {
  const paramID = req.params.id;
  try {
    const removeUser = await User.deleteOne({ _id: paramID });
    res.status(200).json(removeUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { postUser, getUsers, getUserById, updateUser, deleteUser };
