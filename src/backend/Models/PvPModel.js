let mongoose = require("mongoose");
let { Schema, model } = mongoose;

let pvpSchema = new Schema({
  players: {},
  code: Object,
  winner: String,
  ganeOver: Number,
});

let PvPModel = model("PvP", pvpSchema);

module.exports = PvPModel;
