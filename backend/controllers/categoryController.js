const Category = require("../models/category");
const ObjectId = require("mongodb").ObjectId;

const addCategory = async (req, res) => {
  const categoryName = new Category({
    categoryName: req.body.categoryName,
    isDeposit: req.body.isDeposit
  });
  try {
    await categoryName.save();
    res.status(201).json("Succes");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({});
    res.status(200).json(allCategories);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = { addCategory, getAllCategories };
