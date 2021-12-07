require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());

const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const eventRoute = require("./routes/eventRoute");

app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/event", eventRoute);

const connectDB = require("./config/dbConnection");
connectDB();

const PORT = process.env.PORT || 3000;
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
});
