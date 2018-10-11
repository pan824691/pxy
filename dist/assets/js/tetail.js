
var index = 0;
function getIndex(index) {
    $('.max-img').find('.imgBox').eq(index).fadeIn().siblings().fadeOut();
}

$('.small-img').find('span').on('click',function () {
    index = $(this).index();
    getIndex(index)
})

// $('.centent-right').find('.centent-right-4').find('i').mouseenter(function(){
//    $('.outer').show();
// })
// $('.centent-right').find('.centent-right-4').mouseleave(function(){
//     $('.outer').hide();
//  })

var $submenu = document.querySelector('.submenu');
var $outer = document.querySelector('.outer');
var $select = $outer.querySelectorAll('select');
var $button = document.querySelector('#button');

$submenu.onmouseenter = function(){
    $outer.style.display = 'block';

}
$button.onclick = function(){
    var str = '';
    for(var i = 0; i < $select.length; i++){
       str += $select[i].value + ' ';   

    }
$submenu.innerHTML = str;
   
        $outer.style.display = 'none';
   
}
    





 var getInput = (function(){

    return {
        init:function(){
            this.$leftBtn = document.querySelector('#leftBtn');
            this.$rightBtn = document.querySelector('#rightBtn');
            this.$inp = document.querySelector('#inp');           
            this.event();
        },
        event:function(e){
            var _this = this;
            // 左边按钮点击事件
            this.$leftBtn.onclick = function(){
                if(_this.$inp.value > 1){
                    _this.$inp.value -= 1;
                }
                
            }
            // 右边按钮点击事件
            this.$rightBtn.onclick = function(){              
                _this.$inp.value = parseFloat(_this.$inp.value) +1;
            }
          
          
        }
   

        
        }
    
 }())
 
