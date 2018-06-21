var User = require("../../models/user.js");
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
        console.log(_user)
    next()
  })
// 首页
app.get("/", Index.index);
app.post("/user/signup", Userctr.signup);

//登录用户
app.post("/login", Userctr.login);
//退出用户
app.get("/logout", Userctr.logout );
// 电影是详情页
app.get("/movie/:id", Mdetail.Mdetail);
// 后台录入页
app.get("/admin/addmovie",Userctr.loginRequired,Userctr.adminRequired,Admin.addmovies);
// 更新电影
app.get('/admin/update/:id',Userctr.loginRequired,Userctr.adminRequired, Admin.update) 
//admin post method
app.post('/admin/movie/new',Userctr.loginRequired,Userctr.adminRequired,  Admin.newmovies)      
// 列表页
app.get('/admin/list',Userctr.loginRequired,Userctr.adminRequired, Admin.moviesList)
//列表页删除电影
app.delete('/admin/deletelist',Userctr.loginRequired,Userctr.adminRequired, Admin.deleteList)
//  评论
app.post('/user/comment',Userctr.loginRequired,Comment.save)      
// 列表页
};
