var mongoose = require('mongoose')
var Movie = mongoose.model('Movie')
// var Category = mongoose.model('Category')
// index page
exports.addmovies = function(req,res){
  res.render('admin',{
     title:'imooc 后台管理页',
     movie:{
             title:"",
             doctor:"",
             country:"",
             year:"",
             poster:"",
             flash:"",
             summary:"",
             language:""
     }
 })
}
exports.newmovies = function(req,res){
        var id = req.body.movie._id
        var movieObj = req.body.movie
        console.log("ha")
        var _movie =null
        if(id !== 'undefined'){
            Movie.findById(id,function(err,movie){
                if(err){
                    console.log(err)
                }
                _movie=_.extend(movie,movieObj)
                _movie.save(function(err,movie){
                    if (err) {
                        console.log(err)
                    }
    
                    res.redirect('/movie/'+movie._id)
                })            
            })
      }else{
            _movie = new Movie({
                  doctor:movieObj.doctor,
                  title:movieObj.title,
                  country:movieObj.country, 
                  language:movieObj.language,
                  year:movieObj.year,
                  poster:movieObj.poster, 
                  summary:movieObj.summary,
                  flash:movieObj.flash      
            })
            _movie.save(function(err,movie){
                    if (err) {
                        console.log(err)
                    }
    
                    res.redirect('/movie/'+movie._id)
                })
        }
} 
exports.moviesList = function(req,res){
        Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
            }
        res.render('list',{
            title:'首页',
            movies:movies
        })

    })
}
exports.deleteList = function (req, res) {
        var id = req.query.id;
        console.log("删除电影测试!!!")
        if (id) {
            Movie.remove({_id: id}, function (err, movie) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({success: 1});
                }
            });
        }
}
exports.update = function(req,res){
        var id = req.params.id
        if(id){
            Movie.findById(id,function(err,movie){
            res.render('admin',{
                title:'后台更新页',
                movie:movie
            })
            })
        }
 }   