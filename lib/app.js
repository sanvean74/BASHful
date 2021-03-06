const express = require('express');
const app = express();
// Load model plugins
require('./models/register-plugins');

// MIDDLEWARE
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
const ensureAuth = require('./middleware/ensure-auth');
app.use(morgan('dev'));
app.use(checkConnection);
// Body Parser
app.use(express.json());

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

// API ROUTES
const auth = require('./routes/auth');
const answers = require('./routes/answers');
const users = require('./routes/users');
const matches = require('../lib/routes/matches');
const results = require('../lib/routes/results');
app.use('/api/auth', auth);
app.use('/api/answers', ensureAuth(), answers);
app.use('/api/users', users);
app.use('/api/matches', matches);
app.use('/api/results', results);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);
// using express default 404 for non-api routes

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;