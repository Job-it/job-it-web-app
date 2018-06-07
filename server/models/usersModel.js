var mongoose = require('mongoose');
var UsersSchema = require('../../db/index.js').usersSchema;
var findOrCreate = require('mongoose-findorcreate');
UsersSchema.plugin(findOrCreate);

var User = mongoose.model('User', UsersSchema);

let saveGitHubUser = (profile, cb) => {
  User.findOrCreate({githubId: profile.id}, {userName: profile.displayName}, function(err, user) {
    return cb(err, user);
  })
};

// saveUser({githubId: 1}, (err, user) => console.log(err, user));

module.exports.saveGitHubUser = saveGitHubUser;