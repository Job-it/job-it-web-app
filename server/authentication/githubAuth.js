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
  clientID: 'e1997d26a3c54cfdd006',
  clientSecret: '44219d8f6d8816611cbfa81024846de448e6bbbc',
  callbackURL: "http://127.0.0.1:9000/auth/github/callback"
}, 
  function(accessToken, refreshToken, profile, done) {
    userFunctions.saveGitHubUser(profile, (err, user) => {
      return done(err, user);
    });
}));

module.exports = passport;