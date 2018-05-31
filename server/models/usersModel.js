var mongoose = require('mongoose');
var usersSchema = require('../../db/index.js').usersSchema;
var User = mongoose.model('User', usersSchema); 


let saveUser = () => {};
let getUsers = () => {};
let updateUser = () => {};
let deleteUser = () => {};

module.exports.saveUser = saveUser;
module.exports.getUsers = getUsers;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
