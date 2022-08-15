<?php
	require('./connection.php');
	session_start();

	$title =     $_POST['title'];
	$startDate = $_POST['startDate'];
	$endDate =   $_POST['endDate'];
	$startTime = $_POST['startTime'];
	$endTime =   $_POST['endTime'];
	$detail  =   $_POST['detail'];
    $id = $_POST['id'];


	$sql = "UPDATE `apointment` SET `title` = '${title}',`start_date` = '${startDate}',`end_date` = '${endDate}',`start_time` = '${startTime}',`end_time` = '${endTime}',`detail` = '${detail}' WHERE `id` = '{$id}'";

	/*$sql = "INSERT INTO `apointment` (`id`, `title`, `detail`, `start_date`, `start_time`, `end_date`, `end_time`) VALUES (NULL, 'hello', 'hello', '2021-09-02', '02:00:50', '2021-09-25', '02:00:50')";*/
	
    $data = array();
    $data['bo'] = $mysqli->query($sql);	
    
    $data['success'] =true;
    $data['sql'] = $sql;
    echo json_encode($data);
?>