var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors')
const Config = require('config')
const passport = require('passport')


const AwsDB = require('./app/AwsDB')

const dbOptions = {
  apiVersion: Config.AWSDB.apiVersion,
  region: Config.AWSDB.region,
  endpoint: Config.AWSDB.endpoint,
  accessKeyId: Config.AWSDB.accessKeyId,
  secretAccessKey: Config.AWSDB.secretAccessKey,
}
AwsDB.setOptions(dbOptions)


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors())

// routes
app.use('/api/v1/clients', 
  passport.authenticate('jwt', {session: false}),
  require('./routes/api.v1.clients.js'))

app.use('/auth', require('./routes/auth.js'))


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

require('./app/passport.js')(passport)

module.exports = { app, server };
