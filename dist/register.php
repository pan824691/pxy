<?php
    header("Content-type: text/html; charset=UTF-8");
    $username = $_GET["username"];
    $pass = $_GET["password"];
    $coon = new mysqli('localhost', 'root', '', 'shop_1808', '3306');//连接数据库
    $insert_sql = "INSERT into shop_user (username, password, mark) values ('$username', '$pass', '1')";//插入语句
    $coon -> query("set names 'utf8'");
    $coon -> query("set charactor set 'utf8'");
    $result = $coon -> query($insert_sql);//执行插入yuju
    // $rows = $result -> fetch_assoc(); // 得到关联数组
    if($result){
        echo "<script>location.href='login.php';alert('注册成功')</script>";
    } else {
        echo "<script>alert('注册失败');</script>";
    }
?>