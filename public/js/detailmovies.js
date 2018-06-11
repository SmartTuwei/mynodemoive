// 处理删除电影数据的逻辑\
$(function () {
    function Page() {
        this.video = $(".js-video")[0];
    }
    $.extend(Page.prototype, {

        init: function(){
            this.bindEvents();
        },

        bindEvents: function() {
            var playBtn = $(".js-playbtn"),
                pauseBtn = $(".js-pausebtn"),
                screenbtn = $(".js-screenbtn");
                volumeRange = $(".js-volume"),
                prcessRange = $(".js-process");
            playBtn.on("click", $.proxy(this.handlePlayBtnClick, this));
            pauseBtn.on("click", $.proxy(this.handlePauseBtnClick, this));
            volumeRange.on("change", $.proxy(this.handleVolumeChange, this));
            prcessRange.on("change", $.proxy(this.handleProcessChange, this));
            screenbtn.on("click", $.proxy(this.handleScreenClick, this));
            $(this.video).on("timeupdate", $.proxy(this.handleVideoTimeUpdated, this));
            $(this.video).on("canplay", $.proxy(this.handleCanplayTriggerd, this))
        },

        handleCanplayTriggerd: function(){
            $(".js-videospan").text(parseInt(this.video.duration));
        },

        handlePlayBtnClick: function() {
            this.video.play();
        },

        handlePauseBtnClick: function() {
            this.video.pause();
        },

        handleScreenClick: function() {
            this.launchFullscreen(this.video);
        },

        handleVideoTimeUpdated: function(e){
            var ratio = this.video.currentTime / this.video.duration;
            $(".js-currentspan").text(  parseInt(this.video.currentTime)+"/");
            $(".js-process").val(ratio);
        },

        handleVolumeChange: function(e) {
            var target = $(e.target),
                value = target.val();
            this.video.volume = value;
        },

        handleProcessChange: function(e) {
            var target = $(e.target),
                value = target.val(),
                totalTime = this.video.duration;

            this.video.currentTime = totalTime * value;
        },

        launchFullscreen: function (element){
            //此方法不可以在异步任务中执行，否则火狐会出问题
            if(element.requestFullscreen) {
                element.requestFullscreen();
            } else if(element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if(element.msRequestFullscreen){
                element.msRequestFullscreen();
            } else if(element.oRequestFullscreen){
                element.oRequestFullscreen();
            }else if(element.webkitRequestFullscreen){
                element.webkitRequestFullScreen();
            }else{
                var docHtml = document.documentElement;
                var docBody = document.body;
                var videobox = document.getElementById('videobox');
                var cssText = 'width:100%;height:100%;overflow:hidden;';
                docHtml.style.cssText = cssText;
                docBody.style.cssText = cssText;
                videobox.style.cssText = cssText+';'+'margin:0px;padding:0px;';
                document.IsFullScreen = true;
            }
        },

        //退出全屏
        exitFullscreen: function (){
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if(document.oRequestFullscreen){
                document.oCancelFullScreen();
            }else if (document.webkitExitFullscreen){
                document.webkitExitFullscreen();
            }else{
                var docHtml = document.documentElement;
                var docBody = document.body;
                var videobox = document.getElementById('videobox');
                docHtml.style.cssText = "";
                docBody.style.cssText = "";
                videobox.style.cssText = "";
                document.IsFullScreen = false;
            }
        }

    });

    var page = new Page();
    page.init();
    //滑块
    $.fn.RangeSlider = function(cfg){
        this.sliderCfg = {
            min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null, 
            max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
            step: cfg && Number(cfg.step) ? cfg.step : 1,
            callback: cfg && cfg.callback ? cfg.callback : null
        };
    
        var $input = $(this);
        var min = this.sliderCfg.min;
        var max = this.sliderCfg.max;
        var step = this.sliderCfg.step;
        var callback = this.sliderCfg.callback;
    
        $input.attr('min', min)
            .attr('max', max)
            .attr('step', step);
    
        $input.bind("input", function(e){
            $input.attr('value', this.value);
            $input.css( 'background', 'linear-gradient(to right, #059CFA, white ' + this.value + '%, white)' );
    
            if ($.isFunction(callback)) {
                callback(this);
            }
        });
    };
});