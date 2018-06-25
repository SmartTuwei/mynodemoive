// 处理删除电影数据的逻辑
$(function () {
$('.delbtn').click(function (e) {
    if(confirm("你确定删除该电影数据吗") ){
            var target = $(e.target);
            var id = target.data('id');
            var tr = $('.item-id-' + id);
            $.ajax({
                type: 'DELETE', // 异步请求类型：删除
                url: '/admin/deletelist?id=' + id,
            })
            .done(function (results){
                if (results.success === 1) {
                    if (tr.length > 0) {
                        tr.remove();
                    }
                }
                window.location.reload();
            });                  
        }
    });
    $('#douban').blur(function() {
        var douban = $(this)
        var id = douban.val()
    
        if (id) {
          $.ajax({
            url: 'https://api.douban.com/v2/movie/subject/' + id,
            cache: true,
            type: 'get',
            dataType: 'jsonp',
            crossDomain: true,
            jsonp: 'callback',
            success: function(data) {
              $('#inputTitle').val(data.title)
              $('#inputDoctor').val(data.directors[0].name)
              $('#inputCountry').val(data.countries[0])
              $('#inputCategory').val(data.genres[0])
              $('#inputPoster').val(data.images.large)
              $('#inputYear').val(data.year)
              $('#inputSummary').val(data.summary)
            }
          })
        }
      })

    $(".delcategory").click(function(e){
        var target = $(e.target);
        var id = target.data('id');
        console.log(id)
        if(confirm("你确定删除该分类以及分类下的所有电影吗?")){
        $.ajax({
            url: '/admin/delcategory/'+id,
            cache: true,
            type: 'post',
            data:{id:id},
            success: function(data) {
                if(data.status){
                    alert("删除成功了");
                    window.location.reload();  
                }
             }
          })
        }
    })
});