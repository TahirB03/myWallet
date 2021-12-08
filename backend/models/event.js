const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true  },
    amount: { type: Number, required: true , required: true  },
    description: { type: String, maxLength: 100 }, // Ska nevoje qe nje description te jete required eshte opcionale
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
