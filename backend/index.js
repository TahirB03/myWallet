require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());

const userRoute = require("./routes/userRoute");
app.use("/api/v1", userRoute);

const connectDB = require("./config/dbConnection");
connectDB();

const PORT = process.env.PORT || 3000;
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
});
