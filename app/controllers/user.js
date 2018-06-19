var mongoose = require('mongoose')
var User = mongoose.model('User');

exports.signup = function(req,res){
      var _user = req.body.user
      User.findOne({name: _user.name},  function(err, user) {
          if (err) {
              console.log(err)
          }
          if (user){
            res.render("response",{
                flag:"false",
                message:"用户名重复！！！"
            });
          } else {
          user = new User(_user); 
          user.save(function(err, user){
              if (err) {
                console.log(err)
              }
               
              console.log("保存成功了!!! 恭喜你")
            //res.end(JSON.stringify(user));
              res.render("response",{
                  flag:"true",
                  message:"注册成功！！！"
              });
          })
        }
   })
}
// 登录路由
exports.login = function(req,res){
    var _user = req.body.user
    var name = _user.name
    var password = _user.password
    User.findOne({name: name}, function(err, user) {
        if (err) {
             console.log(err)
        }
        if (!user) {
            return res.render('response',{
                "message":"用户名不存在"
            }) 
        } else{
                console.log(user);
                if( password == user.password){
                    req.session.user = _user;
                    return res.render('response',{
                        "message":"登录成功！"
                    })   
                }else{
                    return res.render('response',{
                        "message":"密码错误"
                    }) 
                }
             }
    })
}
//退出登录
exports.logout = function(req,res){
    delete req.session.user
    delete app.locals.user
    res.redirect("/")
}