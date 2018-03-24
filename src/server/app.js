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
// app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, './../../')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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