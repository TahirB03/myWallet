const express = require("express");
const router = express.Router();
const {
  getEvents,
  addEvent,
  deleteEvent,
  getEventById,
  getEventByUser,
  getEventByUserCategory,
  getAllEventsDeposit,
  getAllEventsWithdraw
} = require("../controllers/eventController");

router.get("/", getEvents); //localhost:8080/api/v1/event
router.get("/:id", getEventById); // localhost:8080/api/v1/event/:id
router.get("/getEventByUser/:id", getEventByUser) // localhost:8080/api/v1/event/getEventByUser/:id
router.get('/getEventByUserCategory/:userId/:categoryId', getEventByUserCategory) // localhost:8080/api/v1/event/getEventByUserCategory
router.get('/getAllEventsDeposit/:userId', getAllEventsDeposit) // localhost:8080/api/v1/event/getAllEventsDeposit
router.get('/getAllEventsWithdraw/:userId', getAllEventsWithdraw) // localhost:8080/api/v1/event/getAllEventsWithdraw
router.post("/add", addEvent); // localhost:8080/api/v1/event/add
router.delete("/delete/:id", deleteEvent); // localhost:8080/api/v1/event/delete/:id


module.exports = router;