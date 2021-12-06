const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
} = require("../controllers/categoryController");

router.get("/", getAllCategories); // localhost:8080/api/v1/category/
router.post("/addCategory", addCategory); //localhost:8080/api/v1/category/addCategory

module.exports = router;
