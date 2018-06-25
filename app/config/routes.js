
var User = require("../../models/user.js");
var Catetory = require("../controllers/catetory")
var Movie = require("../../models/movie.js");
var Index = require("../controllers/index");
var Userctr = require("../controllers/user");
var Admin = require("../controllers/admin");
var Comment = require("../controllers/comment");
var multipart = require("connect-multiparty");
var Mdetail = require("../controllers/detail");
module.exports = function(app) {
 app.use(function(req, res, next) {
    var _user = req.session.user
    app.locals.user = _user
    next()
  })
// 首页
app.get("/", Index.index);
app.post("/user/signup", Userctr.signup);
//  user
//登录用户
app.post("/login", Userctr.login);
//退出用户
app.get("/logout", Userctr.logout );
// 电影是详情页
app.get("/movie/:id", Mdetail.Mdetail);
// Admin
// 后台录入页
app.get("/admin/addmovie",Userctr.loginRequired,Userctr.adminRequired,Admin.addmovies);
// 更新电影
app.get('/admin/movie/update/:id',Userctr.loginRequired,Userctr.adminRequired, Admin.update) 
// admin post method 保存电影的post提交路由
app.post('/admin/movie',Userctr.loginRequired,Userctr.adminRequired,Admin.savePoster, Admin.newmovies)      
// 列表页
app.get('/admin/movie/list',Userctr.loginRequired,Userctr.adminRequired, Admin.moviesList)
 
 

//列表页删除电影
app.post('/user/comment',Userctr.loginRequired,Comment.save)  
// 删除电影 
app.delete('/admin/deletelist',Userctr.loginRequired,Userctr.adminRequired, Admin.deleteList)
//评论
app.post('/user/comment',Userctr.loginRequired,Comment.save)      



// 后台分类录入页
app.get("/admin/catetory/new",Userctr.loginRequired,Userctr.adminRequired,Catetory.new)
app.post('/admin/category', Userctr.loginRequired, Userctr.adminRequired, Catetory.save)
app.get('/admin/category/list', Userctr.loginRequired, Userctr.adminRequired, Catetory.list)
app.get("/results",Index.search)

// 添加分类
app.get('/admin/movie/catetory_admin',Userctr.loginRequired,Userctr.adminRequired, Catetory.catetory_admin)
// 更新分类
app.get("/admin/category/update/:id",Userctr.loginRequired,Userctr.adminRequired,Catetory.catetory_update)

// 删除分类
app.post("/admin/delcategory/:id",Userctr.loginRequired,Userctr.adminRequired,Catetory.delcategory)

};
