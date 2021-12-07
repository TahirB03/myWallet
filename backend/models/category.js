const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      unique: true,
      required: true,
    },
  }
);

module.exports = mongoose.model("Category", categorySchema);
