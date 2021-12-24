let mongoose = require("mongoose");
let { Schema, model } = mongoose;

let leaderboardSchema = new Schema({
  name: String,
  difficulty: String,
  userid: String,
  time: Number,
  code: {},
});

let LeaderboardModel = model("Leaderboard", leaderboardSchema);

module.exports = LeaderboardModel;
