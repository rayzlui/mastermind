# Mastermind

A modern way to play the classic board game, with player vs player and tournament capablities. Connect with other Masterminders. See whose's really the master of Mastermind!

---

## Technologies 

This app is build using the following:

- Node.js Javascript runtime environment

- Frontend
  - HTML
  - CSS
  - Javascript
    - Libraries:
      - React
      - Redux
      - TailwindCSS
      - Vechai UI

- Backend
  - Javascript
    - Libraries: 
      - Express
      - Mongoose
  - MongoDB

---

## Installation

This app will need Node.js version 17.0.1 to run. Please download Node.js from here if you need it:

https://nodejs.org/en/download/

First thing is you have to clone the app! You can do that by typing the following in your command line:

  `git clone https://github.com/rayzlui/Mastermind.git`

Once you have it locally, enter the repository from the command line and type:

  `npm install`

or alternatively if you prefer yarn:

  `yarn install`

Once that is complete, also in the command line type:

  `npm start` 

or:

  `yarn start`

and it should load up and run on your preferred web browser. You are ready to play single player mode!

The app is playable without the backend, however, if you would like to "play online", you will need MongoDB version 4.0.3. Please download it from here if you need it: 

https://www.mongodb.com/try/download/community

To run the backend, start MongoDB by typing in your command line type:

  `mongod`

Then in another terminal, while in this project directory, type: 

  `cd src/backend`
  `node server`

And now you're able to "play online".

---

## How To Play

This game is meant to be played on your computers web browser. At the time of writing this README, the game is best played on a full browser screen or at least 1100px x 750px. 

The app will start defaultly in game mode.


### Game Options

The app will start defaultly with Single Player selected. You have the option of selecting additional playing modes such as One on One or Tournament. Note: Only Single Player will work without the backend. 


#### Single Player Mode

In Single Player mode you will play against the clock and have 10 turns. 

#### One on One Mode

In One on One mode you will play against the clock, have 10 turns and one other player. First person to guess the code wins. It is possible no one wins.

#### Tournament Mode 

In Tournament mode you will play against the clock, have 10 turns and more than one player. First person to guess the code wins. It is possible no one wins.


### Game Difficulties

When you select a game type (i.e Single Player, One on One or Tournament), a list of difficulities will appear. Note: Custom difficulty appears only for Single Player. Clicking a difficulty will start the game, except for custom which will open two ranges for the user to select their difficulty. 

#### Easy Mode

The code length is 4 and there are max 4 options for digits.

#### Normal Mode

The classic, the code length is 4, there are max 7 options for digits.

#### Hard Mode

The code length is 7 and there are max 9 options for digits.

#### Custom Mode

Your choice. 


### Game Page

After selecting the game difficulty you will be taken to the game page.

#### Move History

On the left side of the page will be a table with your move history. This is where your previous moves are stored. As a callback to the original Mastermind board game, where they used red pegs and white pegs to denote your code feedback, RED represents the amount of numbers in your guessed code you got correct and in the right index, while WHITE represents the amount of numbers you got correct, but in the wrong index.


#### Relavent Game Info

On the right side of your page shows your turns remaining, time remaining and hints remaining.


## Game Play

In the middle of the game page is the game.

For clarity, when guess code button is referenced below, it means the code you are trying to guess. It will be shown with 'fill' at start of each round and will change according to what code you are trying to construct to use as your guess. 

Input buttons are the buttons that will have numbers on them at all times. These are the button you may use to enter your guess code.

### How To Make Your Guess

To select your code you may either use the numbers 1 - 9 on your keypad or use the number input buttons on the screen. 

The numbers will be placed into your guess code in sequential order. 

Alternatively, you may also click on any of the guess code buttons and place a number directly in that index, whether or not it has an input. You may use both the keyboard and input buttons to enter a number into the selected index. If you continue to add numbers after doing this, they will be placed in the first index without an input.

Additionally, when you click on a guess code button, it will allow the hint button to appear. The hint button will remove 1/3 of the incorrect number input options for that index.


Once you fill out your code, you may click the submit button to see if your code is correct. The submit button will not work if your code isn't the proper length.

### What Happens Next?

That's it. You keep guessing until the time runs out, your turns run out or you get the code correct.

When the game complete, a page will appear showing if you've won or lost and in additon, will give you an option to play again. If you had won the game, there will also be an option to upload your time and code to the leaderboard.



---

## Development Process

### Initial Thoughts


#### Understanding The Game

A Mastermind game has 5 stages:
  
1. The secret code is set
2. The user inputs their guess
3. The guess gets checked
4. Repeat 2 and 3 if guess is incorrect and turns remain
5. Gameover (win or loss)

#### Goals

For this project I wanted to try something that I haven't before. I wanted to add a true player vs player capability which could be played by two or more people online simultaneously.


#### Conclusion

I wanted accomplish the following with the project: 

- Create a Mastermind game
- Add player vs player capability

### Planning


#### Choosing The Tech. 

I decided to use Javascript on this project because it's the language I am most familiar with. 

Since I'm using Javascript and this project needed a way for a user to interact with it, I decided to use the React library for constructing the user interface. I also decided to use the Redux library for state management, because it would make adding extensions easier down the road. Using Redux would also help keep my project in a Model-View-Controller architecture, and keep seperation of concerns.

For the backend I chose to use Express.js, Mongoose.js and MongoDB because they are the techs I have some familarity with.

#### Organization

My plan on building out the project would be in this order:

1. Build a Mastermind game that met the required parameters
2. Add extensions that would make the game more interesting
  - Hints
  - Timer
3. Build the backend for player vs player
4. Style 
5. Testing

### Building the Mastermind Game

I used Redux to store the state of the game. It holds each as its own reducer/state: 
- the Mastermind code
  - obtained using Javascript's fetch API
  - stored as a combo array and hash
- how many turns are remaining
- user's previous moves
- if the game was over

I used React to build the user interface. I created components that would:
- show the user their current guess
  - I stored the user guess as an array in the local state of the component
  - I used buttons to display the user's guess, so they could click directly on an index to enter a number directly
- options for the user to select their guess
- show the user their previous moves and turns remaining
- let the user know if the game was over


I created action functions that would change the state depending on the user's interaction:
- check if the user's code was correct
  - provide feedback if it's incorrect
- store user's move and feedback
- deduct a turn

I linked the action functions into a submit button on the user interface that would run when a user submitted their guess.

I created helper functions that would:
- compare user's code with mastermind code and return feedback for the guess 
- add/delete numbers from user guess and store it in the user guess component state
- call the Random API and process the numbers into the data structure I wanted it and store it in Redux

I placed all the components into a container component and added some logic into the container component that would render the game components or the gameover component.

I created an event handler for the container to listen for number keyboard inputs, so the user could use the numberpad on their keyboard to enter the code as well.

For additional information on the logic behind the check function, why I stored the mastermind code as combo array and hash, and the reasoning behind using buttons as the user interface see:

  https://github.com/rayzlui/new_mastermind#creating-the-check-function
  https://github.com/rayzlui/new_mastermind#structuring-the-mastermind-code
  https://github.com/rayzlui/new_mastermind#2-setting-up-working-skeleton 


### Adding Extensions

My intention was to use the same Mastermind for both single player and multiplayer modes, so I added simple extensions that would work for both modes.


#### Custom Difficulty

I created the ability for users in Single Player mode to select their own difficulty.

It was accomplished by:

- adding creating a component that held inputs and input ranges for the code length and maximum kinds of digits
- refactored the helper function that would call the Random API and allow it to receive parameters for the requests
- tied a submit button to the helper function from the component and pass the custom difficulty inputs

#### Countdown Timer

I created a timer component that would end the game if it ran down to zero or store the time if the user won. 

It was accomplished by:

- Creating a visual component with React that held the time in local state and a setInterval that deducted a second every second
- An end game event action that would trigger when the time ran out and inform the Redux state
- A set time action that would trigger when informed by the Redux state that the user had won the game and let the Redux state know what the time was

#### Hints

I created a hint component that would remove one-third of the possible options for the user to guess at a specific index

It was accomplished by:

- Adding a hint button that would appear only when a user selected an index
- Adding additional logic to the user input component that would remove one-third of the options when hint is active
- Adding a new reducer in the Redux state that would govern how many hints are remaining

## Building Online Mode

I wanted to construct a way for two users to play against each other simulataneously. To do so I would need to build a server and have a database.

### Initial Thoughts

I decided to keep it simple in online mode. 

There would be two online modes, a one on one and a tournament mode.

The one on one would be between two players, tournament mode would be more than 2.

Users would all have the same Mastermind code to guess.

It would rank the users based on the time they finished. The first person to finish would be first, second would be second etc. 

The users would still have a timer and number of turns. If there's no timer, some games might never technically end, and if there's no number of turns, it would come down to whoever spams guesses faster. It, therefore, is technically would be possible for there to be no winners in an online mode game.

Users would be able to select what difficulty they wanted for online mode




### Planning

I would need a database to store games and a server to create/update/delete games.

#### Technologies

I decided to use MongoDB as my database because it's ease of use and I had some familiarity with it. I decided on Mongoose.js to use to communicate with it for the same reasons. 

I did some research on what would be the best way to send and receive game info for users. Websockets looked like a great choice, as it would allow the server to automatically send data to the user each time the database is updated, but my current understanding if it is incomplete. I decided to proceed with HTTP and choose Express.js to script my server as it's again, what I'm most familiar with.

#### Organization

Users will have to create an account to play online, to prevent possible naming clashes. (I considered just having players play anonymously as player1, player2 etc, and generating an id token from the front end for them, but it could lead to confusion of which player they are.) This will also give each user an user._id for tracking in games.

Each online game would need the following info:
- Players
  - Number of moves they've made
  - If they've completed the game
  - The time which they won the game
- Mastermind Code
- The number of players where the game has ended

The server will have two queue objects. One queue will be for One on One, the other queue for Tournament.

The queue objects will have three different difficulties in them, one for easy, normal, and hard. 

The server will place users in the queue for the game they request and create games when conditions are met.

Once a game is created, it will send the game data to the users. Theoretically, every player should start the game at the same time, but having a local timer should give every player the same amount of time.

Each time a user submits a guess, it would call the server with an HTTP PUT call and update their game. They will also receive the updated game data in the same call. 

Once a player finishes, either guessed the code, ran out of time or turns, it will log in the game data. Once every player has completed the game, the game should delete it self.


### Setup Database

The database is built with MongoDB and Mongoose.js to communicate it on Node.js.

There are two models necessary for the game, a User model and a PvP (Game) model.

The User model will store the user's info. It stores their name, the dateJoined and their passwordHash and a key to unhash the password. I later would add a gameHistory as an additional extensions for the backend. The User model was created for each user to have an unique id for the PvP model.

Note: The passwordHash and key are not very secure. I just did not think it would be a good practice to send someones password over the internet.

The PvP model will store the players, the Mastermind code and number of players who finished for each game. 

The players Schema type of the PvP model is stored as a Javascript object/hashmap, with each player's user id as the key. This design was to make it easy to search and update each player's game data. Each player value is also a Javascript object/hashmap, that stores their moves made, if they've completed the game and the time, (if they won), they won at. This determine the placement ranking of the players.



### Setup Server

#### User API

##### Create User API

The an endpoint `/api/user/create` listens for a HTTP POST action and will expect a request with a body containing a username, password and key. It will verify there is a username and a password passed. If they are missing, it will respond with 404 and message letting user know they need to provide those required information.

It then search for an instance of the username in the UserModel. 

If found, it will respond with a 418 and message letting user know the username is taken. 
If not found, it create a new UserModel instance with data passed from request body and respond with the new UserModel instance.

##### Request Key API

The endpount `/api/getKey/login/:username` listens for a HTTP GET action. It expects a username in its params. It will search UserModel for an instance and if found, will respond with the UserModel instances key value. This is intended for login situations for the user.

##### Login User API

The endpoint `/api/user/login` listens for a HTTP POST action. It expects username and password in its request body. It will search for an instance of the UserModel with the username. If not found, it will respond with error code 418 and message to create an account. 

If found, it will compare password of the instance and password passed. If true, it will respond with the UserModel instance. If false, it will respond with code 403 and message username and password combo not found.

Note: The passwords sent to the Login User API and the one stored on the User Model instance will not be the password entered by the user. It will be modified by a scrambleString helper function on the frontend that uses the key passed from requestKey API.

#### Game API

##### Create Games API

The server has two objects on it, one of the OneOnOneQueue class and one of TournamentQueue class. These objects will store the queues for each online mode type based on the user's selected difficulty.

There is a createMatch helper function that receives players and difficulties and creates a new PvPModel instance and saves it. There are additional helper functions that create player infos for each PvPModel player Schema.

There are two game request endpoints.

The end point `/api/game/pvp/:difficulty/:name/:id` listens for a HTTP GET action and will expect the a difficulty selection, the user's name and the user's userid as it's params. It will place the caller's id and user name into the OneOnOneQueue object instance based on the difficulty passed. 

It was then check if the queue they were placed in has at least two players. If there is less than two players in the queue, the server will return an event listener with their user name. The event listener will return a response to the user when it receives it's trigger. 

If there are more than two players in the queue, the endpoint will remove the first two players from the queue and pass the players into a createMatch that will create a match for the players. It was also trigger the event listener with the first player removed from the queue and send the game data to both players. The game data will be the PvPModel instance created with the two players info and new Mastermind Code.

The endpoint `/api/game/tournament/:difficulty/:name/:id` listens for a HTTP GET action and will expect the a difficulty selection, the user's name and the user's userid as it's params. It will place the caller's id and user name into the TournamentQueue object instance based on the difficulty passed. It will return an event listener that listens for a tournament to start. When the listener is called it will respond with the PvPModel instance that is passed through.

There is a setInterval on the server that will trigger a TournamentMatchMaker helper function every 10 seconds. The TournamentMatchMaker will check each difficulty in the TournamentQueue object instance and if the conditions are met for each queue, pass all the players in the difficulty queue to the createMatch helper function to create a match. It will then reset the queue and emit a event action to trigger the tournament start listerns. 

##### Update Games API

The server has an end point `/api/game/:gameid` listens for a HTTP PUT action and will expect gameid in params and a userid, time and isWinner boolean in the request body. The end point is going update a game in database based on the gameid passed. 

It will search for the game from the PvPModel database and if found, will search for the players ID in the game data returned. 

It will add one to the moves value for the user id passed in the players portion of the PvPModel instance.

  Code looks like `PvPModelInstance.userid.moves + 1` 

It will check if the isWinner passed in request boolean is true, false or null. If isWinner is null, it means the game is still being played and it will return a response with the updated PvPModel. 

If it is false, the player has lost and will add one to the PvPModel instance's numCompletedGames and set the player's isWinner value to false on the PvPModel instance. If it is true, it will set the player's isWinner value to true on the PvPModel instance and set the time on the instance equal to the time that was sent in the request body. This will mark the time it took for the winning player to win the game.

  Code looks like `PvpModelInstance.userid.times = request.body.time`

If isWinner is true or false, the endpoint will also check if the PvPModel instance's numCompletedGames is equal to the PvPModel instance's numOfPlayers. If they are equal, that means all players have completed their games, win or lose, and will then delete the instance. 

#### Backend Extensions

##### Leaderboard API + Database

To make games more interesting for single players, I created a leaderboard for the winning single players to upload their time at completiton. There is a leaderboard for each difficulty except custom.

I created a Leaderboard Model for the database and two endpoints in the server. 

The endpoint `/api/leaderboard/` listens for a HTTP POST action. It expects user, time, code and difficulty in its request body. It creates a new Leaderboard Model instance with the request body info and saves it.

The endpoint `/api/leaderboard/` listens for a HTTP GET post. It expects nothing to be passed. It will get all Leaderboard Model instance, sort split them into three arrays based on the difficulty and sort it based on the highest time in the instance. It will respond with a object that contains the three arrays.

##### Additional User API

Since the UserModel existed I decided to add a way for user to search other users.

The endpoint `/api/users/:name` listens for a HTTP GET action. It expects a username in it's params. It will search the UserModel for an instance with the username. If found, will respond with the username, gameHistory and dateJoined from the instance. If not found, it will respond with 404 with message not found.

I also decided to add a gameHistory to the UserModel. It will allow users to save their winning game times. It's almost like a badges type situation.

The endpoint `api/userhistory/add/:id` listens for a HTTP PUT action. It expects a userid in it's params and code, time and difficulty in the request body. It will search for the UserModel instance with userid. If found, it will add the code, time and difficulty into the gameHistory of the instance. If not found, it will respond with 404.


### Handling the Backend from the Front

The Mastermind game was developed to be able to work in single player mode or multiplayer without much refactoring.

I created the following user interface components to correspond with their backend:
- a Login/Create User component that would allow users to login or create an account
- a ViewLeaderboard component that would display the leaderboard
  - it also calls the Leaderboard API directly
- a Search User Input component that would let users input a username to search for
- a Searched User component that would display the user searched
- a User Page component that would show the details of the current logged in user
- a PvP info component that showed the game data for all the players in  One on One match or Tournament mach

I added the following into existing components:
- into the WinnerPage I added a button for the user to upload their game to their history 

I created the following reducers/states to correspond with their backend:
- pvpData stores the data received from the Game APIs
- currentUser stores the data received from the User APIs logging in and creating user
- searchedUser stores the data received from the User APIs search user

I created the following actions to communicate with the backend:
- request game action that called the Create Game APIs endpoints (both One on One and Tournament)
- update game action that called the Update Game API
- search user action that called the User API for searching
- logging and create user action that called the User API for logging in or searching
- upload game history action that called the User API for adding to user's game history and Leaderboard API for uploading times

Since the app was no longer just a game, I added an additional reducer/state that would govern what is being displayed by the app. 

I also created a nav bar to allow users to change between playing game, searching users and viewing leaderboard.


### Styling

I know you're probably thinking, what style? I tried lol.

I used the TailwindCSS library because of it's ease of use for styling. It allows you to style components directly by defining what the style is in the class name. It helps maintain consistency in styling and prevented class name clashes.

I used the VechaiUI library, which was built on top of TailWindCSS for simple components to maintain consistency throughout the app.

I created additional visual components for error popups and confirmation dialogs.


### Testing

I tested the essential functions for playing the Mastermind game. The compareCode and generateCode functions are core the game working. The testing stragety was to make sure the compareCode produced the right feedback regardless of if numbers input. Edge cases were all same numbers in the Mastermind code and all different numbers. generateCode testing was 






# See Create React App info below

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
