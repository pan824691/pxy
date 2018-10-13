var register = (function(){
    return {
        init: function(ele) {

            this.$ele = document.querySelector(ele);
            this.$loginBtn = this.$ele['login-btn'];
            this.$usernameInp =   this.$ele['username'];
            this.$passwordInp =   this.$ele['password'];
            this.event();
        },
        event: function() {
            var _this = this;
            this.$loginBtn.onclick = function() {
                var params = {
                    method: 'post',
                    data: {
                        username: _this.$usernameInp.value,
                        password: _this.$passwordInp.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        _this.register(data);
                    }
                }
                ajax('http://localhost:1212/pro/dist/assets/php/register.php', params);
            },
                // 判断用户名称是否存在
                this.$usernameInp. addEventListener('change', function(){
                    var params = {
                        method: 'post',
                        data: {
                            username: _this.$usernameInp.value
                        },
                        success: function(data) {
                            data = JSON.parse(data);
                            _this.checkUsername(data);
                        }
                    }
                    ajax ('http://localhost:1212/pro/dist/assets/php/check_username.php', params);
                }, false);
        },
        checkUsername: function(data) {
            if(data.code == 200) {
                this.$usernameInp.className = 'inp success';
                this.$loginBtn.disabled = '';
            } else {
                alert(data.msg);
                this.$usernameInp.className = 'inp error';
                this.$loginBtn.disabled = 'true';
            }
        },
        register: function(data) {
            if(data.code == 200) {
                alert('注册成功');
                location.href = 'login.html';
            } else {
                alert(data.msg);
            }
        }
    }

}())


$(function(){
    $(".inner").mousedown(function(e){
        var el = $(".inner"),os = el.offset(),dx,$span=$(".outer>span"),$filter=$(".filter-box"),_differ=$(".outer").width()-el.width();
        $(document).mousemove(function(e){
            dx = e.pageX - os.left;
            if(dx<0){
                dx=0;
            }else if(dx>_differ){
                dx=_differ;
            }
            $filter.css('width',dx);
            el.css("left",dx);
        });
        $(document).mouseup(function(e){
            $(document).off('mousemove');
            $(document).off('mouseup');
            dx = e.pageX - os.left;
            if(dx<_differ){
                dx=0;
                $span.html("滑动解锁");
            }else if(dx>=_differ){
                dx=_differ;
                $(".outer").addClass("act");
                $span.html("验证通过！");
                el.html('&radic;');
            }
            $filter.css('width',dx);
            el.css("left",dx);

        })
    })
})

// 下拉菜单
var $inpcycode = $('.inp-cycode')

var $container = $('.container');
var $bAll = $container.find('ul').find('li').find('b');
$('.selectBox').find('i').on('click',function(){
   $('.container').show()
})
$('.container').find('ul').find('li').on('click',function(){
   console.log('进来了')
    var str = '';
    for(var k = 0; k < $bAll.length; k++){
       str += $bAll[k].value;
    }
    $inpcycode.innerHTML = str;
    $container.hide();
})






