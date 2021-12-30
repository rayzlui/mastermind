let express = require("express");
let mongoose = require("mongoose");
let UserModel = require("./Models/UserModel.js");
let PvPModel = require("./Models/PvPModel");
let EventEmitter = require("events");
let bodyParser = require("body-parser");
let generateCode = require("./generateCodeFromBackend");
let binaryInsert = require("./binaryInsert");
const LeaderboardModel = require("./Models/LeaderboardModel.js");

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

app.get("/api/users/:name", (req, res) => {
  let username = req.params.name;
  UserModel.findOne({ name: username }, (err, data) => {
    if (err) {
      console.log(
        `Error searching database for User Model params: ${username}`
      );
      res.status(404).send("Unable to find user");
    } else {
      if (data.length < 1) {
        console.log(`Unable to find user ${username}`);
        res.status(404);
        res.send();
      } else {
        console.log(`Found user: ${data}`);
        let { gameHistory, dateJoined } = data;
        res.status(200).send({ username, gameHistory, dateJoined });
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

app.get("/api/game/pvp/:difficulty/:name/:id", async (req, res) => {
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
    acc[id] = { name, moves: 0, time: 0, finished: null };
    return acc;
  }, {});

  let [codeLength, maxDigits] = values[difficulty];
  let code = await generateCode(codeLength, maxDigits);
  let newPvpMatch = await new PvPModel({
    players: playersMatched,
    code,
    numCompletedGames: 0,
    gameover: false,
    numOfPlayers: players.length,
  });
  newPvpMatch.save();
  return newPvpMatch;
}

app.post("/api/game/:gameid", jsonParser, (req, res) => {
  let gameid = `${req.params.gameid}`;
  let { userid, finished, time } = req.body;
  PvPModel.findById(gameid, function (err, game) {
    if (err) {
      console.log(`Could not access database for game id: ${gameid}`);
      res.send(err);
    }
    if (game === null) {
      console.log(`Could not find game id: ${gameid}`);
      res.sendStatus(404);
    } else {
      console.log(req.body);
      let { _id, players } = game;

      if (finished !== null) {
        game.numCompletedGames++;
        if (finished) {
          players[userid].finished = time;
        }
      } else {
        players[userid].moves = players[userid].moves + 1;
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
      if (game.numCompletedGames === game.numOfPlayers) {
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

app.post("/api/user/create", jsonParser, (req, res) => {
  let { username, password, key } = req.body;
  if (username === undefined || password === undefined) {
    res.send(404).send("Need valid info");
  }
  UserModel.findOne({ name: username }, (err, user) => {
    if (err) {
      console.log("Error accessing data");
      res.send(404);
    } else {
      if (user === null) {
        let rightNowThisMoment = Date();
        let newUser = new UserModel({
          name: username,
          passwordHash: password,
          coolstring: key,
          gameHistory: [],
          dateJoined: rightNowThisMoment,
        });
        newUser.save((error) => {
          if (error) {
            console.log(`Unable to create new user ${error}`);
            res.send(error);
          } else {
            console.log(`Success, created new user ${newUser}`);
            let { _id, gameHistory } = newUser;
            res.send({ username, _id, gameHistory });
          }
        });
      } else {
        res.status(418).send({ error: "Username taken" });
      }
    }
  });
});

app.get(`/api/getKey/login/:username`, (req, res) => {
  let username = req.params.username;
  UserModel.findOne({ name: username }, (err, user) => {
    if (err) {
      console.log("Error accessing database");
      res.status(404).send({ error: "Unable to find user" });
    } else {
      if (user === null) {
        res.status(404).send({ error: "Unable to find user" });
      } else {
        let { coolstring } = user;
        console.log("Found user, sending key");
        res.json(coolstring);
      }
    }
  });
});

app.post("/api/user/login", jsonParser, (req, res) => {
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
        res.status(418).send({ error: "Please create an account" });
      } else {
        console.log("Found account");
        let { passwordHash, _id, gameHistory } = user;
        if (passwordHash === password) {
          res.send({ username, _id, gameHistory });
        } else {
          res
            .status(403)
            .send({ error: "Unable to find username + account combo" });
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

app.get("/api/game/tournament/:difficulty/:name/:id", (req, res) => {
  let name = req.params.name;
  let id = req.params.id;
  let user = { name, id };
  let difficulty = req.params.difficulty;
  multiplayerMatchMaking.addToThisQueue(difficulty, user);
  return emitter.once("tournament start", (newMatch) => {
    res.send(newMatch);
  });
});

app.put("/api/userhistory/add/:id", jsonParser, (req, res) => {
  let userid = req.params.id;
  //send back code, time, moves?
  //dont care about moves, because you can lose if moves gone. better just store time.
  let { code, time, difficulty } = req.body;
  UserModel.findOne({ _id: userid }, (err, user) => {
    if (err) {
      console.log(`Unable to access user ${userid}`);
    }
    user.gameHistory.push({ code, time, difficulty });
    user.save((err) => {
      if (err) {
        console.log("Unable to save user history");
        res.status(404).send("Unable to save");
      } else {
        console.log(`Saved data to ${user._id}`);
        res.status(200).send("Saved");
      }
    });
  });
});

app.post("/api/leaderboard/", jsonParser, (req, res) => {
  let { user, time, code, difficulty } = req.body;
  let { _id, username } = user;
  //on leaderboard page will show user name + time, but clicking user name => go to user page, clicking time => try and beat the code
  let entryToLeaderboard = new LeaderboardModel({
    name: username,
    difficulty,
    userid: _id,
    time,
    code,
  });
  entryToLeaderboard.save((err) => {
    if (err) {
      console.log("Unable to save time");
      res.status(404).send("Unable to save time");
    } else {
      res.status(200).send(`Saved to leaderboard ${entryToLeaderboard}`);
    }
  });
});

app.get("/api/leaderboard", (req, res) => {
  LeaderboardModel.find({}, (err, leaderboard) => {
    if (err) {
      res.status(404).status("Unable to get leaderboard");
    } else {
      let store = { easy: [], normal: [], hard: [] };
      leaderboard.forEach((data, index) => {
        let { name, userid, code, time, difficulty } = data;
        let sortedByTime = binaryInsert(store[difficulty], {
          user: { name, userid, time },
          code,
          time,
        });
        store[difficulty] = sortedByTime;
      });
      res.json(store);
    }
  });
});

app.listen(port, console.log("Server connected"));
