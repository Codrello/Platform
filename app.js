const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

const app = express();

// Validators
const flash = require("connect-flash");
const expressValidator = require("express-validator");
const session = require("express-session");
const expressMessage = require("express-messages");



// Express-messages
app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = expressMessage(req, res);
    next();
});

// Express_Sessions 
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
require('./passport/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

// Express_Validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      let namespace = param.split('.'),
          root = namespace.shift(),
          formParam = root

      while (namespace.length) {
          formParam += '[' + namespace.shift() + ']';
      }
      return {
          param: formParam,
          msg: msg,
          value: value
      }
  }
}));



// MongoDb Setup
mongoose.connect("mongodb+srv://SVEN:CODER9121@cluster0.e0k4a.mongodb.net/Platform");
const db = mongoose.connection;
db.on("open", () => {
  console.log("MongoDb ga Online Ulandik")
})
db.on("error", (err) => {
  console.log("MongoDb da qayerdadir xatolik yuz berdi" + err)
})

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/admin', adminRouter);

// Admin settings
app.use("/admin", express.static(path.join(__dirname, 'public')));
app.use("/admin/:any", express.static(path.join(__dirname, 'public')));

//Passport
//User  INIT 
app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.admin = req.user || null;
  next()
})

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
