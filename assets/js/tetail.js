//  放大镜效果
var index = 0;

function getIndex(index) {
    $('.max-img').find('.imgBox').eq(index).fadeIn().siblings().fadeOut();
}
$('.small-img').find('span').on('click', function () {
    index = $(this).index();
    getIndex(index)
})


// 省级三级联动菜单效果
var $submenu = document.querySelector('.submenu');
var $outer = document.querySelector('.outer');
var $select = $outer.querySelectorAll('select');
var $button = document.querySelector('#button');
$submenu.onmouseenter = function () {
    $outer.style.display = 'block';
}
$button.onclick = function () {
    var str = '';
    for (var i = 0; i < $select.length; i++) {
        str += $select[i].value + ' ';
    }
    $submenu.innerHTML = str;
    $outer.style.display = 'none';
}

// 点击收藏效果
var $collect_p = $('.collect_p');
$collect_p.click(function () {
    console.log('aaa')
})



// 数量加减函数
var getInput = (function () {
    return {
        init: function () {
            this.$leftBtn = document.querySelector('#leftBtn');
            this.$rightBtn = document.querySelector('#rightBtn');
            this.$inp = document.querySelector('#inp');
            this.$inpBtn = document.querySelector('.inpBtn');
            this.event();
        },
        event: function (e) {
            var _this = this;
            // 左边按钮点击事件
            this.$leftBtn.onclick = function () {
                if (_this.$inp.value > 1) {
                    _this.$inp.value -= 1;
                }
            }
            // 右边按钮点击事件
            this.$rightBtn.onclick = function () {
                _this.$inp.value = parseFloat(_this.$inp.value) + 1;
            }
            this.$inpBtn.onclick = function () {
                _this.addCar();
            }
        },
        getData:function(){
           var $imgBox = document.querySelectorAll('.imgBox')[0];
           var $img = $imgBox.querySelector('img');
           var $name = document.querySelector('.centent-right');
           var $nameH1 = $name.querySelector('h1');
           var $price = document.querySelector('.centent-right-2');
           var reg=/\d+/;
           var obj={
               img_url:$img.src,
               name: $nameH1.innerHTML,
               price:$price.innerHTML.match(reg)[0]
           };
// console.log(obj,localStorage)
// localStorage.list=JSON.stringify(obj);
return JSON.stringify(obj);

        },
        addCar: function () {
            var pxyCart = localStorage.pxyCart || '[]';
            pxyCart = JSON.parse(pxyCart);
            var activeIndex = 0; // 设置选中的索引值
            for (var j = 0; j < pxyCart.length; j++) {
                if (pxyCart[j].id) {
                    pxyCart[j].activeIndex = Number(pxyCart[j].activeIndex) + 1;
                    break;
                }
            }
            if (j === pxyCart.length) { //如果没有过这个商品，重新添加一条
                console.log(pxyCart)
                pxyCart.push();

                this.getData()
                console.log(localStorage)
                
            }
            // console.log(pxyCart)
        }
    }
}())
getInput.init()