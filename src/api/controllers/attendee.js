const Attendee = require("../models/attendee");

const getAttendees = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const attendees = await Attendee.find({ eventId: eventId });
    return res.status(200).json(attendees);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getAttendeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendees = await Attendee.findById(id);
    return res.status(200).json(attendees);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};


const confirmAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendeeDuplicated = await Attendee.findOne({ email: req.user.email, eventId: id });

    if (attendeeDuplicated) {
      return res.status(400).json({
        error: "DUPLICATE_ATTENDANCE",
        message: "Attendance already confirmed for this user",
      });
    }

    const { name, email } = req.user;



    const newAttendee = new Attendee({ name, email, eventId: id });
    const attendee = await newAttendee.save();
    return res.status(201).json(attendee);
  } catch (error) {
    return res.status(500).json({
      error: "SERVER_ERROR",
      message: "An error occurred while confirming attendance. Please try again later.",
      details: error.message,  // En desarrollo, puedes enviar detalles del error.
    });
  }

};

module.exports = { getAttendees, getAttendeeById, confirmAttendance };