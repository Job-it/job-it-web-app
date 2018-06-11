var url = require('url');
var passport = require('passport')
var GitHubStrategy = require('passport-github2').Strategy;
var userFunctions = require('../models/usersModel');
require('dotenv').config();

// Use passport npm module to authenticate with Github Oauth
// Passport takes a strategy which a predefined set of information / functionality encapsultated in an object
// See documentation for the inputs the strategy requires
// Once the strategy has been executed, the callback function saves the user to the DB

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new GitHubStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:9000/auth/github/callback"
}, 
  function(accessToken, refreshToken, profile, done) {
    userFunctions.saveGitHubUser(profile, (err, user) => {
      return done(err, user);
    });
}));

module.exports = passport;