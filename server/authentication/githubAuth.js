var url = require('url');
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: '00aea1a71c55ac88e905',
  clientSecret: '207114035db74e96091b3afae0d2a77ab76f24a3',
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
}, 
  function(accessToken, refreshToken, profile, cb){
    console.log(profile);
    cb(err, user);
}));

module.exports = passport;