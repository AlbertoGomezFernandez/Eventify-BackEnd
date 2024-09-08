const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
    match: /^[a-zA-Z ]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    enum: ['admin', 'user'],
    default: 'user'
  }
}, {
  timestamps: true,
  collection: 'users',
});

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});


const User = mongoose.model("users", userSchema, "users");

module.exports = User;