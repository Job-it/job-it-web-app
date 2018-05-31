var mongoose = require('mongoose');
var dbConnection = require('../../db/index.js')

var opportunity = mongoose.model('opportunity', dbConnection.opportunitiesSchema);

exports.saveOpp = (dataObj) => {
  return opportunity.create({
    userFK : '1234',
    dateOpened : dataObj.dateOpened,
    dateClosed : dataObj.dateClosed,
    oppName : dataObj.oppName,
    orgName : dataObj.orgName,
    rank : dataObj.rank,
    status : dataObj.status,
    type : dataObj.type
  })
}

exports.getOpps = (dataObj = {userFK: '1234'}) => {
  return opportunity.find({userFK : dataObj.userFK})
}

exports.updateOpp = (params, updateObj) => {
  return opportunity.findByIdAndUpdate(params, updateObj)
}

exports.removeOpp = (dataObj) => {
  return opportunity.findOneAndUpdate(params, updateObj)
}

// EXAMPLE USE OF SAVEOPP
exports.saveOpp({
  userFK : '1234',
  dateOpened : Date.now(),
  dateClosed : Date.now() + 100,
  orgName : 'Career Fair',
  oppName : 'Indeed',
  rank : '5',
  status : 'Negotiation',
  type : ''
});

// EXAMPLE USE OF GETOPPS
// exports.getOpps().then((data) => {
//   console.log(data);
// })

// EXAMPLE USE OF UPDATEOPP
// exports.updateOpp({_id: "5b10367ceb8284e436f46347"}, {orgName: "Starbucks"}).then((data) => {
//   console.log(data);
// });