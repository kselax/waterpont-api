var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors())

// routes
app.use('/api/v1', require('./api/v1/index.js'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.json({ error: "404", message: "Not found" });
});

// error handler
app.use(function (err, req, res, next) {
  return res.json({ error: (err.code ? err.code : 500), message: err.message });
});

const server = require('http').Server(app)
module.exports = { app, server };