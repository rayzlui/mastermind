let express = require("express");
let mongoose = require("mongoose");
let UserModel = require("./Models/UserModel.js");
let PvPModel = require("./Models/PvPModel");
let EventEmitter = require("events");
let bodyParser = require("body-parser");
let scramblePassword = require("./scramblePass");
let generateCode = require("./generateCodeFromBackend");

let app = express();
let port = 3001;
let mongoDB = "mongodb://127.0.0.1:27017/mastermind";

const jsonParser = bodyParser.json();
mongoose.connect(mongoDB, { useNewUrlParser: true }, function (err) {
  if (err) return console.log(err);
  console.log("Database connection successful");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    " X-Requested-With, Origin, Content-Type, Accept"
  );
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

function SinglePlayerMatchMaking() {
  this.easy = [];
  this.normal = [];
  this.hard = [];
}
SinglePlayerMatchMaking.prototype.addToThisQueue = function (diff, id) {
  this[diff] = [...this[diff], id];
};
SinglePlayerMatchMaking.prototype.getQueueFrom = function (diff) {
  return this[diff];
};

SinglePlayerMatchMaking.prototype.removeTwoFrom = function (diff) {
  return this[diff].splice(0, 2);
};
let emitter = new EventEmitter();
let matching = new SinglePlayerMatchMaking();
let values = {};
values["easy"] = [4, 4];
values["normal"] = [4, 7];
values["hard"] = [9, 9];
app.get("/game/pvp/:difficulty/:name/:id", async (req, res) => {
  let name = req.params.name;
  let id = req.params.id;
  let user = { name, id };
  let difficulty = req.params.difficulty;
  let [codeLength, maxDigits] = values[difficulty];
  matching.addToThisQueue(difficulty, user);
  console.log(matching);
  if (matching.getQueueFrom(difficulty).length < 2) {
    return emitter.once(`match${user}`, (newPvpMatch) => {
      res.send(newPvpMatch);
    });
  } else {
    let fromQueue = matching.removeTwoFrom(difficulty);
    let playersMatched = fromQueue.reduce((acc, player) => {
      let { id, name } = player;
      acc[id] = { name, moves: 0, finish: false, time: 0, winner: false };
      return acc;
    }, {});
    let code = await generateCode(codeLength, maxDigits);
    let newPvpMatch = await new PvPModel({
      players: playersMatched,
      code,
      numCompletedGames: 0,
      gameover: false,
    });
    emitter.emit(`match${fromQueue[0]}`, newPvpMatch);
    newPvpMatch.save();
    res.send(newPvpMatch);
  }
});

app.post("/game/:gameid", jsonParser, (req, res) => {
  let gameid = `${req.params.gameid}`;
  let { userid, winner } = req.body;
  console.log(userid, winner);
  PvPModel.findById(gameid, function (err, game) {
    if (err) {
      console.log(`Could not access database for game id: ${gameid}`);
      res.send(err);
    }
    if (game === null) {
      console.log(`Could not find game id: ${gameid}`);
      res.sendStatus(404);
    } else {
      console.log(game, userid);
      let { players } = game;
      console.log(players[userid].moves);
      players[userid].moves = players[userid].moves + 1;
      players[userid].winner = winner;
      if (winner) {
        game.numCompletedGames++;
      }
      if (numCompletedGames === players.length) {
        PvPModel.deleteOne(gameId, (err, game) => {
          if (err) {
            console.log("Unable to delete game");
          } else {
            console.log(`Game completed. Deleting ${game}`);
          }
        });
      } else {
        game[players] = players;
        game.markModified("players");
        game.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("update success");
            res.json(game);
          }
        });
      }
    }
  });
});

app.post("/user/create", jsonParser, (req, res) => {
  let { username, password, key } = req.body;
  UserModel.findOne({ name: username }, (err, user) => {
    if (err) {
      console.log("Error accessing data");
      res.send(404);
    } else {
      if (user === null) {
        let newUser = new UserModel({
          name: username,
          passwordHash: password,
          coolstring: key,
          gameHistory: [],
        });
        newUser.save((error) => {
          if (error) {
            console.log(`Unable to create new user ${error}`);
            res.send(error);
          } else {
            console.log(`Success, created new user ${username}`);
            let { _id, gameHistory } = newUser;
            res.send({ username, _id, gameHistory });
          }
        });
      } else {
        res.status(418).send("Username taken");
      }
    }
  });
});

app.post("/user/login", jsonParser, (req, res) => {
  let { username, password } = req.body;
  console.log(username, password);
  UserModel.findOne({ name: username }, (err, user) => {
    console.log(user);
    if (err) {
      console.log("Error accessing data");
      res.send(404);
    } else {
      if (user === null) {
        console.log("Unable to find account");
        res.status(418).send("Please create an account");
      } else {
        console.log("Found account");
        let { coolstring, passwordHash, _id, gameHistory } = user;
        let scramble = scramblePassword(password, coolstring);
        if (passwordHash === scramble) {
          res.send({ username, _id, gameHistory });
        } else {
          res.status(403).send("Unable to find username + account combo");
        }
      }
    }
  });
});

app.listen(port, console.log("Server connected"));
