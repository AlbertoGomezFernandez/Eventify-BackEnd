const express = require('express');
const { connectDB } = require('./src/config/db');
const usersRouter = require('./src/api/routes/user.routes');
const eventsRouter = require('./src/api/routes/events.routes');
const attendeesRouter = require('./src/api/routes/attendees.routes');
require("dotenv").config();
const cors = require('cors');
const { connectCloudinary } = require('./src/config/cloudinary');

const app = express();
const port = 3000;



connectDB();
connectCloudinary();

app.use(express.json());

const allowedOrigins = [
  'https://eventify-bqjoqekvi-alberto-gomez-fernandezs-projects.vercel.app',
  'https://eventify-sigma-seven.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy error: Origin not allowed'), false);
    }
    return callback(null, true);
  }
}));

app.use("/api", usersRouter);
app.use("/api", eventsRouter);
app.use("/api", attendeesRouter);



app.use("*", (req, res, next) => {
  return res.status(404).json("Route not found 2");
});


app.listen(port, () => console.log(`http://localhost:${port}`));