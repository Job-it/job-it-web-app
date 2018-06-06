var url = require('url');
var passport = require('passport')
var GitHubStrategy = require('passport-github2').Strategy;
var userFunctions = require('../models/usersModel');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: '00aea1a71c55ac88e905',
  clientSecret: '207114035db74e96091b3afae0d2a77ab76f24a3',
  callbackURL: "http://localhost:9000/auth/github/callback"
}, 
  function(accessToken, refreshToken, profile, done) {
    userFunctions.saveGitHubUser(profile, (err, user) => {
      return done(err, user);
    });
}));

module.exports = passport;