
var index = 0;
function getIndex(index) {
    $('.max-img').find('.imgBox').eq(index).fadeIn().siblings().fadeOut();
}

$('.small-img').find('span').on('click',function () {
    index = $(this).index();
    getIndex(index)
})