var opportunitiesModels = require('../models/opportunitiesModel.js');
var url = require('url');

module.exports = {
  get: (req, res) => {
    req.query.userId = req.session.passport.user.githubId;
    opportunitiesModels.getOpps(req.query).then((results) => {
      res.status(200).send(results);
    });
  },

  post: (req, res) => {
    req.body.id = req.session.passport.user.githubId;
    opportunitiesModels.saveOpp(req.body, (err, obj) => {
      res.send(200, 'Serving post @ opportunities');
    })
  },

  patch: (req, res) => {
    // console.log('INSIDE CONTROLLER PATCH:', req.body);
    params = {userFK: req.body.userFK, _id: req.body.updateObj._id};
    updateObj = req.body.updateObj;
    // console.log('This is params:', params);
    // console.log('This is updateObj', updateObj);
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

 // { userFK: '5b1088929fc9d8133a85607b',
 //  updateObj: { isArchived: true } 
 // }

 //  params = {
 //    userFK: req.body.userFK, 
 //    _id: req.body.updateObj._id
 //  };

 //  updateObj = req.body.updateObj;