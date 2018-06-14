var express=require('express')
var app = express()
var path = require('path')
var mongoose = require('mongoose')
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
    secret:"movice",
    store:new mongoStore({
        url:mongoUrl,
        collection :"sessions"
    })
}))

app.listen(port)
require('./app/config/routes')(app)
console.log("server running at 3000")


//admin update movie