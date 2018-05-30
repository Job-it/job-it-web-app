var express = require('express');
var parser = require('body-parser');

const util = require('./utilities.js');
const db = require('../db/index.js');

var app = express();

// attach plugins
app.use(util.requestLogger);
app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());
app.use(parser.urlencoded())

var port = process.env.PORT || 9000; 

// listen for requests
app.listen(port, () => {
console.log(`Listening on port ${port}`);
});