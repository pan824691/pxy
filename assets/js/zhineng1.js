var list = []  //定义了一个空数组
// 渲染图片
$.ajax({
    type:"GET",
    url:"../assets/json/zhineng.json",
    dataType:"json",
    success:function (res) {
        console.log(res)
        var data = res.result;  //获取客户端数据返回的结果
        list = data
        // console.log(data)
        renderDOM(data)
    }
})
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


function  renderDOM(data) {
    $('#test').html('');
    var str = '';
    $.each(data,function (i,obj) {
        str += '<div class="inner">';
        str += '<span class="duibi"><em class="iconfont">&#xe674;</em><i>对比</i></span><img src="'+obj.imgUrl+'"/>';
        str += '<h3>'+obj.name+'</h3>';
        str += '<h6>'+'$'+obj.price+'</h6>';
        // console.log(obj.price)
        str += '<button onclick="getInfo('+i+')">加入购物车</button>'
        str += '</div>'
    })
    $('#test').append(str)
}
// 点击加入购物车按钮函数
function getInfo(index) {  // 本来传了两个参数，改成一个参数了。
    // console.log(index)
    var shopObj = list[index];
    shopObj.num = 1;  // 加入的购物车数量设定为1
    // console.log(shopObj)
    addCart(shopObj) // 执行加入购物车函数
}
// 购物车函数
function addCart(shopObj) {
    var cartListStr = getItem('pxyCart') //设置购物车的商品信息
    if(cartListStr){ // 如果商品存在
        var cartList = JSON.parse(cartListStr)// 把商品转为对象
        changeCart(cartList,shopObj)// 执行判断商品的函数
    } else {
        setItem('pxyCart',[shopObj]) //如果没有，点到的哪个商品就加入到‘1805cart里面
    }
}

// 判断商品是否存在函数
function changeCart(cartList,shopObj) {
    var result = false;//设置初始值为没有该数据，有为reue
    var activeIndex = 0; // 设置选中的索引值
    cartList.map(function (item,index) {
        console.log(item)
        if(item.id === shopObj.id){  //如果这个商品存在的话
            activeIndex = index; //有该数据时对应的购物车的索引值
            result = true; //
        }
    })
    // 判断拿到该商品中的数量，有的话数量加一，没有的话直接添加进去
    result ? cartList[activeIndex].num = cartList[activeIndex].num *1 +1 : cartList.push(shopObj)
    setItem('pxyCart',cartList) // 更新后的数据重新放入购物车
}

function getItem(key) {
    return localStorage.getItem(key)
    // console.log(key)
}
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