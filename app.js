var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser= require('body-parser');
var logger = require('morgan');
var session = require('cookie-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var mysql = require('mysql');
var httpsRedirect = require('express-https-redirect');

const conn = mysql.createPool({
  host: "localhost",
  user: "wissenaire_sudheer",
  password: "sudheer@wissenaire",
  database: "wissenaire_wissenaire21"
});

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret : "Our little Secret Here",
  resave : false,
  saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);

//passport oauth 
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user,done){
  done(null, user);
});

passport.deserializeUser(async function(user, done) {
  await done(null, user);
});
  
passport.use (new GoogleStrategy({
  clientID: '96689537530-jkk11ojp0i4r1ffq7q6u8idamsm59c9j.apps.googleusercontent.com',
  clientSecret: 'NtXKC_Ba8lAWJGuysBU3ADXm',
  callbackURL: "https://wissenaire.org/auth/google/callback",
  userProfileURL  : 'https://www.googleapis.com/oauth2/v3/userinfo'
},
function(accessToken, refreshToken, profile, done) {
process.nextTick(function() {
  console.log('process.nextick')
  console.log(profile)
  const qr = ("SELECT * from users where email ='" + profile.emails[0].value + "';");
  conn.query(qr, (err, rows) => {
    if (err) {
        throw err;
    }
    if (rows && rows.length === 0) {
      let sql = ("INSERT into users (googleid,photo,accesstoken,name,email) VALUES('" + profile.id + "','"+profile.photos[0].value+"', '" + accessToken + "','" + profile.displayName + "','" + profile.emails[0].value + "');");
      conn.query(sql, function(err, result) {
        if (err) {
            throw err;

        }
        console.log("google inserted");
      });
      
      return done(null, profile);

    } else {
      console.log("Already logged in");
      return done(null, profile);

    }
  });    
}) 
})
);

app.get('/auth/google', passport.authenticate('google', { prompt : 'consent', scope : ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/profile', failureRedirect: '/'}),
  function(req, res) {
    req.session.save(); 
    res.redirect('/profile')   
  }
);

app.get('/logout', (req, res) => {
  req.logout()
  // req.session.destroy();
  res.redirect('/')
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
