const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: String,
    image: { type: String , default: ''},
    balance: {
      type: Number,
      default: 0
    },
    nrOfDeposits: { type: Number, min: 0, default: 0 },
    nrOfWithdraws: { type: Number, min: 0, default: 0 },
    biggestDeposit: { type: Number, min: 0, default: 0 },
    biggestWithdraw: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
