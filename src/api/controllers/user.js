const { get } = require("mongoose");
const { generateKey } = require("../../utils/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const register = async (req, res, next) => {
  try {
    const userDuplicated = await User.findOne({ email: req.body.email });
    if (userDuplicated) {
      return res.status(400).json("User already exists");
    }
    const newUser = new User(req.body);
    const user = await newUser.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const login = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json("User not found");
    }

    const validPassword = await bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Invalid password");
    }
    const token = generateKey(user._id);
    return res.status(200).json({ token, user });

  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { register, login, getUsers };