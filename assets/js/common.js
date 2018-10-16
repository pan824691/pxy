$('#header').load('header.html',function () {
    //用户中心
    $('.nav-right').find('.usertent').mouseenter(function () {  // 鼠标划入li中的左侧内容
       $(this).find('.hoverShowSon').find('ul').fadeIn()  // 当前li对应的右侧内容显示
})
    $('.nav-right').mouseleave(function () { // 移出菜单时，将右侧的内容全部消失
        $(this).find('ul').fadeOut();
        $(this).find('.hoverShowSon').find('ul').stop(true,true)
})


    // 二级菜单
$('#nav').find('.liShow').mouseenter(function () {
    $(this).find('.item').fadeIn(); // 下面的item显示
    $(this).siblings('li').find('.item').fadeOut();// 不是它的隐藏
    $(this).find('.joinus').slideDown(); // 二维码显示
    $('#header').css({'background':'#fff','height':'300px'})
    $('#header').siblings('li').css({'background':'','height':''})
})
    $('#nav').mouseleave(function () {
        $(this).find('.item').fadeOut();
        $(this).find('.item').stop(true,true)
        $(this).find('.joinus').fadeOut();
        $(this).find('.joinus').stop(true,true);
        $('#header').css({'background':'','height':''})
    
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
        $('#totalNum4').html(totalNum);
        console.log( $('#totalNum4'))
    }
    countFn()
    
    
    function getItem(key) {
        return localStorage.getItem(key)
    }
    
    function setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }
    
})



// 底部
$('#footer').load('footer.html',function(){

    // 置顶效果
    $(window).scroll(function () {
        // var $heightTop = $('#header').height();// 获取头部的高度
        if($(this).scrollTop() > 300){  // 如果浏览器的滚动高度大于底部的高度
            $top.style.display = 'block';
        }else {
            $top.style.display = 'none';
        }
        })
    
        
        var bool = false;  // 初始值为不动
        var $top = document.querySelector('.top')
        
        $(".li3").on("click",clickHandler); //创建div，添加点击事件
        function clickHandler(e) {
            // console.log("aa")
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
$('.img2').hover(function(){
    $('.erweima').slideDown()
})
$('.img2').mouseleave(function(){
    $('.erweima').hide()
})












        

})






