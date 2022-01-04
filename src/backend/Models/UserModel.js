let mongoose = require("mongoose");
let { Schema, model } = mongoose;

let userSchema = new Schema({
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  coolstring: { type: Number, required: true },
  gameHistory: { type: Array, required: true },
  dateJoined: { type: Date, required: true },
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
