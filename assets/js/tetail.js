
var index = 0;
function getIndex(index) {
    $('.max-img').find('.imgBox').eq(index).fadeIn().siblings().fadeOut();
}

$('.small-img').find('span').on('click',function () {
    index = $(this).index();
    getIndex(index)
})

$('.centent-right').find('.centent-right-4').find('i').mouseenter(function(){
   $('.outer').show();
})
$('.centent-right').find('.centent-right-4').mouseleave(function(){
    $('.outer').hide();
 })

 // 
 var getInput = (function(){

    return {
        init:function(ele){
            this.$leftBtn = document.querySelector('#leftBtn');
            this.$rightBtn = document.querySelector('#rightBtn');
            this.$inp = document.querySelector('#inp');
            _num = 1;
            this.event();
           
        },
        event:function(){
            var _this = thsi;
            this.$leftBtn.onclick(function(){
                if(this == _this.$leftBtn){
                     
                }
            })
        }
    }
 }())
 
 getInput.init();