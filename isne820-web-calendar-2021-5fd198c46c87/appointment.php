<?php
	require('./connection.php');
	session_start();

	$title =     $_POST['title'];
	$startDate = $_POST['startDate'];
	$endDate =   $_POST['endDate'];
	$startTime = $_POST['startTime'];
	$endTime =   $_POST['endTime'];
	$detail  =   $_POST['detail'];


	$sql = "insert into apointment (title,detail,start_date,start_time,end_date,end_time,userID) 
			values ('{$title}','{$detail}','{$startDate}','{$startTime}','{$endDate}','{$endTime}','{$_SESSION['id']}')";

	/*$sql = "INSERT INTO `apointment` (`id`, `title`, `detail`, `start_date`, `start_time`, `end_date`, `end_time`) VALUES (NULL, 'hello', 'hello', '2021-09-02', '02:00:50', '2021-09-25', '02:00:50')";*/
	
    $mysqli->query($sql);	
    $data = array();
    $data['success'] =true;
    echo json_encode($data);
?>