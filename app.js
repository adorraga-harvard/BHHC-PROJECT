var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stylus = require('stylus');

//mysql connection
var mysql      = require('mysql');
connection = mysql.createConnection({
    host     : 'ls-5e6fc95841e5202ff4fb3ab591711c19cddb8c60.cqojabfsfo8k.us-west-2.rds.amazonaws.com', //'az1-wss2.a2hosting.com',
    database : 'MakerTaker',
    user     : 'dbmasteruser',
    password : 'W<[LKyI=]AW4XyoswGB,o3XtL?((*I1I',
});

var indexRouter = require('./routes/index');
var quizRouter = require('./routes/quiz');
var testRouter = require('./routes/test');
var dataRouter = require('./routes/data');
alreadyConnected = false;
task = require('./routes/task');
quiz = require('./routes/quiz');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/data', dataRouter);
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

module.exports = app;
