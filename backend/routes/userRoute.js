const express = require("express");
const router = express.Router();
const {
  postUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/", getUsers); //localhost:8080/api/v1/users
router.get("/:id", getUserById); //localhost:8080/api/v1/user/:id
router.post("/add", postUser); //localhost:8080/api/v1/user/add
router.patch("/update/:id", updateUser); //localhost:8080/api/v1/user/update/:id
router.delete("/delete/:id", deleteUser); //localhost:8080/api/v1/user/delete/:id
module.exports = router;
