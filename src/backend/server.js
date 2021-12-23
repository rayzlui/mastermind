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
        res.status(200).send(data);
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
  matching.addToThisQueue(difficulty, user);
  if (matching.getQueueFrom(difficulty).length < 2) {
    return emitter.once(`match${user}`, (newPvpMatch) => {
      res.send(newPvpMatch);
    });
  } else {
    let fromQueue = matching.removeTwoFrom(difficulty);
    let newMatch = await createMatch(fromQueue, difficulty);
    emitter.emit(`match${fromQueue[0]}`, newMatch);
    res.send(newMatch);
  }
});

async function createMatch(players, difficulty) {
  let playersMatched = players.reduce((acc, player) => {
    let { id, name } = player;
    acc[id] = { name, moves: 0, finish: false, time: 0, winner: false };
    return acc;
  }, {});

  let [codeLength, maxDigits] = values[difficulty];
  let code = await generateCode(codeLength, maxDigits);
  let newPvpMatch = await new PvPModel({
    players: playersMatched,
    code,
    numCompletedGames: 0,
    gameover: false,
  });
  newPvpMatch.save();
  return newPvpMatch;
}

app.post("/game/:gameid", jsonParser, (req, res) => {
  let gameid = `${req.params.gameid}`;
  let { userid, winner } = req.body;
  PvPModel.findById(gameid, function (err, game) {
    if (err) {
      console.log(`Could not access database for game id: ${gameid}`);
      res.send(err);
    }
    if (game === null) {
      console.log(`Could not find game id: ${gameid}`);
      res.sendStatus(404);
    } else {
      let { _id, players } = game;
      players[userid].moves = players[userid].moves + 1;
      players[userid].winner = winner;
      if (winner) {
        game.numCompletedGames++;
      }

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
      if (game.numCompletedGames === 2) {
        PvPModel.deleteOne(_id, (err, game) => {
          if (err) {
            console.log("Unable to delete game");
          } else {
            console.log(`Game completed. Deleting ${game}`);
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

app.get(`/getKey/login/:username`, (req, res) => {
  let username = req.params.username;
  console.log(username);
  UserModel.findOne({ name: username }, (err, user) => {
    if (err) {
      console.log("Error accessing database");
      res.status(404).send("Unable to find user");
    } else {
      if (user === null) {
        res.status(404).send("Unable to find user");
      } else {
        let { coolstring } = user;
        console.log("Found user, sending key");
        res.json(coolstring);
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
        let { passwordHash, _id, gameHistory } = user;
        if (passwordHash === password) {
          res.send({ username, _id, gameHistory });
        } else {
          res.status(403).send("Unable to find username + account combo");
        }
      }
    }
  });
});

function MutliplayerMatchMaker() {
  this.easy = [];
  this.normal = [];
  this.hard = [];
}

MutliplayerMatchMaker.prototype.addToThisQueue = function (difficulty, user) {
  this[difficulty].push(user);
};

let multiplayerMatchMaking = new MutliplayerMatchMaker();

setInterval(() => {
  console.log(multiplayerMatchMaking);
  let queueDifficultyKeys = Object.keys(multiplayerMatchMaking);
  queueDifficultyKeys.forEach(async (difficulty) => {
    let queue = multiplayerMatchMaking[difficulty];
    if (queue.length > 2) {
      let newMatch = await createMatch(queue, difficulty);
      emitter.emit("tournament start", newMatch);
      multiplayerMatchMaking[difficulty] = [];
    }
  });
}, 15000);

app.get("/game/tournament/:difficulty/:name/:id", (req, res) => {
  let name = req.params.name;
  let id = req.params.id;
  let user = { name, id };
  let difficulty = req.params.difficulty;
  multiplayerMatchMaking.addToThisQueue(difficulty, user);
  return emitter.once("tournament start", (newMatch) => {
    res.send(newMatch);
  });
});

app.listen(port, console.log("Server connected"));
