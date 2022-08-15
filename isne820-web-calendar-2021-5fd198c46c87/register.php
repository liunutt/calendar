<?php

	require("./connection.php");

	$username = $_POST['username'];
	$password = $_POST['password'];
	$confirmPassword = $_POST['confirmPassword'];
// $username = "a";
// $password = "b";
// $confirmPassword = "b";
	$data = array();

	if($username == ""){
		$data['error'][] = "Please fill in the blanks";
	}else if (strlen($username) <5) {
		$data['error'][] = "Username length must be more than 5 characters";
	}

	if($password == ""){
		$data['error'][] = "Please fill in the blanks";
	}else if (strlen($password) <5) {
		$data['error'][] = "Password length must be more than 8 characters";
	}

	if($password != $confirmPassword ){
		$data['error'][] = "Password does not match";
	}

	if(empty($data['error'])){

		$password_hash = password_hash($password, PASSWORD_DEFAULT);

		$sql = "insert into user (username,password) values ('{$username}','{$password_hash}')";
		if($mysqli->query("$sql") === true){
			$data['success'] = "Successfully register with username: {$username}";
		}else{
			$data['success'] = "Fail to insert data {$mysqli->error}";
		}

	}

	
	echo json_encode($data);
?>