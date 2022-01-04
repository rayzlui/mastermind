let mongoose = require("mongoose");
let { Schema, model } = mongoose;

let pvpSchema = new Schema({
  players: { type: {}, required: true },
  code: { type: {}, required: true },
  numCompletedGames: { type: Number, required: true },
  numOfPlayers: { type: Number, required: true },
});

let PvPModel = model("PvP", pvpSchema);

module.exports = PvPModel;
