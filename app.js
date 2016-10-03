require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var handlebars = require('handlebars-form-helpers').register(hbs.handlebars);

var passport = require('./passport');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');


// const api = require('./api/index.js');

var app = express();

hbs.registerHelper('dotdotdot', function(str) {
  if (str.length > 400)
    return str.substring(0,400) + '...';
  return str;
});

hbs.registerHelper('shortDate', function(str) {
  var date = str;
  var shorten = date.toString().split(" ");
  return shorten[1]+ ' ' +shorten[2]+ ', ' +shorten[3];
});

hbs.registerHelper('alterDate', function(str) {
  var date = str;
  var shorten = date.toString().split(" ");
  var gmt = shorten[5].split("-");

  function switchDate(x) {
  switch(x) {
    case "Jan":
        text = '-01-';
        break;
    case "Feb":
        text = '-02-';
        break;
    case "Mar":
        text = '-03-';
        break;
    case "Apr":
        text = '-04-';
        break;
    case "May":
        text = '-05-';
        break;
    case "Jun":
        text = '-06-';
        break;
    case "Jul":
        text = '-07-';
        break;
    case "Aug":
        text = '-08-';
        break;
    case "Sep":
        text = '-09-';
        break;
    case "Oct":
        text = '-10-';
        break;
    case "Nov":
        text = '-11-';
        break;
    case "Dec":
        text = '-12-';
        break;
    default:
        text = "-09-";
  }
  return text;
}
  var month = switchDate(shorten[1]);
  var dropSeconds = shorten[4].toString().split(":"); //not being used
  var time = dropSeconds[0]+':'+dropSeconds[1]; //not being used
  var altered = shorten[3]+month+shorten[2]+'T'+shorten[4]+'-'+gmt[1];
  // var altered = shorten[3]+month+shorten[2]+'T'+time+'-'+gmt[1]; without seconds
  console.log(shorten[4]);
  return altered.concat();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: 'patriots',
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
