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
};
//Create USER
const createUser = async (event) => {
  const body = {
    _id : event.pathParameters.id
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
        user: user
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
  try {
    await User.deleteOne({_id:userId});
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
  try {
    const eventByUser = await Event.find({ user: userId }).populate("category").exec();
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
  if (!ObjectId.isValid(categoryId)) {
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
  if (!ObjectId.isValid(categoryId)){
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
  const userDetails = await User.findOne({_id:userId});
  const biggestValue = {
    biggestDeposit: userDetails.biggestDeposit,
    biggestWithdraw: userDetails.biggestWithdraw,
  };
  if (typeOfCategory.isDeposit===true){
    biggestValue.biggestDeposit = body.amount >= biggestValue.biggestDeposit ? body.amount : biggestValue.biggestDeposit
  }else{
        biggestValue.biggestWithdraw = body.amount>= biggestValue.biggestWithdraw ? body.amount : biggestValue.biggestWithdraw
  }
  try {
    session.startTransaction();
     await Event.create(
      [
        {
          user: userId,
          category: mongoose.Types.ObjectId(categoryId),
          amount: body.amount,
          description: body.description,
        },
      ],
      { session: session }
    );
    const newUpdatedUser = await User.findOneAndUpdate(
      {_id:userId},
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
const deleteEvent = async (event)=>{
  const eventId = event.pathParameters.id;
  if (!ObjectId.isValid(eventId)){
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Make sure the ID is correct",
      }),
    };
  }
  const eventDb = await Event.findById(eventId)
  const category = await Category.findById(eventDb.category)
  if (eventDb.event===null){
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: eventDb
      }),
    }
  }
  const session = await mongoose.startSession()
  try {
    if (category.isDeposit===true){
      session.startTransaction();
      await Event.findByIdAndDelete(eventId, { session: session });
      const userUpdated = await User.findOneAndUpdate(
        {_id:eventDb.user},
        {
          $inc: {
            balance: -1 * eventDb.amount,
            nrOfDeposits:  -1
          },
          $set: {biggestDeposit: 0},
        },
        { session: session, new: true }
      ).exec();
      await session.commitTransaction();
      return{
        statusCode: 200,
        headers: cors,
        body: JSON.stringify({
          userUpdated: userUpdated,
      }),
      }
    } else{
      session.startTransaction();
      await Event.findByIdAndDelete(eventId, { session: session });
      const userUpdated = await User.findByIdAndUpdate(
        eventDb.user,
        {
          $inc: {
            balance: eventDb.amount,
            nrOfWithdraws:  -1
          },
          $set: {biggestWithdraw: 0},
        },
        { session: session,new: true }
      ).exec();
      await session.commitTransaction();
      return{
        statusCode: 200,
        headers: cors,
        body: JSON.stringify({
          userUpdated: userUpdated,
      }),
      }
    }
  } catch (error) {
    session.abortTransaction();
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "No event was found",
      }),
    }
  }
}
const getEventByDate = async event =>{
  const userId = event.pathParameters.id;
  let body;
  let startingDate ;
  let endingDate;
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
  if ('startingDate' in body){
    startingDate = body.startingDate
  }else{
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Please provide a starting date",
      }),
    }
  }
  if ('endingDate' in body){
    endingDate = body.endingDate
  }else{
    endingDate= new Date()
  }
  try {
    const filteredEvents = await Event.find({
      user: userId,
      createdAt: {
        $gte: startingDate,
        $lte: endingDate
      }
    }).populate('category').exec()
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        events: filteredEvents,
      }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Something went wrong",
        reason: error
      }),
    }
  }
}

const getExpensesByUserMonth = async (event)=>{
  const userId = event.pathParameters.id;
  let body;
  let startingDate ;
  let endingDate;
  let filteredCategories=[
    {
      name:"Gift",
      amount:0,
      color: "#A569BD",
      image: "https://mywalletimages.s3.eu-central-1.amazonaws.com/images/gift.png"
    },
    {
      name:"Healthcare",
      amount:0,
      color: "#EC7063",
      image: "https://mywalletimages.s3.eu-central-1.amazonaws.com/images/health.png"
    },
    {
      name:"Entertainment",
      amount:0,
      color: "#EB984E",
      image: "https://mywalletimages.s3.eu-central-1.amazonaws.com/images/entertainment.png"
    }
    ,{
      name:"Transportation",
      amount:0,
      color: "#16A085",
      image: "https://mywalletimages.s3.eu-central-1.amazonaws.com/images/transport.png"
    },
    {
      name:"Other",
      amount:0,
      color: "#5D6D7E",
      image: "https://mywalletimages.s3.eu-central-1.amazonaws.com/images/Other+Deposits.png"
    },
    {
      name:"Clothing",
      amount:0,
      color: "#D35400",
      image: "https://mywalletimages.s3.eu-central-1.amazonaws.com/images/clothes.png"
    },{
      name:"Communication",
      amount:0,
      color: "#5499C7",
      image: "https://mywalletimages.s3.eu-central-1.amazonaws.com/images/communication.png"
    },
    {
      name:"Food",
      amount:0,
      color: "#F4D03F",
      image: "https://mywalletimages.s3.eu-central-1.amazonaws.com/images/food.png"
    },
    {
      name:"Sport",
      amount:0,
      color: "#5DADE2",
      image: "https://mywalletimages.s3.eu-central-1.amazonaws.com/images/sport.png"
    }
  ]
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
  if ('startingDate' in body){
    startingDate = body.startingDate
  }else{
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Please provide a starting date",
      }),
    }
  }
  if ('endingDate' in body){
    endingDate = body.endingDate
  }else{
    endingDate= new Date()
  }
  try {
    const filteredEvents = await Event.find({
      user: userId,
      createdAt: {
        $gte: startingDate,
        $lte: endingDate
      }
    }) .populate({
      path: "category",
      match: { isDeposit: false },
      select: "categoryName",
    }).exec()
    var i = filteredEvents.length;
    while (i--) {
      if (filteredEvents[i].category === null) {
        filteredEvents.splice(i, 1);
      }
    }
    filteredEvents.map(x=>{
      for(let i=0;i<filteredCategories.length;i++){
        if(x.category.categoryName === filteredCategories[i].name){
          filteredCategories[i].amount = filteredCategories[i].amount+ x.amount;
        }
      }
    })
    var i = filteredCategories.length;
    while (i--) {
      if (filteredCategories[i].amount === 0) {
        filteredCategories.splice(i, 1);
      }
    }
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        events: filteredCategories
      }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({
        message: "Something went wrong",
        reason: error
      }),
    }
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
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
  deleteEvent,
  getEventByDate,
  getExpensesByUserMonth
};
