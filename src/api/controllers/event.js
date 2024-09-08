const { deleteFile } = require("../../utils/deleteFile");
const Event = require("../models/event");


const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    return res.status(200).json(events);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    return res.status(200).json(event);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const eventDuplicated = await Event.findOne({ name: req.body.name });

    const userId = req.user._id.toString();
    console.log(userId);
    if (eventDuplicated) {
      return res.status(400).json("Event already created with the given name");
    }


    const newEvent = new Event(req.body, userId);
    if (req.file) {
      newEvent.img = req.file.path;
    }

    const event = await newEvent.save();
    return res.status(201).json(event);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();
    const eventData = await Event.findById(id);

    if (userId !== eventData.userId) {
      return res.status(403).json("You are not authorized to delete this event");
    }


    const event = await Event.findByIdAndDelete(id);

    deleteFile(event.img);

    return res.status(200).json({
      message: "Event deleted successfully",
      element: event,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { getEvents, getEventById, createEvent, deleteEvent };