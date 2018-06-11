var authMiddleware = function (req, res, next) {
  //Auth middleware checks if the user is authenticated before every step
  //Auth middleware sends back a stringified version of the req.user field to the client
  //The client checks if req.user is undefined and redirects to the login (this info is also used to set the users name in the nav bar)
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