// load .env data into process.env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { getChatHistoryFromDatabase, postMessageToDB } = require('./db/queries/messages');


// Web server config
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.SERVER_PORT;
const app = express();

// socket.io config
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
      origin: process.env.FRONT_END_URL,
  }
});


// Load the logger first so all (static) HTTP requests are logged to STDOUT
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Separated Routes for each Resource
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const profilesRoutes = require('./routes/profiles'); // Require the profiles routes
const industriesRoutes = require('./routes/industries');
const profilesByIndustriesRoutes = require('./routes/profiles-by-industries');
const checkMatch = require('./routes/checkMatch');
const connectRoutes = require('./routes/connect');
const passRoutes = require('./routes/pass');
const matchRoutes = require('./routes/match');
const matchList = require('./routes/matchList');
const matchRating = require('./routes/matchRating');
const resumeCreate = require('./routes/resume-create');

// Mount all resource routes
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/api/profiles', profilesRoutes); // Mount the profiles routes
app.use('/api/industries', industriesRoutes);
app.use('/api/profiles-by-industries', profilesByIndustriesRoutes);
app.use('/api/checkMatch', checkMatch)
app.use('/api/connect', connectRoutes);
app.use('/api/pass', passRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/matchList', matchList);
app.use('/api/matchRating', matchRating);
app.use('/api/resume/create', resumeCreate);
// // socket.io

io.on('connection', (socket) => {
  console.log('a user connected');

  // socket.emit('system', 'Welcome to the chat!');

  // Handle the get_chat_history event from the client
  socket.on('get_chat_history', async (matchId, callback) => {
    try {
      const chatHistory = await getChatHistoryFromDatabase(matchId);
      console.log("chatHistory: ", chatHistory);
      callback(chatHistory);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      callback([]); // Empty array or error handling response
    }
  });

  // handle incoming messages from client and store in db
  socket.on('chat message', (msg) => {
    console.log('msg: ' + msg);
    postMessageToDB(msg);

    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


