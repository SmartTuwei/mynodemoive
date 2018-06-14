var User = require("../../models/user.js")
var Movie = require("../../models/movie.js")
var Index = require('../controllers/index')
var UserCtr = require('../controllers/user')
var MovieCtr = require('../controllers/admin')
var multipart = require("connect-multiparty")
// var Comment = require('../app/controllers/comment')
// var Category = require('../app/controllers/category')
var Mdetail = require("../controllers/detail")
module.exports = function(app) {
  app.use(function(req, res, next) {
    var _user = req.session.user;
    app.locals.user = _user
      next()
  })

  // Index
  app.get('/', Index.index)
  app.post("/user/signup",UserCtr.signup);

  //登录用户

  app.post('/login',UserCtr.login)

  // 电影是详情页
  app.get('/movie/:id',Mdetail.Mdetail)
  // 后台录入页
  app.get('/admin/addmovie', MovieCtr.addmovies)

 // 退出登录
  app.get('/logout',UserCtr.logout)

  // User
  // app.post('/user/signup', User.signup)
  // app.post('/user/signin', User.signin)
  // app.get('/signin', User.showSignin)
  // app.get('/signup', User.showSignup)
  // app.get('/logout', User.logout)
  // app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list)

  // // Movie
  // app.get('/movie/:id', Movie.detail)
  // app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
  // app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update)
  // app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save)
  // app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list)
  // app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del)

  // // Comment
  // app.post('/user/comment', User.signinRequired, Comment.save)

  // // Category
  // app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new)
  // app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save)
  // app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list)

  // // results
  // app.get('/results', Index.search)

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
}