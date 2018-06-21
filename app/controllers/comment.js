
var Comment = require("../../models/comment")
// var Category = mongoose.model('Category')
// index page
exports.save = function(req,res){ 
    console.log("进入平")
    var _comment = req.body.comment
    var movieId= _comment.movie
    console.log(_comment.cid);
    if(_comment.cid){
        Comment.findById(_comment.cid,function(err,comment){
             var reply = {
                 from:_comment.from,
                 to:_comment.tid,
                 content:_comment.content
             } 
             comment.reply.push(reply);
             comment.save(function(err,comment){
                  if(err){
                        console.log(err);
                   }  
                  res.redirect("/movie/"+ movieId)
             })  
        })    
    }else{
        var comment = new Comment(_comment)
        comment.save(function(err,comment){
            if(err){
                console.log(err)
            }
            console.log("日你妈")
            res.redirect("/movie/"+movieId)
        })
    }
}
 
 