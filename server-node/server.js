// load .env data into process.env
require('dotenv').config();

const { getChatHistoryFromDatabase, postMessageToDB } = require('./db/queries/messages');


// Web server config
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

// socket.io config
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000"
  }
});


// Load the logger first so all (static) HTTP requests are logged to STDOUT
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const GPTFunction = async (text) => {
  const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.6,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
  });
  return response.data.choices[0].text;
};

// Separated Routes for each Resource
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const profilesRoutes = require('./routes/profiles'); // Require the profiles routes
const industriesRoutes = require('./routes/industries');
const profilesByIndustriesRoutes = require('./routes/profiles-by-industries');
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
app.use('/api/connect', connectRoutes);
app.use('/api/pass', passRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/matchList', matchList);
app.use('/api/matchRating', matchRating);
app.use('/api/resume/create', resumeCreate);
// socket.io

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
