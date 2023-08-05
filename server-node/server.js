// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

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
const connectRoutes = require('./routes/connect');
const passRoutes = require('./routes/pass');
const matchRoutes = require('./routes/match');
const matchList = require('./routes/matchList');

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



// const corsOptions = {
//   origin: 'http://localhost:3000',
// };

// app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
