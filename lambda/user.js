const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    //_id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, minLength: 3, maxLength: 20 },
    surname: { type: String, required: true, minLength: 3, maxLength: 20 },
    // userName: {type: String, required: true, unique: true, minLength: 3, maxLength: 20},
    age: {
      type: Number,
      required: true,
      min: 16,
      max: 120,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    image: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: { type: String, required: true, unique: true },
    balance: {
      type: Number,
      min: [0, "You need to have more money than 0"],
      required: true,
    },
    nrOfDeposits: { type: Number, min: 0, default: 0 },
    nrOfWithdraws: { type: Number, min: 0, default: 0 },
    biggestDeposit: { type: Number, min: 0, default: 0 },
    biggestWithdraw: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
