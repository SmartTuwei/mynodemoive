var Category = require("../../models/catetory") 
// index page
 exports.new = function(req, res) {
        res.render('catetory_admin', {
        title: '后台分类录入页',
        category: {}
        })
  }
  
  // admin post movie
  exports.save = function(req, res) {
        var _category = req.body.category
        var category = new Category(_category)
    
        category.save(function(err, category) {
            if (err) {
                console.log(err)
            }
        
            res.redirect('/admin/category/list')
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