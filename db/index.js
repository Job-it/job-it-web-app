//this is where we connect to the server and export it to home.

var mongoose = require('mongoose');
var databasePath = process.env.DATABASE_PATH || 'mongodb://localhost/jobit';
mongoose.connect(databasePath);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Connected to db.');
});


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
<<<<<<< HEAD
})
=======
}); 

let User = db.model('User', usersSchema);
let Opportunity = db.model('Opportunity', opportunitiesSchema);
let Contact = db.model('Contact', contactsSchema);
let Task = db.model('Task', tasksSchema);

module.exports = db; 

>>>>>>> 708befb90df803e14b73c2918cd955fde88b0300
