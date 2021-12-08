const express = require("express");
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getAllCategories); // localhost:8080/api/v1/category/
router.post("/addCategory", addCategory); //localhost:8080/api/v1/category/addCategory
router.delete("/deleteCategory", addCategory); //localhost:8080/api/v1/category/deleteCategory

module.exports = router;
