//this is where we connect to the server and export it to home.
const mongoose = require('mongoose'); 
let db = mongoose.connect('mongodb://localhost/myapp'); 
const Schema = mongoose.Schema; 

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let usersSchema = new Schema({
	githubOAuth: String,
	firstName: String, 
	lastName: String

}); 

let opportunitiesSchema = new Schema({
	userFK: String, //referencing User.id
	dateOpened: { type: Date, default: Date.now },
	dateClosed: Date,
	opportunityName: String,
	orgName: String,
	rank: String,
	description: String,
	status: String,
	type: String
}); 

let contactsSchema = new Schema({
	opportunityFK: String, //referencing Opportunity.id
	firstName: String,
	lastName: String,
	lastContact: Date,
	notes: Array
});

let tasksSchema = new Schema({
	opportunityFK: String, //referencing Opportunity.id
	content: Array,
	completed: Boolean, 
	dueDate: Date,
	status: String
}); 

let User = db.model('User', usersSchema);
let Opportunity = db.model('Opportunity', opportunitiesSchema);
let Contact = db.model('Contact', contactsSchema);
let Task = db.model('Task', tasksSchema);

module.exports = db; 

