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

// 置顶效果
var bool = false;  // 初始值为不动
var $top = document.querySelector('.top')

$(".iconfont").on("click",clickHandler); //创建div，添加点击事件
function clickHandler(e) {
    console.log("aa")
    bool = !bool;  //点就动不点就不动
}
animation()
function animation() {   // 动画函数
    requestAnimationFrame(animation)
    if(!bool)return;  // 如果动，就返回
    var ele = $(document.documentElement);//获取浏览器
    var num = ele.scrollTop(); //获取页面的滚动条
    if(num <= 0){  // 如果滚动条小于0，就不动，返回
        bool=false;
        return;
    } else if(num >= 100){
       
        num -= 100;
        ele.scrollTop(num) // 如果滚动条大于0 ，就让滚动条慢慢的往上滑
    }
    
}
// 置顶显示
$(window).scroll(function () {
// var $heightTop = $('#header').height();// 获取头部的高度
if($(this).scrollTop() > 300){  // 如果浏览器的滚动高度大于底部的高度
    $top.style.display = 'block';
}else {
    $top.style.display = 'none';
}
})


function countFn() {
    // var $totalNum4 = $('#totalNum4')
    var $totalNum4 = document.querySelector('#totalNum4');
    console.log($totalNum4)
    var selectListStr = getItem('selectlist')
    var selectList = JSON.parse(selectListStr);
    
    var totalNum = 0; //设置总数默认0
    if (selectList) {
        selectList.map(function (item, index) {
            
            if (item.select == 1) {
                console.log(item.select)
                totalNum += item.num * 1;
            }
        })
    } else {
        totalNum = 0;
    }
    $('#totalNum5').html(totalNum);

}
countFn()


function getItem(key) {
    return localStorage.getItem(key)
}

function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}


// 楼梯效果
var activeindex = 0;  // 表示被选中的索引值
$('#menu').find('li').not('.last').on('click',function () {  //。not('.last')不是last的元素
    $(this).addClass('active').siblings().removeClass('active');
    activeindex = $(this).index();
    var $height = $('.cententBox').eq(activeindex).offset().top;
    $('html,body').animate({
        scrollTop:$height + 'px'
    },200)
})
$('.last').on('click',function () {
    $('html,body').animate({
        scrollTop:0
    },500)
})

var boxheight = $('#maxBox').height();
$(window).scroll(function () {
    var $height = $(this).scrollTop();// 获取页面的滚动条
    if($height > boxheight -300){  // 页面的滚动条大于公共部分的高度的时候
       
        $('#menu').fadeOut() ;
       
    }else {
    
        $('#menu').fadeIn() ; 
        
    }
    $('.cententBox').each(function (index,item) {
        var $liheight = $(this).offset().top;// 元素本身相对页面到顶部的距离
        if($height >= $liheight - 50){  //
            activeindex = index;
        }
    })
    $('#menu').find('li').eq(activeindex).addClass('active').siblings().removeClass('active');
})































