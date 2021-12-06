const express = require("express");
const router = express.Router();
const {
  getEvents,
  addEvent,
  deleteEvent,
  getEventById,
} = require("../controllers/eventController");

router.get("/", getEvents); //localhost:8080/api/v1/event
router.get("/:id", getEventById); //localhost:8080/api/v1/event/:id
router.post("/add", addEvent); //localhost:8080/api/v1/event/add
router.delete("/delete/:id", deleteEvent); //localhost:8080/api/v1/event/delete/:id
module.exports = router;
