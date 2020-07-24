# A multiplayer Tic-Tac-Toe Game

## Usage
* Run `cp sample.env .env` to copy the contents of `sample.env` into a new file `.env`
* Run `npm install` to install all dependencies
* Run `npm start` to start the server on 
* Open browser window to indicated PORT on `localhost`


## Dependencies
* express
* socketio
* ejs
* mongoose

## How to play
### Join as player
* Open browser window on `http://localhost:5000` and input a username - if you're a new user, you will be automatically registered else you'll proceed with provious data.
* Click on reconnect so that the message says `waiting for user to join` and wait for a connection
### Join as spectator
* Open browser window to `http://localhost:5000` and watch the live game
