const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      enum: [
        "Wage",
        "Tips/Lottary",
        "Monthly Bills",
        "Healthcare",
        "Fun",
        "Transportation",
        "Maintenance",
        "Gift",
        "Apparel",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
