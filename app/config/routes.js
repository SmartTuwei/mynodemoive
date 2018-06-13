var Index = require('../controllers/index')
var User = require('../controllers/user')
var Movie = require('../controllers/admin')
var multipart = require("connect-multiparty")
// var Comment = require('../app/controllers/comment')
// var Category = require('../app/controllers/category')
var Mdetail = require("../controllers/detail")
module.exports = function(app) {

  // // pre handle user
  // app.use(function(req, res, next) {
  //   var _user = req.session.user

  //   app.locals.user = _user

  //   next()
  // })
// 后台录入页

  app.get('/admin/addmovie', Movie.addmovies)


  // Index
  app.get('/', Index.index)
  app.post("/user/signup",User.signup);

  //登录用户

  app.post('/login',User.login)

  // 电影是详情页
  app.get('/movie/:id',Mdetail.Mdetail)



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
}