//this is where we connect to the server and export it to home.
const mongoose = require('mongoose'); 
let db = mongoose.connect('mongodb://localhost/myapp'); 
const Schema = mongoose.Schema; 


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

let User = mongoose.model('User', usersSchema);
let Opportunity = mongoose.model('Opportunity', opportunitiesSchema);
let Contact = mongoose.model('Contact', contactsSchema);
let Task = mongoose.model('Task', tasksSchema);

let save = function(model, params, cb) {
  return ${model}.create(params, function(err, cb){
		     if(err) console.error(err);
  }); 
};

let retrieve = function(model, conditions) {
  return ${model}.find()	
};

let update = function(model, conditions, params) {
  return ${model}.findOneAndUpdate(conditions, params); 

};

