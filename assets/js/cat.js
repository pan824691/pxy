renderDOM()
function renderDOM () {
    var $goShopping = document.querySelector('.goShopping');
    var $priceBox = document.querySelector('.priceBox')
    var $table = document.querySelector('#tb');
  
    var cartListStr = getItem('pxyCart')
    // 重置基础DOM结构
    $('#tb').html('<tr class="min table table-hover" style="height:60px; color: #9ea5ab;font-size:12px;" >\n' +
        '            <td style="width:80px; border:none;line-height:60px;">\n' +
        '                <input type="checkbox" id="allCheck" checked/>全选\n' +
        '            </td>\n' +
        '            <td style="width:250px; border:none;line-height:60px;">名称</td>\n' +
        '            <td style="width:350px; border:none;line-height:60px;">图片</td>\n' +
        '            <td style="width:250px; border:none;line-height:60px;">单价(元)</td>\n' +
        '            <td style="width:300px; border:none;line-height:60px;">数量</td>\n' +
        '            <td style="width:200px; border:none;line-height:60px; ">操作</td>\n' +
        '        </tr>')
    if (cartListStr) {
        // 购物车有数据
        // console.log( $goShopping)
        var cartList = JSON.parse(cartListStr);
        $goShopping.style.display = 'none';
        // console.log('有数据')
        // 添加DOM
        cartList.map(function (item, index) {
        
            $('#tb').append('<tr style=" border-top:1px solid #e0e0e0; height:150px;">\n' +
                '                    <td style=" border:none; line-height:150px;">\n' +
                '                        <input type="checkbox" name="check" index="'+index+'" checked/>\n' +
                '                    </td style=" border:none;line-height:150px;">\n' +
                '                    <td style=" border:none;line-height:150px;">'+item.name+'</td>\n' +
                '                    <td style=" border:none;line-height:150px;"><img src="'+item.imgUrl+'"  style="width: 60px"/></td>\n' +
                '                    <td style=" border:none;line-height:150px;">'+item.price+'</td>\n' +
                '                    <td style=" border:none;line-height:150px;">\n' +
                '                        <input type="number" min="1" step="1" value="'+item.num+'" onchange="changeNum(event, '+index+')" class="inp">\n' +
                '                    </td>\n' +
                '                    <td style=" border:none;line-height:150px;">\n' +
                '                        <button id="deteleBtn" class="btn btn-danger"  >删除</button>\n' +
                '                    </td>\n' +
                '                </tr>'

            )
        })
        selectFn()       
        // countFn() // 遍历结束之后计算总数与总价  ----  选择结束之后调用
        // 删除事件

    } else {
        $('.priceBox').css("display","none")
        $('.table').css("display","none")
        // $priceBox.style.display = 'none';
        // $table.style.display = 'none';
        $goShopping.style.display = 'block';
        // console.log($table)
        // console.log('没有数据')
        // 购物车没有数据
        // console.log('没有数据')
        // $('#tb').append('<tr><td colspan="6">购物车空空如也，<a href="http://localhost:8080/index%20.html">去购物</a></td></tr>')
        // countFn()// 遍历结束之后计算总数与总价  ----  选择结束之后调用
    }

}
// 提交订单
function sbmitOrder() {
    var $order = document.querySelector('.two-dimension')
    $order.style.display = 'block';
    // var cartListStr = getItem('pxyCart')
    // var cartList = JSON.parse(cartListStr);
    // var arr = [];
    // cartList.map(function (item,index) {
    //     if(item.select == 0){
    //         arr.push(item)
    //     }
    // })
    // setItem('pxyCart',arr)
   
    // window.location.href = "order.html"
}
function selectFn () {
    // 第一次进入默认是全部选中，并且计算
    var cartListStr = getItem('pxyCart')
    var cartList = JSON.parse(cartListStr);  // 先拿到所有的数据
    var selectList = cartList; // 重新赋值给选中的数据
    selectList.map(function(item){
        item.select = 1
    })
    setItem('selectlist', selectList); // 添加一条记录进去
    countFn()
    // 实现全选/反选功能
    $('#allCheck').click(function () {
        console.log(this.checked)
        $('input[name="check"]').prop('checked', this.checked)
        if(this.checked) { // 全选计算
            // 如果全选被选中
            var cartListStr = getItem('pxyCart')
            var cartList = JSON.parse(cartListStr);  // 先拿到所有的数据
            var selectList = cartList; // 重新赋值给选中的数据
            selectList.map(function(item){
                item.select = 1
            })
            setItem('selectlist', selectList); // 添加一条记录进去
        } else { // 全不选不计算
            var cartListStr = getItem('pxyCart')
            var cartList = JSON.parse(cartListStr);  // 先拿到所有的数据
            var selectList = cartList; // 重新赋值给选中的数据
            selectList.map(function(item){
                item.select = 0
            })
            setItem('selectlist', selectList); // 添加一条记录进去
        }
        countFn()  //  更改计算元 ---- 不再是1805cart，而是selectList
    })
    $('input[name="check"]').change(function () {
        // 找到所有的元素，排除选中的之后长度为0， 意思就是都被选中了
        if($('input[name="check"]').not('input:checked').size() <= 0){
            // console.log('都被选中了')
            $('#allCheck').prop('checked', true)
        } else {
            console.log('有没被选中的')
            $('#allCheck').prop('checked', false)
        }

        // console.log($(this).attr('index'))
        // 給表格中每个checkbox添加一个自定义属性index，获取索引值
        var index = $(this).attr('index') * 1;
        if(!this.checked){
            var selectListStr = getItem('selectlist')
            var selectList = JSON.parse(selectListStr);
            selectList[index].select = 0
            setItem('selectlist', selectList)
            countFn()
        } else {
            var selectListStr = getItem('selectlist')
            var selectList = JSON.parse(selectListStr);
            selectList[index].select = 1
            setItem('selectlist', selectList)
            countFn()
        }

    })
}

// 数量加减,index为第几个元素加减
function changeNum (event, index) {
       console.log(event.target.value)
    var num = event.target.value
    var cartListStr = getItem('pxyCart') // 得到购物车数据的字符串
    var cartList = JSON.parse(cartListStr); // 得到购物车数据的数组
    cartList[index].num = num * 1;
    setItem('pxyCart', cartList)
    renderDOM() // 更新视图
}

function countFn(){
    var selectListStr = getItem('selectlist')
    var selectList = JSON.parse(selectListStr);
    var totalNum = 0;  //设置总数默认0
    var totalPrice = 0; // 设置总价默认0
    if(selectListStr) {
        selectList.map(function (item, index) {
            if(item.select == 1) {
                totalNum += item.num * 1;
                totalPrice += item.price * item.num
            }

        })
    } else {
        totalNum = 0;
        totalPrice = 0;
    }
    $('#totalNum').html(totalNum);
    $('#totalNum1').html(totalNum);
    $('#totalPrice').html(totalPrice);
}
//onclick = "deleteItem('+index+')"
function deleteItem (index) {   
    // console.log(index)  // 获取删除对应元素的索引值
    var cartListStr = getItem('pxyCart') // 得到购物车数据的字符串
    var cartList = JSON.parse(cartListStr); // 得到购物车数据的数组
    cartList.splice(index, 1); // 删除当前点击的数据
    if(cartList.length == 0) { // 没有数据了
        removeItem('pxyCart') // 删除购物车本地存储数据
    } else {
        setItem('pxyCart', cartList) // 更新购物车本地存储数据
    }
    renderDOM() // 更新视图
}

// 删除提示函数
function deletePoint(){
    return {
        init:function(ele){
            this.$tableDetele = document.querySelectorAll('table')[0];
            this.$hintBox = document.querySelector('.hintBox');
            this.$aDelete = document.querySelector('.aDelete');
            this.$bDelete = document.querySelector('.bDelete');
            this.$hintBox2 = document.querySelector('.hintBox-2');
            this.$hintBoxI = $hintBox2.querySelector('i');
            this.event();
        },
        event:function(){
            var _this = this;
            this.$tableDetele.onclick = function(ev){
                console.log('aaa')
                ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                if(target.nodeName == 'BUTTON'){ //判断点击按钮才可以触发                
                    $hintBox.style.display = 'block'; 
                    $aDelete.addEventListener('click',function(){
                        target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode)
                        $hintBox.style.display = 'none'; 
                        deleteItem ()
                    })  
                    $bDelete.addEventListener('click',function(){
                        $hintBox.style.display = 'none'; 
                    }) 
                    $hintBoxI.addEventListener('click',function(){
                        $hintBox.style.display = 'none'; 
                    })            
                }
            }          
        }
    }
}

deletePoint.init()


// var $tableDetele = document.querySelectorAll('table')[0];
// var $hintBox = document.querySelector('.hintBox');
// var $aDelete = document.querySelector('.aDelete');
// var $bDelete = document.querySelector('.bDelete');
// var $hintBox2 = document.querySelector('.hintBox-2');
// var $hintBoxI = $hintBox2.querySelector('i');
// $tableDetele.onclick = function(ev){
//     console.log('aaa')
//     ev = ev || window.event;
//     var target = ev.target || ev.srcElement;
//     if(target.nodeName == 'BUTTON'){ //判断点击按钮才可以触发                
//         $hintBox.style.display = 'block'; 
//         $aDelete.addEventListener('click',function(){
//             target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode)
//             $hintBox.style.display = 'none'; 
//             deleteItem ()
//         })  
//         $bDelete.addEventListener('click',function(){
//             $hintBox.style.display = 'none'; 
//         }) 
//         $hintBoxI.addEventListener('click',function(){
//             $hintBox.style.display = 'none'; 
//         })            
//     }
// } 



function getItem (key){
    return localStorage.getItem(key)
}
function removeItem (key){
    return localStorage.removeItem(key)
}
function setItem (key, value){
    localStorage.setItem(key, JSON.stringify(value))
}

// 弹窗
function closePopup(){
    var $order = document.querySelector('.two-dimension')
    var $span = $order.querySelector('.iconfont');
    
    $span.onclick = function(e){
        $order.style.display = 'none';
    }
}
closePopup()



// 判断用户名是否有登陆
function judgeName(){
    var $priceBox = document.querySelector('.priceBox')
    var $table = document.querySelector('#tb');
    var $notNanded = document.querySelector('.loginBox');
    var $goShopping = document.querySelector('.goShopping');
    // console.log($notNanded)
    var $small = document.querySelector('.loginName');
    var url = location.search.slice(1);// 获取地址栏问号后面的内容
    function getParams(url){
        var obj = {};
        url = url.split("&");
        for(var i = 0; i < url.length; i++){
            var arr = url[i].split('=');
            obj[arr[0]] = arr[1];  // 中括号0是属性，中括号1是属性值
        }
        return obj;
    }
    var obj = getParams(url);

    if(obj.username){  // 判断用户名是否存在    
        // 用户名存在
        $small.innerHTML = obj.username;
        $('#boxSpan').find('.registerName').hide();
//         var cartListStr = getItem('pxyCart')
//         if(cartListStr){
//    console.log('有数据')
//         }
        $priceBox.style.display = 'block';
        $table.style.display = 'block';
        $notNanded.style.display = 'none';
        
    } else{
        $goShopping.style.display = 'none';
        $priceBox.style.display = 'none';
        $table.style.display = 'none';
        $notNanded.style.display = 'block';
      $('.loginName').fadeIn();//登陆内容显示
      $('#boxSpan').find('.registerName').show();
    }
}

judgeName()


var getInput = (function () {
    return {
        init: function () {
            this.$leftBtn = document.querySelector('#leftBtn');
            this.$rightBtn = document.querySelector('#rightBtn');
            // console.log(this.$rightBtn)
            this.$inp = document.querySelector('.inp');
           
            this.event();
        },
        event: function (e) {
            var _this = this;
            // 左边按钮点击事件
            this.$leftBtn.onclick = function () {
                // console.log('左边')
                if (_this.$inp.value > 1) {
                    _this.$inp.value -= 1;
                }
            }
            // 右边按钮点击事件
            this.$rightBtn.onclick = function () {
                console.log('右边')
                _this.$inp.value = parseFloat(_this.$inp.value) + 1;
            }
            
        }
        
    }
}())
getInput.init()

    
      