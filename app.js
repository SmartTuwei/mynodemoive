var express=require('express')
var app = express()
var path = require('path')
var mongoose = require('mongoose')
var Movie = require("./models/movie.js")
var User = require("./models/user.js")
var port = process.env.PORT || 3000
var _ = require("underscore")
mongoose.connect('mongodb://127.0.0.1:27017/imooc')
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('views','./views/pages')   //视图的路径，即后面index,admin,list,detail的文件位置
app.set('view engine','jade')   //模板引擎
app.use(express.static(path.join(__dirname,'public')))  //静态文件的路径
app.locals.moment=require('moment')
app.listen(port)
require('./app/config/routes')(app)
console.log("server running at 3000")

// 首页
// app.get('/',function(req,res){
//     Movie.fetch(function(err,movies){
//         if(err){
//             console.log(err)
//          }
//         res.render('index',{
//           title:'欢迎进入首页0',
//           movies:movies
//         })
//     })
// })
// 详情播放页
app.get('/movie/:id',function(req,res){
     var id=req.params.id  //url中的id
     Movie.findById(id,function(err,movie){
     res.render('detail',{
        title:''+movie.title,
        movie:movie
      })
     })     
})
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

//注册
app.post("/user/signup",function(req,res){
     var _user = req.body.user
     console.log(_user);
        User.findOne({name: _user.name},  function(err, user) {
            if (err) {
                console.log(err)
            }
            if (user){
                console.log("重复的用户名!!!")
                return res.redirect('/signin');
            }else {
            user = new User(_user); 
            user.save(function(err, user){
                if (err) {
                console.log(err)
                }
                console.log("保存成功了!!! 恭喜你")
                res.redirect('/')
            })
            }
        })
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
app.get('/admin/movie',function(req,res){
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