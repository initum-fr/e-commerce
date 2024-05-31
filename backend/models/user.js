const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userModel = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

userModel.plugin(uniqueValidator);

module.exports = mongoose.model("User", userModel);
