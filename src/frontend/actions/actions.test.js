jest.setTimeout(120000);

import {
  addMoveToHistory,
  changePageTo,
  createGameWithDetails,
  generateMastermindCode,
  hideLogin,
  playGameAgain,
  reset,
  setDifficulty,
  setMastermindCode,
  showLogin,
  specialUpdatePvPForTimer,
  userSubmitCodeForCheck,
  weHaveALoser,
  weHaveAWinner,
  userSubmit,
  requestPvpMatch,
  updatePvpInfo,
  searchUser,
  showThisUser,
  uploadTimeToLeaderboard,
} from "./actions";
import {
  DISPLAY_USER,
  ONE_ON_ONE,
  PLAY_GAME,
  SET_ALERT_MESSAGE,
  SINGLE_PLAYER,
  TOURNAMENT,
} from "./actionTypes";

import fetchMock from "fetch-mock";

describe("generateMastermindCode", () => {
  let mockCodeLength = 4;
  let mockMaxDigit = 7;
  let mockGenerateCode = jest.fn();
  let thunkAction = generateMastermindCode(
    mockCodeLength,
    mockMaxDigit,
    mockGenerateCode
  );
  it("should return a function", () => {
    expect(typeof thunkAction).toEqual("function");
  });
  let mockDispatch = jest.fn();
  it("should run generateCode with codeLength and maxDigits and then dispatch setMastermindCode", async () => {
    thunkAction(mockDispatch);
    expect(mockGenerateCode).toHaveBeenCalledWith(mockCodeLength, mockMaxDigit);
    expect(await mockDispatch).toHaveBeenCalledWith(setMastermindCode());
  });
});

describe("createGameWithDetails", () => {
  function mockGameDetailsGenerator(codeLength, maxDigit, name) {
    return { codeLength, maxDigit, name };
  }
  function mockStoreGenerator(gameType, currentUser) {
    return () => {
      return { gameType, currentUser };
    };
  }
  function mockCurrentUserGenerator(id, name, gameHistory) {
    return { id, name, gameHistory };
  }
  let mockGameDetails;
  let mockCreateGame;
  let mockGenerateCode;
  let mockRequestPvpMatch;
  let mockDispatch;
  beforeEach(() => {
    mockGameDetails = mockGameDetailsGenerator(4, 4, "easy");
    mockGenerateCode = jest.fn(() => {
      return "mockGenerateCode";
    });
    mockRequestPvpMatch = jest.fn(() => {
      return "mockRequestPvp";
    });
    mockDispatch = jest.fn();
    mockCreateGame = createGameWithDetails(
      mockGameDetails,
      mockGenerateCode,
      mockRequestPvpMatch
    );
  });
  it("should return a function", () => {
    expect(typeof mockCreateGame).toBe("function");
  });

  describe("user requesting one on one mode but not logged in", () => {
    it("should dispatch actions to tell user to login", () => {
      let mockStore = mockStoreGenerator(ONE_ON_ONE, null);
      mockCreateGame(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: SET_ALERT_MESSAGE,
        payload: "Please login to play online",
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, showLogin("Login"));
      expect(mockGenerateCode).not.toHaveBeenCalled();
      expect(mockRequestPvpMatch).not.toHaveBeenCalled();
    });
  });

  describe("user requesting tournament mode but not logged in", () => {
    it("should dispatch actions to tell user to login", () => {
      let mockStore = mockStoreGenerator(TOURNAMENT, null);
      mockCreateGame(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: SET_ALERT_MESSAGE,
        payload: "Please login to play online",
      });
      expect(mockDispatch).toHaveBeenNthCalledWith(2, showLogin("Login"));
      expect(mockGenerateCode).not.toHaveBeenCalled();
      expect(mockRequestPvpMatch).not.toHaveBeenCalled();
    });
  });

  describe("user requests online game is logged in", () => {
    it("should build game with requestPvp", () => {
      let mockCurrentUser = mockCurrentUserGenerator("12ds9uasas0da", "Paul", [
        { game: 1 },
        { game: 2 },
      ]);
      let mockStore = mockStoreGenerator(ONE_ON_ONE, mockCurrentUser);
      mockCreateGame(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(5);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, reset());
      expect(mockDispatch).toHaveBeenNthCalledWith(2, mockRequestPvpMatch());
      expect(mockDispatch).toHaveBeenNthCalledWith(
        3,
        setDifficulty(mockGameDetails)
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(4, changePageTo(PLAY_GAME));
      expect(mockDispatch).toHaveBeenNthCalledWith(5, hideLogin());
      expect(mockRequestPvpMatch).toHaveBeenCalledWith(
        mockGameDetails.name,
        "pvp",
        mockCurrentUser
      );
      expect(mockGenerateCode).not.toHaveBeenCalled();
    });
  });
  describe("user requests online game is logged in", () => {
    it("should build game with requestPvp", () => {
      let mockCurrentUser = mockCurrentUserGenerator("12ds9uasas0da", "Paul", [
        { game: 1 },
        { game: 2 },
      ]);
      let mockStore = mockStoreGenerator(TOURNAMENT, mockCurrentUser);
      mockCreateGame(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(5);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, reset());
      expect(mockDispatch).toHaveBeenNthCalledWith(2, mockRequestPvpMatch());
      expect(mockDispatch).toHaveBeenNthCalledWith(
        3,
        setDifficulty(mockGameDetails)
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(4, changePageTo(PLAY_GAME));
      expect(mockDispatch).toHaveBeenNthCalledWith(5, hideLogin());
      expect(mockRequestPvpMatch).toHaveBeenCalledWith(
        mockGameDetails.name,
        "tournament",
        mockCurrentUser
      );
      expect(mockGenerateCode).not.toHaveBeenCalled();
    });
  });
  describe("user requests single player game is logged in", () => {
    it("should build game with code generator", () => {
      let mockCurrentUser = mockCurrentUserGenerator("12ds9uasas0da", "Paul", [
        { game: 1 },
        { game: 2 },
      ]);
      let mockStore = mockStoreGenerator(SINGLE_PLAYER, mockCurrentUser);
      mockCreateGame(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(5);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, reset());
      expect(mockDispatch).toHaveBeenNthCalledWith(2, mockGenerateCode());
      expect(mockDispatch).toHaveBeenNthCalledWith(
        3,
        setDifficulty(mockGameDetails)
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(4, changePageTo(PLAY_GAME));
      expect(mockDispatch).toHaveBeenNthCalledWith(5, hideLogin());
      expect(mockGenerateCode).toHaveBeenCalledWith(
        mockGameDetails.codeLength,
        mockGameDetails.maxDigit
      );
      expect(mockRequestPvpMatch).not.toHaveBeenCalled();
    });
  });
  describe("user requests single player game is not logged in should still run game", () => {
    it("should build game with code generator", () => {
      let mockStore = mockStoreGenerator(SINGLE_PLAYER, null);
      let mockDispatch = jest.fn();
      mockCreateGame(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(5);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, reset());
      expect(mockDispatch).toHaveBeenNthCalledWith(2, mockGenerateCode());
      expect(mockDispatch).toHaveBeenNthCalledWith(
        3,
        setDifficulty(mockGameDetails)
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(4, changePageTo(PLAY_GAME));
      expect(mockDispatch).toHaveBeenNthCalledWith(5, hideLogin());
      expect(mockGenerateCode).toHaveBeenCalledWith(
        mockGameDetails.codeLength,
        mockGameDetails.maxDigit
      );
      expect(mockRequestPvpMatch).not.toHaveBeenCalled();
    });
  });
});

describe("specialUpdatePvPForTimer", () => {
  function mockStoreGenerator(pvpData, currentUser, isWinner) {
    return () => {
      return { pvpData, currentUser, isWinner };
    };
  }
  let mockTime;
  let mockUpdateDatabase;
  let specialUpdateThunk;
  beforeEach(() => {
    mockTime = 1000;
    mockUpdateDatabase = jest.fn();
    specialUpdateThunk = specialUpdatePvPForTimer(mockTime, mockUpdateDatabase);
  });
  it("should be a function", () => {
    expect(typeof specialUpdateThunk).toBe("function");
  });

  describe("it is not an online game", () => {
    it("should return null", () => {
      let mockDispatch = jest.fn();
      let mockStore = mockStoreGenerator(
        null,
        { _id: 1, name: "someUser" },
        null
      );
      expect(specialUpdateThunk(mockDispatch, mockStore)).toBe(null);
      expect(mockUpdateDatabase).not.toHaveBeenCalled();
      expect(mockDispatch).not.toHaveBeenCalledWith();
    });
  });

  describe("it is online game", () => {
    it("should dispatch updateDatabase", () => {
      let mockDispatch = jest.fn();
      let mockGame = {
        _id: "312312313312",
        asdfasf542352sfs: { player: "name" },
        "23r32fwewerw": { player: "name" },
      };
      let mockWinner = false;
      let mockUser = { _id: "23r32fwewerw", name: "pablo" };
      let mockStore = mockStoreGenerator(mockGame, mockUser, mockWinner);
      specialUpdateThunk(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockUpdateDatabase).toHaveBeenCalledWith(
        mockGame._id,
        mockUser._id,
        mockWinner,
        mockTime
      );
    });
  });
});

describe("playGameAgain", () => {
  function mockStoreGenerator(gameDifficulty, gameType, currentUser) {
    return () => {
      return { gameDifficulty, gameType, currentUser };
    };
  }

  let mockGenerateCode;
  let mockRequestPvp;
  let playAgainThunk;
  beforeEach(() => {
    mockGenerateCode = jest.fn();
    mockRequestPvp = jest.fn();
    playAgainThunk = playGameAgain(mockGenerateCode, mockRequestPvp);
  });

  let mockGameDiff = { name: "easy", codeLength: 4, maxDigit: 4 };
  let mockUser = { _id: "23wefw32f2", name: "jorge" };

  it("should be a function", () => {
    expect(typeof playAgainThunk).toEqual("function");
  });

  describe("single player playAgain", () => {
    it("should dispatch generateMastermind", () => {
      let mockStore = mockStoreGenerator(mockGameDiff, SINGLE_PLAYER, mockUser);
      let mockDispatch = jest.fn();
      playAgainThunk(mockDispatch, mockStore);
      expect(mockGenerateCode).toHaveBeenCalledWith(
        mockGameDiff.codeLength,
        mockGameDiff.maxDigit
      );
      expect(mockRequestPvp).not.toHaveBeenCalled();
    });
  });

  describe("tournament play again", () => {
    describe("should dispatch requestPvp", () => {
      it("should dispatch generateMastermind with type tournamnet", () => {
        let mockStore = mockStoreGenerator(mockGameDiff, TOURNAMENT, mockUser);
        let mockDispatch = jest.fn();
        playAgainThunk(mockDispatch, mockStore);
        expect(mockRequestPvp).toHaveBeenCalledWith(
          mockGameDiff.name,
          "tournament",
          mockUser
        );
        expect(mockGenerateCode).not.toHaveBeenCalled();
      });
    });
  });
  describe("one on one play again", () => {
    describe("should dispatch requestPvp with type pvp", () => {
      it("should dispatch generateMastermind", () => {
        let mockStore = mockStoreGenerator(mockGameDiff, ONE_ON_ONE, mockUser);
        let mockDispatch = jest.fn();
        playAgainThunk(mockDispatch, mockStore);
        expect(mockRequestPvp).toHaveBeenCalledWith(
          mockGameDiff.name,
          "pvp",
          mockUser
        );
        expect(mockGenerateCode).not.toHaveBeenCalled();
      });
    });
  });
});

describe("userSubmitCodeForCheck", () => {
  let mockCurrentUser = { _id: "240jfwdjos", name: "Nick", gameHistory: [] };
  let mockPvPData = {
    _id: "39fds09uewfjsdf",
    sfdsgdfg32423dg: { _id: "sfdsgdfg32423dg", name: "paul" },
    "240jfwdjos": { _id: "240jfwdjos", name: "Nick" },
  };
  let mockMastermindCode = {
    nums: [1, 2, 3, 4, 5, 6],
    countOfNums: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 },
  };
  let mockCode = [4, 5, 3, 6, 3, 2];
  let mockCorrectGuessMastermindCode = {
    nums: mockCode,
    countOfNums: { 2: 1, 3: 2, 4: 1, 5: 1, 6: 1 },
  };
  function mockStoreGenerator(
    mastermindCode,
    pvpData,
    currentUser,
    turnsRemaining
  ) {
    return () => {
      return { mastermindCode, pvpData, currentUser, turnsRemaining };
    };
  }
  let mockUpdateDatabase;
  let mockDispatch;
  let userSubmitThunk;
  beforeEach(() => {
    mockUpdateDatabase = jest.fn(() => "hello world");
    mockDispatch = jest.fn();
    userSubmitThunk = userSubmitCodeForCheck(mockCode, mockUpdateDatabase);
  });
  describe("single player, incorrect code, turns remaining", () => {
    it("should not updateDatabase or call winner or loser", () => {
      let mockStore = mockStoreGenerator(mockMastermindCode, null, null, 3);
      userSubmitThunk(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, userSubmit());
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        addMoveToHistory({ move: mockCode, redPeg: 1, whitePeg: 4 })
      );
    });
  });
  describe("single player, correct code", () => {
    it("should call winner", () => {
      let mockStore = mockStoreGenerator(
        mockCorrectGuessMastermindCode,
        null,
        null,
        3
      );
      userSubmitThunk(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(3);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, userSubmit());
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        addMoveToHistory({ move: mockCode, redPeg: 6, whitePeg: 0 })
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(3, weHaveAWinner());
    });
  });
  describe("single player, incorrect code, no turns remaining", () => {
    it("should call loser", () => {
      let mockStore = mockStoreGenerator(
        mockMastermindCode,
        null,
        mockCurrentUser,
        0
      );
      userSubmitThunk(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(3);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, userSubmit());
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        addMoveToHistory({ move: mockCode, redPeg: 1, whitePeg: 4 })
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(3, weHaveALoser());
    });
  });
  describe("online player, incorrect code, no turns remaining", () => {
    it("should updateDatabase and calls loser", () => {
      let mockStore = mockStoreGenerator(
        mockMastermindCode,
        mockPvPData,
        mockCurrentUser,
        0
      );
      userSubmitThunk(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, userSubmit());
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        addMoveToHistory({ move: mockCode, redPeg: 1, whitePeg: 4 })
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(3, mockUpdateDatabase());
      expect(mockDispatch).toHaveBeenNthCalledWith(4, weHaveALoser());
      expect(mockUpdateDatabase).toHaveBeenCalledWith(
        mockPvPData._id,
        mockCurrentUser._id,
        null,
        0
      );
    });
  });
  describe("online player, incorrect code, turns remaining", () => {
    it("should updateDatabase only", () => {
      let mockStore = mockStoreGenerator(
        mockMastermindCode,
        mockPvPData,
        mockCurrentUser,
        4
      );
      userSubmitThunk(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(3);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, userSubmit());
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        addMoveToHistory({ move: mockCode, redPeg: 1, whitePeg: 4 })
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(3, mockUpdateDatabase());
      expect(mockUpdateDatabase).toHaveBeenCalledWith(
        mockPvPData._id,
        mockCurrentUser._id,
        null,
        0
      );
    });
  });
  describe("online player, correct code,", () => {
    it("should not updateDatabase, and calls winner", () => {
      let mockStore = mockStoreGenerator(
        mockCorrectGuessMastermindCode,
        mockPvPData,
        mockCurrentUser,
        4
      );
      userSubmitThunk(mockDispatch, mockStore);
      expect(mockDispatch).toHaveBeenCalledTimes(3);
      expect(mockDispatch).toHaveBeenNthCalledWith(1, userSubmit());
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        addMoveToHistory({ move: mockCode, redPeg: 6, whitePeg: 0 })
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(3, weHaveAWinner());
      expect(mockUpdateDatabase).not.toHaveBeenCalled();
    });
  });
});

describe("requestPvpMatch", () => {
  let mockUser = { _id: "123fwejewi", username: "Paul" };
  let mockDifficulty = "easy";
  let mockType = "tournament";
  let mockDispatch;
  let url = `http://localhost:3001/api/game/${mockType}/${mockDifficulty}/${mockUser.username}/${mockUser._id}`;
  let requestPvpThunk;
  let mockData = {
    players: {
      dsfdsasdfasdf: { username: "paul" },
      "38wjf9fwew": { username: "nick" },
    },
    code: { nums: [1, 3, 4, 4] },
    _id: "9320ujf20j",
  };
  beforeEach(() => {
    fetchMock.reset();
    mockDispatch = jest.fn(() => "hello word");
    requestPvpThunk = requestPvpMatch(mockDifficulty, mockType, mockUser);
  });
  it("should return a function", () => {
    expect(typeof requestPvpThunk).toBe("function");
  });
  describe("fetch response takes less than 60 seconds", () => {
    it("should dispatch online game", async () => {
      fetchMock.getOnce(url, mockData);
      await requestPvpThunk(mockDispatch);
      expect(await mockDispatch).toHaveBeenCalledTimes(2);
      expect(await mockDispatch).toHaveBeenNthCalledWith(
        1,
        setMastermindCode(mockData.code)
      );
      expect(await mockDispatch).toHaveBeenNthCalledWith(
        2,
        updatePvpInfo({ players: mockData.players, _id: mockData._id })
      );
    });
  });
  describe("fetch response takes longer than 60 seconds", () => {
    it("should dispatch alert and single player", async () => {
      fetchMock.getOnce(url, mockData, {
        delay: 70000,
      });
      await requestPvpThunk(mockDispatch);
      await expect(mockDispatch).toHaveBeenCalledTimes(2);
      await expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: SET_ALERT_MESSAGE,
        payload: "Unable to make match",
      });
      await expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: SINGLE_PLAYER,
      });
    });
  });
  describe("fetch response is not good", () => {
    it("should handle rejection", async () => {
      fetchMock.once(url, 404);
      await requestPvpThunk(mockDispatch);
      await expect(mockDispatch).toHaveBeenCalledTimes(2);
      await expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: SET_ALERT_MESSAGE,
        payload: "Error accessing server, please check your connection",
      });
      await expect(mockDispatch).toHaveBeenNthCalledWith(2, {
        type: SINGLE_PLAYER,
      });
    });
  });
});

describe("searchUser", () => {
  let mockUsername = "frank";
  let url = `http://localhost:3001/api/users/${mockUsername}`;
  let searchUserThunk = searchUser(mockUsername);
  let mockDispatch;
  beforeEach(() => {
    fetchMock.reset();
    mockDispatch = jest.fn();
  });
  describe("unable to call server", () => {
    it("handles error", async () => {
      fetchMock.getOnce(url, null);
      await searchUserThunk(mockDispatch);
      await expect(mockDispatch).toHaveBeenCalledTimes(1);
      await expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_ALERT_MESSAGE,
        payload: "Error accessing server, please check your connection",
      });
    });
  });

  describe("unable to find user", () => {
    it("should handle with message letting user know", async () => {
      fetchMock.getOnce(url, { status: 418 });
      await searchUserThunk(mockDispatch);
      await expect(mockDispatch).toHaveBeenCalledTimes(1);
      await expect(mockDispatch).toHaveBeenCalledWith({
        type: SET_ALERT_MESSAGE,
        payload: "Unable to find user",
      });
    });
  });

  describe("found user", () => {
    it("should dispatch actions to set searched user", async () => {
      let mockData = { user: "some user" };
      fetchMock.getOnce(url, mockData);
      await searchUserThunk(mockDispatch);
      await expect(mockDispatch).toHaveBeenCalledTimes(2);
      await expect(mockDispatch).toHaveBeenNthCalledWith(
        1,
        showThisUser(mockData)
      );
      await expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        changePageTo(DISPLAY_USER)
      );
    });
  });
});

describe("uploadTimeToLeaderboard", () => {
  function mockStoreGenerator(
    currentUser,
    mastermindCode,
    time,
    gameDifficulty
  ) {
    return () => {
      return {
        currentUser,
        mastermindCode,
        time,
        gameDifficulty,
      };
    };
  }
  function mockUserGenerator(id, name) {
    return { _id: id, name };
  }
  function mockCodeGen(...args) {
    return [...args];
  }

  function mockDiffGen(name) {
    return { name };
  }
  let feedbackCallback;
  let mockDispatch;
  let uploadTimeThunk;
  let mockUser = mockUserGenerator("8fd98sdufd", "paul");
  let mockCode = mockCodeGen(1, 2, 3, 4, 5);
  let historyUrl = `http://localhost:3001/api/userhistory/add`;
  let leaderUrl = `http://localhost:3001/api/leaderboard/`;

  beforeEach(() => {
    feedbackCallback = jest.fn();
    mockDispatch = jest.fn();
    fetchMock.reset();
    uploadTimeThunk = uploadTimeToLeaderboard(feedbackCallback);
  });

  describe("was custom difficulty", () => {
    let mockStore = mockStoreGenerator(
      mockUser,
      mockCode,
      0,
      mockDiffGen("custom")
    );
    it("should not dispatch, should call feedback", async () => {
      await uploadTimeThunk(mockDispatch, mockStore);
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(feedbackCallback).toHaveBeenCalledWith(
        "Unable to save custom difficulty"
      );
    });
  });

  describe("is not custom difficulty", () => {
    let mockStore = mockStoreGenerator(
      mockUser,
      mockCode,
      0,
      mockDiffGen("easy")
    );
    it("should upload code to leaderboard and userHistory", async () => {
      fetchMock.putOnce(historyUrl, 200);
      fetchMock.postOnce(leaderUrl, 200);
      await uploadTimeThunk(mockDispatch, mockStore);
      await expect(mockDispatch).toHaveBeenCalledTimes(1);
      let [historyMock, leaderMock] = fetchMock.calls();
      await expect(historyMock[1]).toEqual({
        body: JSON.stringify({
          _id: mockUser._id,
          code: mockCode,
          time: 0,
          difficulty: "easy",
        }),
        headers: { "Content-Type": "application/json" },
        method: "put",
      });
      await expect(leaderMock[1]).toEqual({
        body: JSON.stringify({
          user: mockUser,
          code: mockCode,
          time: 0,
          difficulty: "easy",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
      });
    });
  });
});
