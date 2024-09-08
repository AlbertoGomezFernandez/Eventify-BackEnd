const { isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getEvents, getEventById, createEvent, deleteEvent } = require("../controllers/event");

const eventsRouter = require("express").Router();

eventsRouter.get("/events", getEvents);

eventsRouter.get("/events/:id", getEventById);

eventsRouter.delete("/events/:id", isAuth, deleteEvent);


eventsRouter.post("/user/events", isAuth, upload.single("img"), createEvent);


module.exports = eventsRouter;