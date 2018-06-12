var mongoose = require('mongoose');
var MovieSchema = require('../app/schemas/movie');
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;