<?php
    header("Content-type: text/html; charset=UTF-8");
    $username = $_GET["username"];
    $pass = $_GET["password"];

    $sql = "SELECT password from shop_user where username = '$username'";
    $insert_sql = "INSERT into shop_user (username, password, mark) values ('$username', '$pass', '1')";

    // 连接数据库
    $coon = new mysqli('localhost', 'root', '', 'shop_1808', '3306');
    $coon -> query("set names 'utf8'");
    $coon -> query("set charactor set 'utf8'");
    $result = $coon -> query($sql);
    $rows = $result -> fetch_assoc();
    if($rows) {
        // 用户名称已经存在,判断密码
        if($rows["password"] == $pass) {
            echo "
                <script>
                    location.href = 'usertent.html';
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
            echo "<script>alert('输入的用户名错误');</script>";
    }
?>