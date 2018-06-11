var express = require('express');
var parser = require('body-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const util = require('./utilities.js');
const db = require('../db/index.js');

// Get middleware
const authMiddleware = require('./authentication/authMiddleware.js')

// Get routers
const contactsRouter = require('./routes/contactsRouts');
const opportunitiesRouter = require('./routes/opportunitiesRouts');
const tasksRouter = require('./routes/tasksRouts.js');
const usersRouter = require('./routes/usersRouts.js');

// Get passport 
// NOTE: Passport is being required from gitHubAuth where it is being required using node
// and then configured
var passport = require('./authentication/githubAuth.js');
var app = express();

// attach middleware

// Logs out all requests types and data
app.use(util.requestLogger);
// Parse and JSON included in https requests
app.use(parser.json());
// Parse url encoded information
app.use(parser.urlencoded());
// Parse the body
app.use(bodyParser.urlencoded({extended : false}));
// Parse the cookies! This is used to enable session information and persist oauth
app.use(cookieParser());

// Sessions need to be established in order for oauth to work
// http://www.passportjs.org/
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(authMiddleware);

app.use(express.static(__dirname + '/../client/dist'));

//authentication
// Request authorization grant from github auth server
app.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}));
// Request oauth token on successful authorization grant
app.get('/auth/github/callback', passport.authenticate('github'), (req, res) => (res.redirect('/')));

// When a get request is sent to logout, destroy the session. The user is still logged in with the oauth provider
// (github in this case). If the user clicks 'sign in with github' they will be immediately authenticated and forwarded
// to the application homepage if they are still signed in to github. This is normal behaviour as evidenced by other oauth 
// authenticated sites.
app.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});

// Routes
app.use('/contacts', contactsRouter);
app.use('/opportunities', opportunitiesRouter);
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

//handle refresh
app.get('/dashboard*', (req,res) => {
  res.redirect('/');
});


var port = process.env.PORT || 9000; 

// listen for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});