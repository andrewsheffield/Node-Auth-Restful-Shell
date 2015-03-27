var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var lessMiddleware = require('less-middleware');
var passport = require('passport');
var passportLocal = require('passport-local');
var expressSession = require('express-session');
var passportHttp = require('passport-http');
var bcrypt = require('bcrypt');
var flash = require('connect-flash');

var routes = require('./routes/index');

//require MongoDB with Mongoose
var mongoose = require('mongoose');

var app = express();

//Get all models in models folder
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession( {
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false 
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//Start MongoDB Connection
mongoose.connect('mongodb://ajsheffield:Midgees1@ds053438.mongolab.com:53438/heroku_app34579795');
console.log("Connection to MongoDB Started");

function verifyCred(username, password, done) {

  mongoose.model('users').findOne({ 'username': username }, function(err, user) {



    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user);
      }
    } else {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
  });

  
}

passport.use(new passportLocal.Strategy(verifyCred));

passport.use(new passportHttp.BasicStrategy(verifyCred));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  //query db
  mongoose.model('users').findOne({ _id: id}, function(err, user) {
    done(null, user);
  });
  
})



app.use('/', routes);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//########################### error handlers

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
