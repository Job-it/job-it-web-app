var url = require('url');
var passport = require('passport');

var authMiddleware = function (req, res, next) {
  //append the user object to the header so the client knows that it is authenticated
  res.append('user', JSON.stringify(req.user));
  if (req.path === '/auth/github' || req.path === '/auth/github/callback') {
    return next();
  } else if (req.user) {
    return next();
  } else {
    next();
  }
}

module.exports = authMiddleware;