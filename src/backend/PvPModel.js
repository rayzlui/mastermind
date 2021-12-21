let mongoose = require("mongoose");
let { Schema, model } = mongoose;

let pvpSchema = new Schema({
  player1: { name: String, userid: String, moves: Number },
  player2: { name: String, userid: String, moves: Number },
  code: Object,
  winner: String,
  ganeOver: Number,
});

let PvPModel = model("PvP", pvpSchema);

module.exports = PvPModel;
