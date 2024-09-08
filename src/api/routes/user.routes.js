const { isAuth } = require("../../middlewares/auth");
const { confirmAttendance } = require("../controllers/attendee");
const { register, login, getUsers } = require("../controllers/user");

const usersRouter = require("express").Router();


usersRouter.get("/users", isAuth, getUsers);

usersRouter.post("/auth/register", register);

usersRouter.post("/auth/login", login);

usersRouter.post("/user/attendees/:id", isAuth, confirmAttendance);

// /api/user/attendees/:eventId: Permite a los usuarios confirmar asistencia a un evento.

module.exports = usersRouter;