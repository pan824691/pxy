var shopList = (function () {
     return {
        init:function (ele) {
            this.$ele = document.querySelector(ele);
            this.event();
            this.getData()
        },
         event:function () {
             var _this = this;
             this.$ele.addEventListener('click',function (e) {
                 var target = e.target || e.srcElement;
                 if(target.nodeName === 'BUTTON') {
                     var id = target.getAttribute('attr-id');
                     console.log(id)
                     _this.addCar(id);
                 }
             })
         },
         getData:function () {

            var _this = this;
             var params = {
                 url:'../assets/json/zhineng.json',
                 success:function (data) {
                     //console.log(data)
                     _this.insertData(data)
                 }
             }
             sendAjax(params);
         },
         insertData:function (data) {
            // console.log(data)
             data = data.result;
             var arr = [];
             for(var i = 0; i < data.length; i++){
                 arr.push(`
                        <div class="inner">
                           <img src = "${data[i].imgUrl}">
                           <h3>${data[i].name}</h3>
                           <p>${data[i].ps}</p>
                          
                           <h6>${data[i].price}</h6>
                          <button attr-id=${data[i].id}>加入购物车</button>
                   </div>             
                 `)
             }
             this.$ele.innerHTML = arr.join('')
         },
        addCar:function (id) {
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            for(var j = 0; j < shopList.length; j++) {
                if(shopList[j].id === id) {
                    shopList[j].count = Number(shopList[j].count) + 1;
                    break;
                }
            }
            if(j === shopList.length) {
                shopList.push({id: id, count: 1});
            }
            localStorage.shopList = JSON.stringify(shopList);
            console.log(localStorage.shopList)
        }
     }
}())
shopList.init('#test')