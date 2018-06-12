var mongoose = require('mongoose')
var Movie = mongoose.model('Movie')
// var Category = mongoose.model('Category')

// index page

exports.addmovies = function(req,res){
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
}
 