<?php
	session_start();
	require('./connection.php');

    $username = $_POST['username'];
    $password = $_POST['password'];

    $result = $mysqli->query("select * from user where username = '{$username}'");
    $data = array();
    if($result->num_rows > 0){
        $row = $result->fetch_array(MYSQLI_ASSOC);

        if(password_verify($password, $row['password'])){
            $data['success'] = true;
            $_SESSION['id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
        }else{
            $data['success'] = false;
        }
    }else{
        $data['success'] = false;
    }

    echo json_encode($data);
?>