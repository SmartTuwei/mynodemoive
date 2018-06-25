var Category = require("../../models/catetory") 
var Movie = require('../../models/movie')
 
exports.new = function(req, res) {
        res.render('catetory_admin', {
        title: '后台分类录入页',
        category: {}
        })
  }
  
  // admin post movie
  exports.save = function(req, res) {
        var _category = req.body.category
        if(_category.name.trim() == "" ){
            return res.redirect('/admin/category/list')
        }
        Category.find({"name":_category.name},function(err,categories){
          if(err){
            console.log(err)
          } 
          if(categories.length != 0){
               res.redirect('/admin/category/list')
          }else{
              var category = new Category(_category)
              category.save(function(err, category) {
                 if (err) {
                     console.log(err)
                 }
                 res.redirect('/admin/category/list')
            })
          }
       }) 
  }
  
  // catelist page
  exports.list = function(req, res) {
    Category.fetch(function(err, categories) {
      if (err) {
        console.log(err)
      }
      res.render('categorylist', {
            title: '分类列表页',
            categories: categories
      })
    })
  }
// 添加分类
exports.catetory_admin = function(req,res){
    
    Category.fetch(function(err, categories) {
      if (err) {
        console.log(err)
      }
      res.render('catetory_admin', {
            title:'分类列表页',
            category: categories
      })
    })
  }
  //更新分类
exports.catetory_update = function(req,res){
  Category.fetch(function(err, categories) {
      if (err) {
        console.log(err)
      }
      res.render('categorylist', {
        title: '分类列表页',
        categories: categories
      })
    })
}
//删除分类
exports.delcategory = function(req,res){
    var id = req.body.id;
    var _id = {_id:id};
    console.log(id);
    Category.findById(id,function(err,categories){
      var _ids = categories.movies; 
      if(err){
          console.log(err)
        }
        Movie.remove({"_id":{ $in: _ids}},function(err,movies){
            if(err){
                console.log(err)
            }
            Category.remove(_id,function(err,categories){
              if(err){
                  console.log(err);
              }
              res.status(200).json({status:"true",msg:"删除成功了"});
          })
        })
    })    
} 