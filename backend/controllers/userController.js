const User = require("../api/models/user");
const ObjectId = require("mongodb").ObjectId;

// get all users

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// get user by id

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
  req.body.name?.length<3 && res.status(400).json("Name should be longer than 3 characters")
  req.body.name?.length>20 && res.status(400).json("Name should be shorter than 20 characters")
  req.body.surname?.length<3 && res.status(400).json("Name should be longer than 3 characters")
  req.body.surname?.length>20 && res.status(400).json("Name should be shorter than 20 characters")
  // if (req.body.name.length>=20 || req.body.length<=3) res.status(400).json("Name should be longer than 3 and shorter than 20")
  console.log("passed");
  // console.log(req.body);
  // const newUser = new User({
  //   name: req.body.name,
  //   surname: req.body.surname,
  //   age: req.body.age,
  //   email: req.body.email,
  //   phoneNumber: req.body.phoneNumber,
  //   balance: req.body.balance,
  // });
  // try {
  //   await newUser.save();
  //   res.status(200).json(newUser);
  // } catch (error) {
  //   res.status(401).json({
  //     message: error,
  //   });
  // }
};

//update user

const updateUser = async (req, res) => {
  // const paramID = req.params.id;
  // const name = req.body.name;
  // const surname = req.body.surname;
  // const age = req.body.age;
  // const email = req.body.email;
  // const phoneNumber = req.body.phoneNumber;
  // const balance = req.body.balance;
  //console.log(req.body);
  //res.send("hey");
  // try {
  //   const updateUserData = await User.findById(
  //     { _id: paramID },
  //     { name: name },
  //     { surname: surname },
  //     { age: age },
  //     { email: email },
  //     { phoneNumber: phoneNumber },
  //     { balance: balance }
  //   );
  //   res.status(200).json(updateUserData);
  // } catch (err) {
  //   res.status(400).json({ message: err });
  // }
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Id is not valid");
  } else {
    try {
      const updateUserData = await User.findByIdAndUpdate(
        req.params.id,
        {
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          balance: req.body.balance,
        },
        { new: true }
      );
      res.status(200).json(updateUserData);
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
