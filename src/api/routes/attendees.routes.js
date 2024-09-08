const { isAuth } = require("../../middlewares/auth");
const { getAttendeeById, getAttendees } = require("../controllers/attendee");

const attendeesRouter = require("express").Router();



attendeesRouter.get("/attendees/:eventId", isAuth, getAttendees);


attendeesRouter.get("/attendees/:id", isAuth, getAttendeeById);


module.exports = attendeesRouter;