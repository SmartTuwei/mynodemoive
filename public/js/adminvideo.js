// 处理删除电影数据的逻辑\
$(function () {
    var imssage = "请输入完整的信息!"
    function check(){
        var ischecktrue = false;         
        if($("#inputTitle").val() == "" || $("#inputTitle").val()=="undefind"){
            ischecktrue=false;
            imssage = "电影名称不存在或为空"
            return false; 
        }else if($("#inputDoctor").val() == "" || $("#inputDoctor").val()=="undefind"){
            ischecktrue=false;
            imssage = "电影导演不存在或为空"
            return false; 
        }else if($("#inputCountry").val() == "" || $("#inputCountry").val()=="undefind"){
            ischecktrue=false;
            imssage = "国家不存在或为空"
            return false; 
        }else if($("#inputLanguage").val() == "" || $("#inputLanguage").val()=="undefind"){
            ischecktrue=false;
            imssage = "语种不存在或为空"
            return false; 
        }else if($("#inputPoster").val() == "" || $("#inputPoster").val()=="undefind"){
            ischecktrue=false;
            imssage = "海报地址不存在或为空"
            return false; 
        }else if($("#inputFlash").val() == "" || $("#inputPoster").val()=="undefind"){
            ischecktrue=false;
            imssage = "片源地址不存在或为空"
            return false; 
        }else if($("#inputYear").val() == "" || $("#inputPoster").val()=="undefind"){
            ischecktrue=false;
            imssage = "上映年代不存在或为空"
            return false; 
        }else if($("#inputSummary").val() == "" || $("#inputPoster").val()=="undefind"){
            ischecktrue=false;
            imssage = "电影简介不存在或为空"
            return false; 
        }else{
            return true;
        }
    }

    $("button[type='submit']").click(function(){
        if(check()){
            return true;
        } else{
           alert(imssage) ;
          return false;
        }
         
    })
});