var url = require('url');
var passport = require('passport');

var authMiddleware = function (req, res, next) {
  if (req.path === '/auth/github' || req.path === '/auth/github/callback') {
    return next();
  } else if (req.user) {
    return next();
  } else {
    res.redirect('/auth/github');
  }
}

module.exports = authMiddleware;