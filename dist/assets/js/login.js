var login = (function(){

    return {
        init: function(ele) {
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$loginBtn = this.$ele['btn'];
            this.$usernameInp =   this.$ele['username'];
            this.$passwordInp =   this.$ele['password'];
            this.event();
        },
        event: function() {
            var _this = this;
            // 提交按钮
            this.$loginBtn.onclick = function() {
                // 发送ajax，验证用户名和密码
                var params = {
                    method: 'post',
                    data: {
                        username: _this.$usernameInp.value,
                        password: _this.$passwordInp.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        _this.loginSuccess(data);
                    }
                }
                ajax('http://localhost:1212/pro/dist/assets/php/login.php', params);
            }
        },
        loginSuccess: function(data) {
            if(data.code == 200) {
                // 后台会返回一个token值
                // token 是用户登录成功时,后台自动生成的一串代码
                // 每次发送请求时,都携带这个token值,后台才能确定当前用户登录成功,才会返回数据
                document.cookie = "token=" + data.data.token;
                document.cookie = "user-id=" + data.data.id;
                
                location.href = 'usertent.html';
            } else {
                alert(data.msg);
            }
        }
    }

}())