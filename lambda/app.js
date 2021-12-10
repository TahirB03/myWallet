const Event = require("./event");
const Category = require("./category");
const User = require("./user");
const connection = require("./db");
const ObjectId = require("mongodb").ObjectId;
const validator = require("email-validator");
const { phone } = require("phone");
const user = require("./user");
const mongoose = require('mongoose')

const cors = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
};

//Get all the users (This is only for dev)
const getAllUsers = async () => {
  try {
    const users = await User.find({});
    if (users) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({
          users: users,
        }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "No Users were found",
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "No categories were found",
      }),
    };
  }
};
//Get user by ID
const getUserById = async (event) => {
  const userId = event.pathParameters.id;
  if (!ObjectId.isValid(userId)) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Id is invalid!",
      }),
    };
  } else {
    try {
      const user = await User.findById({ _id: userId });
      if (user)
        return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
          body: JSON.stringify({
            user: user,
          }),
        };
      else {
        return {
          statusCode: 400,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
          body: JSON.stringify({
            message: "No user was found",
          }),
        };
      }
    } catch (error) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({
          message: "Something went wrong",
        }),
      };
    }
  }
};
//Create USER
const createUser = async (event) => {
  let body;
  if (event.body !== null && event.body !== undefined) {
    body = JSON.parse(event.body);
  }
  if (!/^[A-Za-z]+$/.test(body.name) || !/^[A-Za-z]+$/.test(body.surname)) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Name and Surname should not contain number and symbols",
      }),
    };
  }
  if (
    !("name" in body) &&
    !("surname" in body) &&
    !("age" in body) &&
    !("email" in body) &&
    !("phoneNumber" in body) &&
    !("balance" in body)
  ) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Please fill the form !",
      }),
    };
  }
  if (body.name.length < 3 || body.name.length > 20) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message:
          "Name should be longer than 3 characters and shorter than 20 characters",
      }),
    };
  }
  if (body.surname.length < 3 || body.surname.length > 20) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message:
          "Surname should be longer than 3 characters and shorter than 20 characters",
      }),
    };
  }
  if (body.age < 16) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "You need to be older than 16 years old to use this app",
      }),
    };
  }
  if (!validator.validate(body.email)) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Check your email!",
      }),
    };
  }
  if (!phone(body.phoneNumber).isValid) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Check your phone number!",
      }),
    };
  }
  if (body.balance < 0) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Balance needs to be greater than 0",
      }),
    };
  }
  try {
    const user = await User.create(body);
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        user: user,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Something went wrong",
        reason: error,
      }),
    };
  }
};
//Update a user
const updateUser = async (event) => {
  const userId = event.pathParameters.id;
  let body;
  if (event.body !== null && event.body !== undefined) {
    body = JSON.parse(event.body);
  }
  if (body.email !== undefined) {
    if (!validator.validate(body.email)) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({
          message: "Check your email!",
        }),
      };
    }
  }
  if (body.phoneNumber !== undefined) {
    if (!phone(body.phoneNumber).isValid) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({
          message: "Check your phone number!",
        }),
      };
    }
  }
  if (!ObjectId.isValid(userId)) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Make sure the ID is correct",
      }),
    };
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        email: body.email,
        phoneNumber: body.phoneNumber,
      },
      { new: true }
    );
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "User updated succsefully",
        user: updatedUser,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Something went wrong",
        reason: error,
      }),
    };
  }
};
//Delete a user
const deleteUser = async (event) => {
  const userId = event.pathParameters.id;
  if (!ObjectId.isValid(userId)) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Make sure the ID is correct",
      }),
    };
  }
  try {
    await User.findByIdAndDelete(userId);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "User succesfully deleted",
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Something went wrong",
        reason: error,
      }),
    };
  }
};
////////////////////////////////////////////////////////////////////// CATEGORY SECTION  ///////////////////////////////////////////////////
// Get all categorie
const getAllCategories = async () => {
  try {
    const allCategories = await Category.find();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        allCategories: allCategories,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Something went wrong",
        reason: error,
      }),
    };
  }
};
//Get category from ID
const getCategoryFromId = async (event) => {
  const categoryId = event.pathParameters.id;
  if (!ObjectId.isValid(categoryId)) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Make sure the ID is correct",
      }),
    };
  }
  try {
    const category = await Category.findById(categoryId);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        category: category,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "something went wrong",
        reason: error,
      }),
    };
  }
};
//Delete Category
const deleteCategory = async (event) => {
  const categoryId = event.pathParameters.id;
  try {
    await Category.findByIdAndDelete(categoryId);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Category succesfully deleted",
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Something went wrong",
        reason: error,
      }),
    };
  }
};
///////////////////////////////////////////////////////////////////// EVENT SECTION     //////////////////////////////////////
const getAllEvents = async (even) => {
  try {
    const allEvents = await Event.find();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        allEvents: allEvents,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        message: "Category succesfully deleted",
      }),
    };
  }
};
//Get event by ID
const getEventById = async (event) => {
  const eventId = event.pathParameters.id;
  if (!ObjectId.isValid(eventId)) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Make sure the ID is correct",
      }),
    };
  }
  try {
    const event = await Event.findById(eventId);
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        event: event,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Something bad happened",
        reason: error,
      }),
    };
  }
};
//Get event by user
const getEventbyUser = async (event) => {
  const userId = event.pathParameters.id;
  if (!ObjectId.isValid(userId)) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Make sure the ID is correct",
      }),
    };
  }
  try {
    const eventByUser = await Event.find({ user: userId });
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        events: eventByUser,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Something happened",
        reason: error,
      }),
    };
  }
};
const getEventsByUserCategory = async (event) => {
  const userId = event.pathParameters.id;
  const categoryId = event.pathParameters.categoryId;
  if (!ObjectId.isValid(userId) || !ObjectId.isValid(categoryId)) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Make sure the ID is correct",
      }),
    };
  }
  try {
    const eventsByCategory = await Event.find({
      user: userId,
      category: categoryId,
    })
      .populate("category")
      .exec();
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        events: eventsByCategory,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Something happened",
        reason: error,
      }),
    };
  }
};
const getAllDeposit = async (event) => {
  const userId = event.pathParameters.id;
  if (!ObjectId.isValid(userId)) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Make sure the ID is correct",
      }),
    };
  }
  try {
    let response = await Event.find({
      user: userId,
    })
      .populate({
        path: "category",
        match: { isDeposit: true },
        select: "categoryName",
      })
      .exec();
    var i = response.length;
    while (i--) {
      if (response[i].category == null) {
        response.splice(i, 1);
      }
    }
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        events: response,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Something happened",
        reason: error,
      }),
    };
  }
};
const getAllWithdraws = async (event) => {
  const userId = event.pathParameters.id;
  if (!ObjectId.isValid(userId)) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Make sure the ID is correct",
      }),
    };
  }
  try {
    let response = await Event.find({
      user: userId,
    })
      .populate({
        path: "category",
        match: { isDeposit: false },
        select: "categoryName",
      })
      .exec();
    var i = response.length;
    while (i--) {
      if (response[i].category == null) {
        response.splice(i, 1);
      }
    }
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        events: response,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Something happened",
        reason: error,
      }),
    };
  }
};
const createEvent = async event=>{
  let body ;
  const userId = event.pathParameters.userId
  const categoryId = event.pathParameters.categoryId
  if (event.body !== null && event.body !== undefined) {
    body = JSON.parse(event.body);
  }else{
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Provide a body for the request",
      }),
    };
  }
  if (!ObjectId.isValid(userId) || !ObjectId.isValid(categoryId)){
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Make sure the ID-s are correct",
      }),
    };
  }
  if (body.amount<=0){
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Make sure amount is greater than 0",
      }),
    };
  }
  if ((await User.exists({_id : userId})) === false){
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "User doesnt exist",
      }),
    };
  }
  if ((await Category.exists({_id : categoryId})) === false){
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "User doesnt exist",
      }),
    };
  }
  const session = await mongoose.startSession();
  const typeOfCategory = await Category.findById(categoryId)
  const userDetails = await User.findById(userId);
  const biggestValue = {
    biggestDeposit: userDetails.biggestDeposit,
    biggestWithdraw: userDetails.biggestWithdraw,
  };
  if (typeOfCategory.isDeposit===true){
    biggestValue.biggestDeposit = body.amount >= biggestValue.biggestDeposit ? body.amount : biggestValue.biggestDeposit
  }else{
        biggestValue.biggestWithdraw = body.amount>= biggestValue.biggestWithdraw ? body.amount : biggestValue.biggestWithdraw
  }
  if (typeOfCategory.isDeposit === false){
    if (body.amount>userDetails.balance){
      return{
        statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "You dont have that amount of money deposited.",
      }),
      }
    }
  }
  try {
    session.startTransaction();
     await Event.create(
      [
        {
          user: mongoose.Types.ObjectId(userId),
          category: mongoose.Types.ObjectId(categoryId),
          amount: body.amount,
          description: body.description,
        },
      ],
      { session: session }
    );
    const newUpdatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: biggestValue,
        $inc: {
          "balance":
            typeOfCategory.isDeposit === true
              ? body.amount
              : -1 * body.amount,
          "nrOfDeposits": typeOfCategory.isDeposit === true ? 1 : 0,
          "nrOfWithdraws": typeOfCategory.isDeposit === false ? 1 : 0,
        },
      },
      { session: session , new: true}
    ).exec();
    await session.commitTransaction();
    return{
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        user: newUpdatedUser
      }),
    }
  } catch (error) {
    session.abortTransaction();
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Cannot proccede",
        reason: error
      }),
    };
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllCategories,
  getCategoryFromId,
  deleteCategory,
  getAllEvents,
  getEventById,
  getEventbyUser,
  getEventsByUserCategory,
  getAllDeposit,
  getAllWithdraws,
  createEvent,
};
