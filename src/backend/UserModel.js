let mongoose =require("mongoose");
let { Schema, model } = mongoose;

let userSchema = new Schema({
  name: String,
  password: String,
  gameHistory: Array,
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
