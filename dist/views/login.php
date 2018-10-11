<?php
    header("Content-type: text/html; charset=UTF-8");
    $username = $_GET["username"];
    $pass = $_GET["password"];
    // 用户输入用户名和密码点击登录
    // 如果用户名不存在, 默认帮用户注册.跳转到manage.html
    // 如果用户名存在, 验证密码, 如果密码验证成功, 跳转到manage.html
    // 密码验证失败，提示密码错误,返回login.html

    // 如果用户名存在,只需要验证密码,所以只需要返回密码字段即可
    $sql = "SELECT password from shop_user where username = '$username'";
    $insert_sql = "INSERT into shop_user (username, password, mark) values ('$username', '$pass', '1')";

    // 连接数据库
    $coon = new mysqli('localhost', 'root', '', 'shop_1808', '3306');
    // 设置字符集
    // 写入
    $coon -> query("set names 'utf8'");
    // 读取
    $coon -> query("set charactor set 'utf8'");
    // 执行sql语句
    $result = $coon -> query($sql);
    // 找到返回关联数组， 找不到返回null
    $rows = $result -> fetch_assoc();
    if($rows) {
        // 用户名称已经存在
        if($rows["password"] == $pass) {
            echo "
                <script>
                    location.href = 'usertent.html?username=$username';
                </script>;
            ";
        } else {
            echo "
            <script>
                alert('密码错误');
                 location.href = 'login.html';
            </script>;
            ";
        }
    } else {
        // $result = $coon -> query($insert_sql);
       
            echo "<script>alert('输入的用户名错误');</script>";
            // php直接执行
            // header("Location:usertent.html");
       
    }
?>