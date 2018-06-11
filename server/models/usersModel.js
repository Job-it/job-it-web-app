var mongoose = require('mongoose');
var UsersSchema = require('../../db/index.js').usersSchema;
var findOrCreate = require('mongoose-findorcreate');
UsersSchema.plugin(findOrCreate);

var User = mongoose.model('User', UsersSchema);

// This is the only available user function
// When a user is signed in, the client has access to their unique identifier in the 
// user object. The user object is sent back to the client in auth middleware.
// All we need to do is save a user so that we can assign opportunities and tasks to them.
let saveGitHubUser = (profile, cb) => {
  User.findOrCreate({githubId: profile.id}, {userName: profile.displayName}, function(err, user) {
    return cb(err, user);
  })
};

module.exports.saveGitHubUser = saveGitHubUser;