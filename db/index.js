


//this is where we connect to the server and export it to home.
var mongoose = require('mongoose');
var databasePath = process.env.DATABASE_PATH || 'mongodb://localhost/jobit';

mongoose.connect(databasePath);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // console.log('Connected to db.');
});

const Schema = mongoose.Schema; 

let usersSchema = new Schema({
    githubId: String,
    userName: String,
    firstName: String, 
    lastName: String
}); 

let opportunitiesSchema = new Schema({

	userFK: String,
	dateOpened: { type: Date, default: Date.now },
	dateClosed: Date,
  orgName: String,
  oppName: String,
	rank: String,
	status: String,
	type: String,
	isArchived: Boolean
}); 

let contactsSchema = new Schema({
    opportunityFK: String,
    firstName: String,
    lastName: String,
    lastContact: Date,
    notes: Array
});


let tasksSchema = new Schema({
	opportunityFK: String,
	content: String, 
	dueDate: Date,
	status: String,
	isArchived: Boolean
});


module.exports.usersSchema = usersSchema;
module.exports.opportunitiesSchema = opportunitiesSchema;
module.exports.contactsSchema = contactsSchema;
module.exports.tasksSchema = tasksSchema;

