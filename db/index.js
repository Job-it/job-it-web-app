//this is where we connect to the server and export it to home.
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/myapp'); 
const Schema = mongoose.Schema; 

let usersSchema = new Schema({
	firstName: String, 
	lastName: String,
	githubOAuth: String

}); 

let opportunitiesSchema = new Schema({
	userFK: String,
	dateOpened: { type: Date, default: Date.now },
	dateClosed: Date,
	orgName: String,
	rank: String,
	status: String,
	type: String
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
	content: Array,
	completion: Boolean, 
	dueDate: Date,
	status: String
})