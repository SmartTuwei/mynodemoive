var mongoose = require('mongoose')
var Movie = mongoose.model('Movie')
var Category = mongoose.model('Catetory')
var _ = require('underscore')
var fs = require('fs')
var path = require('path')

// index page
exports.addmovies = function(req,res){
  Category.find({},function(err,categories){
        if(err){
            console.log(err)
        }
        res.render('admin',{
            title:'imooc 后台管理页',
            categories:categories,
            movie:{}
        })
  }) 
  
}
exports.newmovies = function(req,res){
      var id = req.body.movie._id
      var movieObj = req.body.movie
      var _movie
        if (req.poster) {
          movieObj.poster = req.poster
        }
        if (id) {
          Movie.findById(id, function(err, movie) {
            if (err) {
              console.log(err)
            }
      
            _movie = _.extend(movie, movieObj)
            _movie.save(function(err, movie) {
              if (err) {
                console.log(err)
              }
      
                 res.redirect('/movie/' + movie._id)
            })
          })
        }else{
            console.log(movieObj)
          _movie = new Movie(movieObj)
          var categoryId = movieObj.category
          var categoryName = movieObj.categoryName
          _movie.save(function(err, movie) {
            if (err) {
                  console.log(err)
            }
            if (categoryId) {
              Category.findById(categoryId, function(err, category) {
                category.movies.push(movie._id)
                category.save(function(err, category) {
                     res.redirect('/movie/' + movie._id)
                })
              })
            }else if (categoryName) {
              var category = new Category({
                name: categoryName,
                movies: [movie._id]
              })
              category.save(function(err, category) {
                movie.category = category._id
                movie.save(function(err, movie) {
                  res.redirect('/movie/' + movie._id)
                })
              })
            }
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
exports.catetory_admin = function(req,res){
  Category.fetch(function(err, categories) {
    if (err) {
      console.log(err)
    }
    res.render('categorylist', {
          title: '分类列表页',
          categories: categories
    })
  })
}
//更新电影
exports.update = function(req,res){
        var id = req.params.id
        if(id){
            Movie.findById(id, function(err, movie) {
              console.log("---------------------")
              console.log(movie)
                Category.find({}, function(err, categories) {
                    res.render('admin', {
                    title: '后台更新页',
                    movie: movie,
                    categories: categories
                  })
                })
        })
    }
 }   