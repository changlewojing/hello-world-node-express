var express = require('express');
var app = express();
var session  = require('express-session');

var passport = require('passport');

var GitHubStrategy = require('passport-github').Strategy;


app.use(session({
        secret: 'vidyapathaisalwaysrunning',
//        store: sessionStore,
        resave: true,
        saveUninitialized: true
 } )); // session secret



app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GitHubStrategy({
    clientID: 'a7ac72c1d8fb0a74f510',//GITHUB_CLIENT_ID,
    clientSecret: '71e3c8d52317a04fe5c532acaff9077b6b450cab',//GITHUB_CLIENT_SECRET,
    callbackURL: "http://daxumi.cn:3333/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //return cb(err, user);
	console.log(profile);
      return cb(null, {id:123555});
      //return cb(null, {name:'abcd'});
      //return cb(null, {passport: { user: 1 }});
    //});
  }
));


app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


// Routes
app.get('/', function(req, res) {
  res.send('Hello World!');
});

// Listen
var port = process.env.PORT || 3333;
app.listen(port);
console.log('Listening on localhost:'+ port);
