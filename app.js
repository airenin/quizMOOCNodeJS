var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('miQuiz2015'));
app.use(session({
  secret: 'miQuiz2015',
  resave: false,
  saveUninitialized: true
}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    // Save path in session.redir to have it after login
    if (!req.path.match(/\/login|\/logout/)) {
      console.log('Guardamos la ruta actual para redirecciones futuras: ' + req.path);
      req.session.redir = req.path;
    }
    // Make visible req.session
    res.locals.session = req.session;
    // Check if app must logout
    if (req.session.user) {
      var maxTimeWithoutReq = 2*60;
      var now = new Date().getTime();
      console.log('Now: ' + now);
      console.log('LastReqTime: ' + req.session.lastReqTime);
      if (!req.session.lastReqTime) {
        console.log('Fijamos el valor de req.session.lastReqTime')
        req.session.lastReqTime = now;
      }
      var dif = (now - req.session.lastReqTime) /1000;
      console.log('Han pasado ' + dif + ' s');
      if (dif > maxTimeWithoutReq) {
        console.log('Ha pasado demasiado tiempo, eliminamos el usuario');
        delete req.session.lastReqTime;
        delete req.session.user;
      } else {
        console.log('Actualizamos lastReqTime');
        req.session.lastReqTime = now;
      }
    }
    next();
});

app.use('/', routes);

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
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;
