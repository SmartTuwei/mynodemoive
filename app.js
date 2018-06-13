var express=require('express')
var app = express()
var path = require('path')
var mongoose = require('mongoose')
var Movie = require("./models/movie.js")
var User = require("./models/user.js")
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser') 
var session = require("express-session")

var mongoStore =require("connect-mongo")(session)

var port = process.env.PORT || 3000
var _ = require("underscore")
 
var mongoUrl = "mongodb://127.0.0.1:27017/imooc"
mongoose.connect(mongoUrl)
 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser())
app.set('views','./views/pages')   //视图的路径，即后面index,admin,list,detail的文件位置
app.set('view engine','jade')   //模板引擎
app.use(express.static(path.join(__dirname,'public')))  //静态文件的路径

app.locals.moment=require('moment')

app.use(session({
    secret:"movice"
}))


app.listen(port)
require('./app/config/routes')(app)
console.log("server running at 3000")


//admin update movie
app.get('/admin/update/:id',function(req,res){
   var id = req.params.id
   if(id){
      Movie.findById(id,function(err,movie){
        res.render('admin',{
            title:'后台更新页',
            movie:movie
        })
      })
   }
})

//admin post method
app.post('/admin/movie/new',function(req,res){
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
})
 
// 列表页
app.get('/admin/list',function(req,res){
      Movie.fetch(function(err,movies){
        if(err){
            console.log(err)
         }
        res.render('list',{
          title:'首页',
          movies:movies
        })

    })
})
// list delete movie data 列表页删除电影
app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }
});