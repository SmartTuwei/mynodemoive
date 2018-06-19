var express=require('express')
var app = express()
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser') 
var session = require("express-session")
var looger = require("morgan")
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
// 这一步将express 和 mongod联系起来将 session 保存在数据库中
app.use(session({
    secret:"movice",
    store:new mongoStore({
        url:mongoUrl,
        collection:"sessions"
    })
}))

if("development" === app.get("env")){
    app.set("showStackError",true)
    app.use(looger(":method :url :status"))
    app.locals.pretty = true
    mongoose.set("debug",true)
}


app.listen(port)
require('./app/config/routes')(app)
console.log("server running at 3000")
 