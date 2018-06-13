var mongoose = require('mongoose')
var Movie = mongoose.model('Movie')


exports.Mdetail = function(req,res){
        var id=req.params.id  //url中的id
        Movie.findById(id,function(err,movie){
        res.render('detail',{
                title:''+movie.title,
                movie:movie
                })
        })     
}
 