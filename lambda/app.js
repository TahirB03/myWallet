const Event = require("./event");
const Category = require("./category");
const User = require("./user");
const connection = require("./db");
const ObjectId = require("mongodb").ObjectId;
const validator = require('email-validator')
const {phone} = require('phone')

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
  if (!/^[A-Za-z]+$/.test(body.name) || !/^[A-Za-z]+$/.test(body.surname)){
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
  if (!("name" in body) && !("surname" in body) && !("age" in body) && !("email" in body) && !("phoneNumber" in body) && !("balance" in body)){
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
  if (body.name.length < 3 || body.name.length > 20){
    return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({
          message: "Name should be longer than 3 characters and shorter than 20 characters",
        }),
      };
  }
  if (body.surname.length < 3 || body.surname.length > 20){
    return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({
          message: "Surname should be longer than 3 characters and shorter than 20 characters",
        }),
      };
  }
  if (body.age < 16){
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
  if (!validator.validate(body.email)){
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
  if (!phone(body.phoneNumber).isValid){
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
  if (body.balance < 0){
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
          reason: error
        }),
      };
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
