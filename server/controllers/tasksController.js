var tasksModels = require('../models/tasksModel.js');
var url = require('url');

module.exports = {
  get: (req, res) => {
    res.send(200, 'Serving get @ tasks');
    //link this to the model here
  },

  post: (req, res) => {
    res.send(200, 'Serving post @ tasks');
    //link this to the model here
  },

  patch: (req, res) => {
    res.send(200, 'Serving patch @ tasks');
    //link this to the model here
  },

  delete: (req, res) => {
    res.send(200, 'Serving delete @ tasks');
    //link this to the model here
  },
}