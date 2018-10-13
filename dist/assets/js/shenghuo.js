var list = [];
$.ajax({
    type:'get',
    url:'../assets/json/shenghuo.json',
    dataType:'json',
    success:function (res) {
        var data = res.result;
        list = data;
        renderDOM(data)
    }
})

function renderDOM(data) {
    $('#test').html('');
    var str = '';
    $.each(data,function (i,obj) {
        str += '<div class="inner">';
        str += '<span class="duibi"><em class="iconfont">&#xe674;</em><i>对比</i></span><img src="'+obj.imgUrl+'"/>';
        str += '<h3>'+obj.name+'</h3>';
        str += '<h6>'+'￥'+obj.price+'</h6>';
        str += '<button onclick="getInfo('+i+')">加入购物车</button>';
        str += '</div>';
    })
    $('#test').append(str);
}
// 商品排序
function filterData (brand) {
    var arr = [];
    console.log(brand)
    list.map(function (item, index) {
        if(item.brand ==  brand){
            arr.push(item)
        }
    })
    console.log(arr)
    renderDOM(arr)
}
// 价格筛选
var i = 0;
function sortPrice (type) {
    i++;
    if(i%2 == 0){
        list.sort(function (a, b) {
            return a[type] - b[type]
        })
    } else {
        list.sort(function (a, b) {
            return b[type] - a[type]
        })
    }
    renderDOM(list)
}


function getInfo(index) {
    var shopObj = list[index];
    shopObj.num = 1;
    addCart(shopObj);
}

// 家人购物车函数
function addCart(shopObj) {
    var carListStr = getItem('pxyCart');// 获取本地商品的值
    if(carListStr){
        var carList = JSON.parse(carListStr); // 把商品转对象
        changegCart(carList,shopObj); // 执行判断商品是否存在函数
    }else {
        setItem('pxyCart',[shopObj]);
    }
}

function changegCart(carList,shopObj) {
    var result = false;
    var activeIndex = 0;
    carList.map(function (item,index) {
        if(item.id === shopObj.id){
            activeIndex = index;
            result = true;
        }
    })
    result ? cartList[activeIndex].num = cartList[activeIndex].num *1 +1 : cartList.push(shopObj)
    setItem('pxyCart',carList);
}
// 获取本地数据
function getItem(key) {
    return localStorage.getItem(key);
}
// 设置本地数据
function setItem(key,value) {
    localStorage.setItem(key,JSON.stringify(value))
}


// 广告栏滚动
var $leftBtn = $('.leftBtn');
var $rightBtn = $('.rightBtn');
var $column = $('.column');
$rightBtn.click(function(){
   $column.animate({'left':'-500px'});
})
$leftBtn.click(function(){
   $column.animate({'left':'500px'});
})
