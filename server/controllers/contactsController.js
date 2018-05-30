var contactsModels = require('../models/contactsModel.js');
var url = require('url');

module.exports = {
  get: (req, res) => {
    res.send(200, req.body);
    //link this to the model here
  },

  post: (req, res) => {
    res.send(200, req.body);
    //link this to the model here
  },

  patch: (req, res) => {
    res.send(200, req.body);
    //link this to the model here
  },

  delete: (req, res) => {
    res.send(200, req.body);
    //link this to the model here
  },
}