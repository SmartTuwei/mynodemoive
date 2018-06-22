var mongoose = require('mongoose');
var CommentSchema = require('../app/schemas/comment');
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;