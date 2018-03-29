const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./api/routes');


let user = 'shopping';
let pass = 'shopping';
let uri = 'ds123399.mlab.com:23399';
let db = 'shoppingcart'

mongoose.connect(
  `mongodb://${user}:${pass}@${uri}/${db}?useMongoClient=true`,  function (err, db) {
    if (err) {
      console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
      console.log('Connected to Server successfully!');
    }
  }
)

// mongoose patch for warning
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add headers CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use('/api', routes);

// Error handling 4xxx
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handle 5xx
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;