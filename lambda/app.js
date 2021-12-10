const Event = require("./event");
const Category = require("./category");
const User = require("./user");
const connection = require("./db");
const ObjectId = require("mongodb").ObjectId;
const validator = require("email-validator");
const { phone } = require("phone");
const user = require("./user");

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
    if (!(validator.validate(body.email))) {
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
  if (body.phoneNumber!==undefined) {
    if (!(phone(body.phoneNumber).isValid)) {
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
const deleteUser = async (event)=>{
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
}
////////////////////////////////////////////////////////////////////// CATEGORY SECTION  ///////////////////////////////////////////////////
// Get all categorie
const getAllCategories = async ()=>{
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
        reason: error
      }),
    };
  }
}
//Get category from ID
const getCategoryFromId = async event =>{
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
        reason: error
      }),
    };
  }
}
//Delete Category
const deleteCategory = async event =>{
  const categoryId = event.pathParameters.id;
  try {
        await Category.findByIdAndDelete(categoryId)
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
}
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllCategories,
  getCategoryFromId,
  deleteCategory,
};
