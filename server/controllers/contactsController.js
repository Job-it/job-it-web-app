var contactsModels = require('../models/contactsModel.js');
var url = require('url');

module.exports = {
  get: (req, res) => {
    
    res.send(200, 'Serving get @ contacts!');
    //link this to the model here
  },

  post: (req, res) => {
    res.send(200, 'Serving post @ contacts');
    //link this to the model here
  },

  patch: (req, res) => {
    res.send(200, 'Serving patch @ contacts');
    //link this to the model here
  },

  delete: (req, res) => {
    res.send(200, 'Serving delete @ contacts');
    //link this to the model here
  },
}
