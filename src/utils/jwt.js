const jwt = require("jsonwebtoken");

const generateKey = (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: "1y" });
};

const verifyKey = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};



module.exports = { generateKey, verifyKey };