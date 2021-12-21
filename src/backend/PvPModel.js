let mongoose = require("mongoose");
let { Schema, model } = mongoose;

let pvpSchema = new Schema({
  player1: String,
  player2: String,
  player1Turns: Number,
  player2Turns: Number,
  code: Object,
  winner: String,
  ganeOver: Number,
});

let PvPModel = model("PvP", pvpSchema);

module.exports = PvPModel;
