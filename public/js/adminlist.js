// 处理删除电影数据的逻辑
$(function () {
    $('.del').click(function (e) {
        confirm("你确定删除该电影数据吗",function(){
            var target = $(e.target);
            var id = target.data('id');
            var tr = $('.item-id-' + id);
            $.ajax({
                type: 'DELETE', // 异步请求类型：删除
                url: '/admin/list?id=' + id,
            })
            .done(function (results) {
                if (results.success === 1) {
                    if (tr.length > 0) {
                        tr.remove();
                    }
                }
            });
        })       
    });
});