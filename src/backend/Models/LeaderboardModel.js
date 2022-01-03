let mongoose = require("mongoose");
let { Schema, model } = mongoose;

let leaderboardSchema = new Schema({
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  userid: { type: String, required: true },
  time: { type: Number, required: true },
  code: { type: {}, required: true },
});

let LeaderboardModel = model("Leaderboard", leaderboardSchema);

module.exports = LeaderboardModel;
