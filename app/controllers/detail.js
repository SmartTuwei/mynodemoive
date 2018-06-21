var mongoose = require('mongoose')
var Movie = mongoose.model('Movie')
var Comment = mongoose.model('Comment')

exports.Mdetail = function(req,res){
    var id=req.params.id  //url中的id
    Movie.findById(id,function(err,movie){
        if(err){
                console.log(err)
        }
        Comment
        .find({movie:id})
        .populate("from","name")
        .populate("reply.from reply.to","name")
        .exec(function(err,comments){
                console.log(comments)
                if(err){
                        console.log(err)
                }
                console.log(comments)
                        res.render('detail',{
                                title:''+movie.title,
                                movie:movie,
                                comments:comments
                        })
                })       
     })     
}
 