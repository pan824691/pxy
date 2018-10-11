renderDOM()
function renderDOM () {
    var cartListStr = getItem('pxyCart')
    // 重置基础DOM结构
    $('#tb').html('<tr class=".table-striped min">\n' +
        '            <td>\n' +
        '                <input type="checkbox" id="allCheck" checked/>全选\n' +
        '            </td>\n' +
        '            <td>名称</td>\n' +
        '            <td>图片</td>\n' +
        '            <td>价格</td>\n' +
        '            <td>数量</td>\n' +
        '            <td>操作</td>\n' +
        '        </tr>')
    if (cartListStr) {
        // 购物车有数据
        var cartList = JSON.parse(cartListStr);
        // 添加DOM
        cartList.map(function (item, index) {
            $('#tb').append('<tr>\n' +
                '                    <td>\n' +
                '                        <input type="checkbox" name="check" index="'+index+'" checked/>\n' +
                '                    </td>\n' +
                '                    <td>'+item.name+'</td>\n' +
                '                    <td><img src="'+item.imgUrl+'"  style="width: 60px"/></td>\n' +
                '                    <td>'+item.price+'</td>\n' +
                '                    <td>\n' +
                '                        <input type="number" min="1" step="1" value="'+item.num+'" onchange="changeNum(event, '+index+')">\n' +
                '                    </td>\n' +
                '                    <td>\n' +
                '                        <button  class="btn btn-danger"  onclick = "deleteItem('+index+')">删除</button>\n' +
                '                    </td>\n' +
                '                </tr>'

            )
        })
        selectFn()
        // countFn() // 遍历结束之后计算总数与总价  ----  选择结束之后调用

    } else {
        // 购物车没有数据
        $('#tb').append('<tr><td colspan="6">购物车空空如也，<a href="index.html">去购物</a></td></tr>')
        // countFn()// 遍历结束之后计算总数与总价  ----  选择结束之后调用
    }
}
// 提交订单
function sbmitOrder() {
    var cartListStr = getItem('pxyCart')
    var cartList = JSON.parse(cartListStr);
    var arr = [];
    cartList.map(function (item,index) {
        if(item.select == 0){
            arr.push(item)
        }
    })
    setItem('pxyCart',arr)
    window.location.href = "order.html"
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
//        console.log(event.target.value)
    var num = event.target.value
    var cartListStr = getItem('pxyCart') // 得到购物车数据的字符串
    var cartList = JSON.parse(cartListStr); // 得到购物车数据的数组
    cartList[index].num = num * 1;
    setItem('pxyCart', cartList)
    renderDOM() // 更新视图
}

function countFn(){
    // var cartListStr = getItem('1805cart') // 得到购物车数据的字符串
    // var cartList = JSON.parse(cartListStr); // 得到购物车数据的数组
    var selectListStr = getItem('selectlist')
    var selectList = JSON.parse(selectListStr);
    var totalNum = 0;
    var totalPrice = 0;
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
    $('#totalPrice').html(totalPrice);
}

function deleteItem (index) {
    console.log(index)  // 获取删除对应元素的索引值
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

function getItem (key){
    return localStorage.getItem(key)
}
function removeItem (key){
    return localStorage.removeItem(key)
}
function setItem (key, value){
    localStorage.setItem(key, JSON.stringify(value))
}