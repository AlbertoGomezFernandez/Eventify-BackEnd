const User = require("../api/models/user");
const { verifyKey } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");
    const { id } = verifyKey(parsedToken);
    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next();

  } catch (error) {
    return res.status(404).json("You are not authorized");
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");
    const { role } = verifyKey(parsedToken);
    const user = await User.findById(role);

    user.password = null;
    req.user = user;
    next();

  } catch (error) {
    return res.status(404).json("You are not authorized");
  }
};

module.exports = { isAuth, isAdmin };