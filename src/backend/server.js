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

function difficultyTranslateValues(string) {
  switch (string) {
    case "easy":
      return { codeLength: 4, maxDigit: 4 };
    case "hard":
      return { codeLength: 7, maxDigit: 9 };
    default:
      return { codeLength: 4, maxDigit: 8 };
  }
}

function createPlayerInfo(players) {
  return players.reduce((acc, player) => {
    let { id, name } = player;
    acc[id] = { name, moves: 0, time: 0, isWinner: null };
    return acc;
  }, {});
}

function matchMakerWithCodeGenerator(
  codeGeneratorCb,
  createPlayerInfoCb,
  difficultyTranslateValuesCb
) {
  return async (players, difficulty) => {
    let playersMatched = createPlayerInfoCb(players);
    let { codeLength, maxDigit } = difficultyTranslateValuesCb(difficulty);
    let code = await codeGeneratorCb(codeLength, maxDigit);
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

const createMatch = matchMakerWithCodeGenerator(
  generateCode,
  createPlayerInfo,
  difficultyTranslateValues
);

//User routes

//create

function isInvalidUserCreation(data) {
  let { username, password, key } = data;
  return [username, password, key].some((entry) => entry === undefined);
}
app.post("/api/user/create", jsonParser, (req, res) => {
  if (isInvalidUserCreation(req.body)) {
    res
      .status(404)
      .send(
        "Unable to create account. Please make sure you use alphanumeric characters and is at least 8 characters long"
      );
  }
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
      console.log("Error accessing data for find user");
      res.status(404).send({ error: "Unable to find user" });
    } else {
      if (user === null) {
        res.status(404).send({ error: "Unable to find user" });
      } else {
        let { coolstring } = user;
        res.json(coolstring);
      }
    }
  });
});

//login

function isInvalidUserLogin(data) {
  let { username, password } = data;
  return [username, password].some((entry) => entry === undefined);
}
app.post("/api/user/login", jsonParser, (req, res) => {
  if (isInvalidUserLogin(req.body)) {
    res.statusMessage(404).send("Missing login info");
    return null;
  }
  let { username, password } = req.body;
  UserModel.findOne({ name: username }, (err, user) => {
    if (err) {
      console.log("Error accessing data for logging in user");
      res.status(404).send({ error: "User not found" });
    } else {
      if (user === null) {
        res.status(418).send({ error: "Please create an account" });
      } else {
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

function isInvalidGameHistory(data) {
  let { code, time, difficulty, _id } = data;
  return [code, time, difficulty, _id].some((entry) => entry === undefined);
}

//update user game history
app.put("/api/userhistory/add", jsonParser, (req, res) => {
  if (isInvalidGameHistory(req.body)) {
    res.status(404).res("Invalid game data");
    return null;
  }
  let { code, time, difficulty, _id } = req.body;
  UserModel.findOne({ _id }, (err, user) => {
    if (user === null) {
      res.status(404).send("Unable to find user");
    }
    if (err) {
      console.log(
        `Error, unable to access user database for updating user history for: ${userid}`
      );
    }
    user.gameHistory.push({ code, time, difficulty });
    user.save((err) => {
      if (err) {
        res.status(404).send("Unable to save");
      } else {
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
      if (data === null) {
        res.status(404).send({ error: "Unable to save game" });
      } else {
        let { gameHistory, dateJoined } = data;
        res.status(200).send({ username, gameHistory, dateJoined });
      }
    }
  });
});

//matchmaking
function OneOnOneQueue() {
  this.easy = [];
  this.normal = [];
  this.hard = [];
}
OneOnOneQueue.prototype.addToThisQueue = function (diff, id) {
  this[diff] = [...this[diff], id];
};
OneOnOneQueue.prototype.getQueueFrom = function (diff) {
  return this[diff];
};

OneOnOneQueue.prototype.removeTwoFrom = function (diff) {
  return this[diff].splice(0, 2);
};
let emitter = new EventEmitter();
let oneOnOneMatchMaking = new OneOnOneQueue();

function isInvalidGameRequest(data) {
  let { name, id, difficulty } = data;
  return [name, id, difficulty].some((entry) => entry === undefined);
}

app.get("/api/game/pvp/:difficulty/:name/:id", async (req, res) => {
  if (isInvalidGameRequest(req.params)) {
    res.status(404).send("Invalid game request");
    return null;
  }
  let { name, id, difficulty } = req.params;

  let user = { name, id };
  oneOnOneMatchMaking.addToThisQueue(difficulty, user);
  if (oneOnOneMatchMaking.getQueueFrom(difficulty).length < 2) {
    return emitter.once(`match${user}`, (newPvpMatch) => {
      res.send(newPvpMatch);
    });
  } else {
    let playersInQueue = oneOnOneMatchMaking.removeTwoFrom(difficulty);
    let newMatch = await createMatch(playersInQueue, difficulty);
    emitter.emit(`match${playersInQueue[0]}`, newMatch);
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

TournamentQueue.prototype.getFromThisQueue = function (difficulty) {
  return this[difficulty];
};

TournamentQueue.prototype.resetThisQueue = function (difficulty) {
  this[difficulty] = [];
};
let tournamentMatchMakingQueue = new TournamentQueue();

//server checks every 10 seconds to see if we can make a tournament match.

async function tournamentMatchMaker(
  matchMakingQueue,
  emitter,
  createMatchCallBack
) {
  for (let difficulty in matchMakingQueue) {
    let queue = matchMakingQueue.getFromThisQueue(difficulty);
    if (queue.length > 2) {
      let newMatch = await createMatchCallBack(queue, difficulty);
      emitter.emit(`tournament-start-${difficulty}`, newMatch);
      matchMakingQueue.resetThisQueue(difficulty);
    }
  }
}
setInterval(
  () => tournamentMatchMaker(tournamentMatchMakingQueue, emitter, createMatch),
  10000
);

app.get("/api/game/tournament/:difficulty/:name/:id", (req, res) => {
  if (isInvalidGameRequest(req.params)) {
    res.status(404).send("Invalid game request");
    return null;
  }
  let { name, id, difficulty } = req.params;
  let user = { name, id };
  tournamentMatchMakingQueue.addToThisQueue(difficulty, user);
  return emitter.once(`tournament-start-${difficulty}`, (newMatch) => {
    res.send(newMatch);
  });
});

function isInvalidGameData(data) {
  let { userid, isWinner, time } = data;
  return [userid, isWinner, time].some((entry) => entry === undefined);
}

//Handler for all active online matches
app.put("/api/game/:gameid", jsonParser, (req, res) => {
  let { gameid } = req.params;
  if (gameid === undefined || isInvalidGameData(req.body)) {
    res.status(404).send("Invalid game data");
    return null;
  }
  let { userid, isWinner, time } = req.body;
  PvPModel.findById(gameid, function (err, game) {
    if (err) {
      console.log(`Could not access database for game id: ${gameid}`);
      res.status(404).send("Unable to access server");
    }
    if (game === null) {
      res.status(404).send("Could not find game");
    } else {
      let { _id, players } = game;
      //isWinner will have three states. true === player has won, false === player has lost, null === game is still active
      players[userid].moves = players[userid].moves + 1;
      if (isWinner !== null) {
        game.numCompletedGames++;
        if (isWinner) {
          players[userid].time = time;
          players[userid].isWinner = true;
        } else {
          players[userid].isWinner = false;
        }
      }
      //if game still active server responds with updated info
      game[players] = players;
      game.markModified("players");
      game.save((err) => {
        if (err) {
          console.log(`Error saving game ${err}`);
        } else {
          res.json(game);
        }
      });
      //if everyone has finished server deletes the game
      if (game.numCompletedGames === game.numOfPlayers) {
        PvPModel.deleteOne(_id, (err, game) => {
          if (err) {
            console.log("Unable to delete game");
          }
        });
      }
    }
  });
});

//Leaderboard

function isInvalidLeaderboardData(data) {
  let { user, time, code, difficulty } = data;
  let { countOfNums, nums } = code;
  let { _id, username } = user;
  return [_id, time, difficulty, username, countOfNums, nums].some(
    (entry) => entry === undefined
  );
}

//add to leaderboard
app.post("/api/leaderboard/", jsonParser, (req, res) => {
  if (isInvalidLeaderboardData(req.body)) {
    res.status(403).send("Invalid game data");
    return null;
  }
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
      console.log("Unable to save time for leaderboard");
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
