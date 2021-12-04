const express = require("express");
const router = express.Router();
const {
  postUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/users", getUsers); //localhost:8080/api/v1/users
router.get("/user/:id", getUserById); //localhost:8080/api/v1/user/:id
router.post("/user/add", postUser); //localhost:8080/api/v1/user/add
router.patch("/user/update/:id", updateUser); //localhost:8080/api/v1/user/update/:id
router.delete("/user/delete/:id", deleteUser); //localhost:8080/api/v1/user/delete/:id
module.exports = router;
