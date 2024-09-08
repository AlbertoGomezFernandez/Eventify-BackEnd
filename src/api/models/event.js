const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: "events"
});


const Event = mongoose.model("events", eventSchema, "events");

module.exports = Event;