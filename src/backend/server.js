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

function matchMakerWithCodeGenerator(codeGenerator) {
  return async (players, difficulty) => {
    let difficultyTranslateValues = {};
    difficultyTranslateValues["easy"] = [4, 4];
    difficultyTranslateValues["normal"] = [4, 7];
    difficultyTranslateValues["hard"] = [7, 9];

    let playersMatched = players.reduce((acc, player) => {
      let { id, name } = player;
      acc[id] = { name, moves: 0, time: 0, isWinner: null };
      return acc;
    }, {});

    let [codeLength, maxDigits] = difficultyTranslateValues[difficulty];
    let code = await codeGenerator(codeLength, maxDigits);
    let newPvpMatch = await new PvPModel({
      players: playersMatched,
      code,
      numCompletedGames: 0,
      gameover: false,
      numOfPlayers: players.length,
    });
    newPvpMatch.save();
    return newPvpMatch;
  };
}

const createMatch = matchMakerWithCodeGenerator(generateCode);

//User routes

//create
app.post("/api/user/create", jsonParser, (req, res) => {
  let { username, password, key } = req.body;
  if (username === undefined || password === undefined) {
    res.send(404).send("Need valid info");
  }
  UserModel.findOne({ name: username }, (err, user) => {
    if (err) {
      console.log(`Error finding user: ${username}`);
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
            res.status(418).send("Unable to create account");
          } else {
            console.log(`Success, created new user ${newUser}`);
            let { _id, gameHistory, dateJoined } = newUser;
            res.send({ username, _id, gameHistory, dateJoined });
          }
        });
      } else {
        res.status(418).send({ error: "Username taken" });
      }
    }
  });
});

//request key for login
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

//login
app.post("/api/user/login", jsonParser, (req, res) => {
  let { username, password } = req.body;
  UserModel.findOne({ name: username }, (err, user) => {
    if (err) {
      console.log("Error accessing data");
      res.status(404).send({ error: "User not found" });
    } else {
      if (user === null) {
        console.log("Unable to find account");
        res.status(418).send({ error: "Please create an account" });
      } else {
        console.log("Found account");
        let { passwordHash, _id, gameHistory, dateJoined } = user;
        if (passwordHash === password) {
          res.send({ username, _id, gameHistory, dateJoined });
        } else {
          res
            .status(403)
            .send({ error: "Unable to find username + account combo" });
        }
      }
    }
  });
});

//update user game history
app.put("/api/userhistory/add/:id", jsonParser, (req, res) => {
  let userid = req.params.id;
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

//find
//maybe we should have two different user models, one thats public for other users to search and one to login, so we don't accidentially share passwords.
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
        res.status(404).send({ error: "Unable to save game" });
      } else {
        console.log(`Found user: ${data}`);
        let { gameHistory, dateJoined } = data;
        res.status(200).send({ username, gameHistory, dateJoined });
      }
    }
  });
});

//matchmaking
function OneOnOneMatchMaker() {
  this.easy = [];
  this.normal = [];
  this.hard = [];
}
OneOnOneMatchMaker.prototype.addToThisQueue = function (diff, id) {
  this[diff] = [...this[diff], id];
};
OneOnOneMatchMaker.prototype.getQueueFrom = function (diff) {
  return this[diff];
};

OneOnOneMatchMaker.prototype.removeTwoFrom = function (diff) {
  return this[diff].splice(0, 2);
};
let emitter = new EventEmitter();
let oneOnOneMatchMaking = new OneOnOneMatchMaker();

app.get("/api/game/pvp/:difficulty/:name/:id", async (req, res) => {
  let { name, id, difficulty } = req.params;

  let user = { name, id };
  oneOnOneMatchMaking.addToThisQueue(difficulty, user);
  if (oneOnOneMatchMaking.getQueueFrom(difficulty).length < 2) {
    return emitter.once(`match${user}`, (newPvpMatch) => {
      res.send(newPvpMatch);
    });
  } else {
    let fromQueue = oneOnOneMatchMaking.removeTwoFrom(difficulty);
    let newMatch = await createMatch(fromQueue, difficulty);
    emitter.emit(`match${fromQueue[0]}`, newMatch);
    res.send(newMatch);
  }
});

//Tournament Match Making

function TournamentQueue() {
  this.easy = [];
  this.normal = [];
  this.hard = [];
}

TournamentQueue.prototype.addToThisQueue = function (difficulty, user) {
  this[difficulty].push(user);
};

let tournamentMatchMakingQueue = new TournamentQueue();

//server checks every 10 seconds to see if we can make a tournament match.

async function tournamentMatchMaker(
  matchMakingQueue,
  emitter,
  createMatchCallBack
) {
  for (let difficulty in matchMakingQueue) {
    let queue = matchMakingQueue[difficulty];
    if (queue.length > 2) {
      let newMatch = await createMatchCallBack(queue, difficulty);
      emitter.emit("tournament start", newMatch);
      matchMakingQueue[difficulty] = [];
    }
  }
}
setInterval(
  () => tournamentMatchMaker(tournamentMatchMakingQueue, emitter, createMatch),
  10000
);

app.get("/api/game/tournament/:difficulty/:name/:id", (req, res) => {
  let name = req.params.name;
  let id = req.params.id;
  let user = { name, id };
  let difficulty = req.params.difficulty;
  tournamentMatchMakingQueue.addToThisQueue(difficulty, user);
  return emitter.once("tournament start", (newMatch) => {
    res.send(newMatch);
  });
});

//Handler for all active online matches
app.post("/api/game/:gameid", jsonParser, (req, res) => {
  let gameid = `${req.params.gameid}`;
  let { userid, isWinner, time } = req.body;
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
      //isWinner will have three states. true === player has won, false === player has lost, null === game is still active
      if (isWinner !== null) {
        game.numCompletedGames++;
        if (isWinner) {
          players[userid].time = time;
          players[userid].isWinner = true;
        } else {
          players[userid].isWinner = false;
        }
      } else {
        players[userid].moves = players[userid].moves + 1;
      }
      //if game still active server responds with updated info
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
      //if everyone has finished server deletes the game
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

//Leaderboard

//add to leaderboard
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

//request leaderboard

function organizeLeaderboardByTimeAndDifficulty(
  leaderboardData,
  binaryInsertCallBack
) {
  let hashedLeaderboard = { easy: [], normal: [], hard: [] };
  leaderboardData.forEach((data) => {
    let { name, userid, code, time, difficulty } = data;
    let sortedByTime = binaryInsertCallBack(hashedLeaderboard[difficulty], {
      user: { name, userid, time },
      code,
      time,
    });
    hashedLeaderboard[difficulty] = sortedByTime;
  });
  return hashedLeaderboard;
}
app.get("/api/leaderboard", (req, res) => {
  LeaderboardModel.find({}, (err, data) => {
    if (err) {
      res.status(404).status("Unable to get leaderboard");
    } else {
      let organizedData = organizeLeaderboardByTimeAndDifficulty(
        data,
        binaryInsert
      );
      res.json(organizedData);
    }
  });
});

app.listen(port, console.log("Server connected"));
