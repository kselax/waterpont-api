var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors')

const fs = require('fs')

const AwsDB = require('./app/AwsDB')
const dbOptions = {
  apiVersion: '2012-08-10',
  region: "us-east-1",
  // endpoint: "https://dynamodb.us-east-1.amazonaws.com",
  // accessKeyId: "your-key-id",
  // secretAccessKey: "your-access-key"
  endpoint: "https://dynamodb.us-east-1.amazonaws.com",
  accessKeyId: "your-key-id",
  secretAccessKey: "your-access-key",
}
AwsDB.setOptions(dbOptions)

// console.log('AwsDB = ', AwsDB.dynamodb);
// console.log('AwsDB = ', AwsDB.docClient);





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

// app.use('/', require('./routes/api.v1.users.js'))
// app.use('/', require('./routes/api.v1.devices.js'))
app.use('/', require('./routes/api.v1.clients.js'))




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = require('http').Server(app)

module.exports = { app, server };
