let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

let flash = require('connect-flash');
let mongoose = require('mongoose');
let DB = require('./database');


mongoose.connect(process.env.URI || DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log("Connected to MongoDB...");
});



// define routers
let index = require('../routes/index.routes.js'); // top level routes
let post = require('../routes/posts.routes.js'); // routes for posts
let login = require('../routes/login.routes'); // routes for login

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /client
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '../../client')));

app.use(cors());
app.use(flash());

//auth
const passport = require("passport");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");

var jwt_obj = {
    secretOrKey: "sdfghj1k234567gbnm5vbnm",
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme("jwt")
}

var StrategyJWT = passportJWT.Strategy;
var strategy = new StrategyJWT(jwt_obj, function (jwt_payload, next) {
    console.log("payload: " + jwt_payload);
    if (jwt_payload)
        next(null, {
            userName: jwt_payload.userName,
            fullName: jwt_payload.fullName,
            role: jwt_payload.role
        });
    else{
        next(null, false);
    }
});

passport.use(strategy);
app.use(passport.initialize());

app.use(cors());
app.use(express.json());

let userController = require('../controllers/user');

app.get("/api", function (req, res) {
    res.json({ msg: "Hello" });
});

app.post("/api/login", function (req, res) {
  userController.checkUser(req.body).then((userObj) => {
        console.log("user: " + userObj);
        var payload = {
            "userName": userObj.userName,
            "fullName": userObj.fullName,
            "role": userObj.role
        }
        var token = jwt.sign(payload, jwt_obj.secretOrKey);

        res.json({ msg: "login successfully", token: token });
    }).catch((e) => {
        console.error("err: " + e);
        res.status(404).end();
    });
});

//auth

// route redirects
app.use('/', index);
app.use('/post', post);
app.use('/login', login);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log("err: "+err)
  console.log("err.message: "+err.message)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;