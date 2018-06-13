var mongoose = require('mongoose');
var UserSchema = require('../app/schemas/user');
var User = mongoose.model('User', UserSchema);

module.exports = User