var mongoose = require('mongoose');
var dbConnection = require('../../db/index.js')

var opportunity = mongoose.model('opportunity', dbConnection.opportunitiesSchema);

exports.saveOpp = (dataObj, callback) => {
  opportunity.create({
    userFK : '1234',
    dateOpened : dataObj.dateOpened,
    dateClosed : dataObj.dateClosed,
    oppName : dataObj.opportunityName,
    orgName : dataObj.organizationName,
    rank : dataObj.rank,
    status : dataObj.status,
    type : dataObj.type
  }, callback)
}

exports.getOpps = (dataObj = {userFK: '1234'}) => {
  return opportunity.find({userFK : dataObj.userFK})
}

exports.updateOpp = (dataObj, updateObj) => {
  return opportunity.findOneAndUpdate(params, updateObj)
}

	// userFK: String,
	// dateOpened: { type: Date, default: Date.now },
	// dateClosed: Date,
	// orgName: String,
	// rank: String,
	// status: String,
	// type: String