var $container = $('.container')// 获取大盒子的容器
var $wrapper = $container.find('.wrapper'); // 获取包装所有图片的盒子
var $slide = $wrapper.find('.slide') // 获取包装一张图片的盒子（长度）
var $pagination = $container.find('.pagination');// 获取小圆点


var len = $slide.length;  // 获取图片的长度
var activeIndex = 0; // 设置图片的索引
var timer = null  //  设置定时器

for(var i = 0; i < len; i++){  //  循环图片的长度
    $pagination.append('<span></span>'); //  循环一次插入一次小圆点，这样就是有多少长图片就有多少个小圆点
}

// 动画播放函数，传入的是图片的索引
function changeg(activeIndex) {
    // activeIndex++;
    $slide.eq(activeIndex).fadeIn().siblings().fadeOut();// 图片下面的索引淡出，其他淡入
    $pagination.find('span').eq(activeIndex).addClass('active').siblings().removeClass('active');//小圆点下面的span标签下面的索引增加class名，其他的都删除

}
// 自动轮播
timer = setInterval(function () {
    activeIndex++;
    changeg(activeIndex)
},3000);

// 给小圆点添加点击事件
$pagination.find('span').on('click',function () {
    activeIndex = $(this).index();
    changeg(activeIndex)
})


// 鼠标划上，停止轮播，鼠标移出，继续轮播
$container.hover(function () {
    clearInterval(timer)
},function () {
    timer = setInterval(function () {
        activeIndex++;

        if(activeIndex > len ) {
            activeIndex = 0;
        }
        changeg(activeIndex)
    },3000)
})

// 吸顶效果
$(window).scroll(function () {
    var $heightTop = $('#header').height();// 获取头部的高度
    console.log($(this).scrollTop())
    if($(this).scrollTop() > $heightTop){  // 如果浏览器的滚动高度大于底部的高度
        $('#header').addClass("containerTop")
    }else {
        $('#header').removeClass("containerTop")
    }
})






























