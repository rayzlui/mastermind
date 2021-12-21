let express = require("express");
let mongoose = require("mongoose");
let UserModel = require("./UserModel.js");
let PvPModel = require("./PvPModel");
let EventEmitter = require("events");
let generateCode = require("./generateCodeFromBackend.js");

let app = express();
let port = 3001;
let mongoDB = "mongodb://127.0.0.1:27017/mastermind";

mongoose.connect(mongoDB, { useNewUrlParser: true }, function (err) {
  if (err) return console.log(err);
  console.log("Database connection successful");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/user/:name", (req, res) => {
  let name = req.params.name;
  UserModel.find({ name }, (err, data) => {
    if (err) {
      console.log(`Error searching database for User Model params: ${name}`);
      res.send(err);
    } else {
      if (data.length < 1) {
        console.log(`Unable to find user ${name}`);
        res.status(404);
        res.send();
      } else {
        console.log(`Found user: ${data}`);
        res.json(data);
      }
    }
  });
});

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
      winner: "",
      gameover: false,
    });
    emitter.emit("haveTwo", newPvpMatch);
    console.log(matching);
    res.send(newPvpMatch);
  }
});

app.listen(port, console.log("Server connected"));
