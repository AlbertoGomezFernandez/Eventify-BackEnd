const mongoose = require("mongoose");

const attendeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  eventId: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  collection: "attendees"
});


const Attendee = mongoose.model("attendees", attendeeSchema, "attendees");

module.exports = Attendee;