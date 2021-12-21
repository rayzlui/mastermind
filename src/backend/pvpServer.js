let PvPModel = require("./PvPModel");
let EventEmitter = require("events");
let generateCode = require("./generateCodeFromBackend.js");

function MatchMaking() {
  this.easy = [];
  this.normal = [];
  this.hard = [];
}
MatchMaking.prototype.addToThisQueue = function (diff, id) {
  this[diff] = [...this[diff], id];
};
MatchMaking.prototype.getQueueFrom = function (diff) {
  return this[diff];
};

MatchMaking.prototype.removeTwoFrom = function (diff) {
  return this[diff].splice(0, 2);
};
let emitter = new EventEmitter();
let matching = new MatchMaking();
let values = {};
values["easy"] = [4, 4];
values["normal"] = [4, 7];
values["hard"] = [9, 9];
app.get("/game/pvp/:difficulty/:user", async (req, res) => {
  let user = req.params.user;
  let difficulty = req.params.difficulty;
  let [codeLength, maxDigits] = values[difficulty];
  matching.addToThisQueue(difficulty, user);
  console.log(user, matching);
  if (matching.getQueueFrom(difficulty).length < 2) {
    return emitter.once("haveTwo", (newPvpMatch) => {
      res.send(newPvpMatch);
    });
  } else {
    let players = matching.removeTwoFrom(difficulty);
    let [player1, player2] = players;
    let code = await generateCode(codeLength, maxDigits);
    let newPvpMatch = await new PvPModel({
      player1,
      player2,
      code,
      player1Move: 0,
      player2Move: 0,
    });
    emitter.emit("haveTwo", newPvpMatch);
    console.log(matching)
    res.send(`${newPvpMatch}`);
  }
});
