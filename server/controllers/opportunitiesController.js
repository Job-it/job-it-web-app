var opportunitiesModels = require('../models/opportunitiesModel.js');
var url = require('url');

module.exports = {
  get: (req, res) => {
    res.send(200, 'Serving get @ opportunities');
    //link this to the model here
  },

  post: (req, res) => {
    res.send(200, 'Serving post @ opportunities');
    //link this to the model here
  },

  patch: (req, res) => {
    res.send(200, 'Serving patch @ opportunities');
    //link this to the model here
  },

  delete: (req, res) => {
    res.send(200, 'Serving delete @ opportunities');
    //link this to the model here
  },
}