const Category = require("../models/category");
const ObjectId = require("mongodb").ObjectId;

exports.addCategory = async (req, res) => {
  const categoryName = new Category({
    categoryName: req.body.categoryName,
  });
  try {
    await categoryName.save();
    res.status(201).json("Succes");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({});
    res.status(200).json(allCategories);
  } catch (error) {
      console.log(error);
    res.status(400).json(error);
  }
};
