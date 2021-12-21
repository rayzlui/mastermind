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
  if (matching.getQueueFrom(difficulty).length < 2) {
    return emitter.once(`match${user}`, (newPvpMatch) => {
      res.send(newPvpMatch);
    });
  } else {
    let players = matching.removeTwoFrom(difficulty);
    let [player1, player2] = players;
    let code = await generateCode(codeLength, maxDigits);
    let newPvpMatch = await new PvPModel({
      player1: { name: player1, moves: 0 },
      player2: { name: player2, moves: 0 },
      code,
      winner: "",
      gameover: false,
    });
    emitter.emit(`match${player1}`, newPvpMatch);
    newPvpMatch.save();
    res.send(newPvpMatch);
  }
});

app.get("/:gameid/:user", (req, res) => {
  let gameid = `${req.params.gameid}`;
  let userid = req.params.user;
  PvPModel.findById(gameid, function (err, game) {
    if (err) {
      console.log(`Could not access database for game id: ${gameid}`);
      res.send(err);
    }
    if (game === null) {
      console.log(`Could not find game id: ${gameid}`);
      res.sendStatus(404);
    } else {
      let { player1, player2 } = game;
      if (player1.userid === userid) {
        player1.moves++;
      } else {
        player2.moves++;
      }
      game.save();
      res.json(game);
    }
  });
});

app.listen(port, console.log("Server connected"));
