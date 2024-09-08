const express = require('express');
const { connectDB } = require('./src/config/db');
const usersRouter = require('./src/api/routes/user.routes');
const eventsRouter = require('./src/api/routes/event.routes');
const attendeesRouter = require('./src/api/routes/attendee.routes');
require("dotenv").config();
const cors = require('cors');
const { connectCloudinary } = require('./src/config/cloudinary');

const app = express();
const port = 3000;



connectDB();
connectCloudinary();

app.use(express.json());

app.use(cors({
  origin: "https://eventify-sigma-seven.vercel.app/#"
}));

app.use("/api", usersRouter);
app.use("/api", eventsRouter);
app.use("/api", attendeesRouter);



app.use("*", (req, res, next) => {
  return res.status(404).json("Route not found");
});


app.listen(port, () => console.log(`http://localhost:${port}`));