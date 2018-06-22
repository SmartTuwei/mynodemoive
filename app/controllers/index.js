var mongoose = require('mongoose')
var Movie = mongoose.model('Movie')

var Catetory = mongoose.model('Catetory')

// index page

exports.index = function(req, res) {
  Catetory
        .find({})
        .populate({
          path: 'movies',
          select: 'title poster',
          options: { limit: 6 }
        })
        .exec(function(err, categories) {
          if (err) {
            console.log(err)
          }
          console.log(categories)
      res.render('index', {
        title: '首页',
        categories: categories
      })
    })
 console.log("indexindex")
}

// search page
exports.search = function(req, res) {
  var catId = req.query.cat
  var q = req.query.q
  var page = parseInt(req.query.p, 10) || 0
  var count = 2
  var index = page * count

  if (catId) {
    Catetory
      .find({_id: catId})
      .populate({
        path: 'movies',
        select: 'title poster'
      })
      .exec(function(err, categories) {
        if (err) {
          console.log(err)
        }
        var catetory = categories[0] || {}
        var movies = catetory.movies || []
        var results = movies.slice(index, index + count)
        res.render('results', {
          title: 'imooc 结果列表页面',
          keyword: catetory.name,
          currentPage: (page + 1),
          query: 'cat=' + catId,
          totalPage: Math.ceil(movies.length / count),
          movies: results
        })
      })
  }
  else {
    Movie
      .find({title: new RegExp(q + '.*', 'i')})
      .exec(function(err, movies) {
        if (err) {
          console.log(err)
        }
        var results = movies.slice(index, index + count)

        res.render('results', {
          title: 'imooc 结果列表页面',
          keyword: q,
          currentPage: (page + 1),
          query: 'q=' + q,
          totalPage: Math.ceil(movies.length / count),
          movies: results
        })
      })
  }
}