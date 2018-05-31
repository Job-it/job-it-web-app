var opportunitiesModels = require('../models/opportunitiesModel.js');
var url = require('url');

module.exports = {
  get: (req, res) => {
    opportunitiesModels.getOpps(req.query).then((results) => {
      res.status(200).send(results);
    });
  },

  post: (req, res) => {
    opportunitiesModels.saveOpp(req.body, (err, obj) => {
      res.send(200, 'Serving post @ opportunities');
    })
  },

  patch: (req, res) => {
    params = {userFK: req.body.userFK, _id: req.body.oppId};
    updateObj = req.body.updateObj;
    opportunitiesModels.updateOpp(params, updateObj).then((data) => {
      res.send(200, 'Serving patch @ opportunities');
    })
  },

  delete: (req, res) => {
    params = {"_id": req.query._id};
    opportunitiesModels.deleteOpp(params).then((data) => {
      res.send(200, 'Serving delete @ opportunities');
    });
  }
}