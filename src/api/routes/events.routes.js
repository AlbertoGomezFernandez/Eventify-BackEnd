const { isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getEvents, getEventById, createEvent, deleteEvent } = require("../controllers/event");

const eventsRouter = require("express").Router();
/* Testing routes in Vercel */
eventsRouter.get("/event", (req, res, next) => {
  return res.status(202).json("Testing event response in Vercel");
});
eventsRouter.get("/events", getEvents);

eventsRouter.get("/events/:id", getEventById);

eventsRouter.delete("/events/:id", isAuth, deleteEvent);



eventsRouter.post("/user/events", isAuth, upload.single("img"), createEvent);


module.exports = eventsRouter;