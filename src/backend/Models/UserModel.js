let mongoose = require("mongoose");
let { Schema, model } = mongoose;

let userSchema = new Schema({
  name: String,
  passwordHash: String,
  coolstring: Number,
  gameHistory: Array,
  dateJoined: Date,
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
