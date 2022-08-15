<?php
	header('Content-Type: application/json');
	require('./connection.php');
    session_start();

	$title = $_POST['appdate'];

	$sql = "SELECT * FROM `apointment` WHERE `start_date` = '{$title}'AND `userID` = '{$_SESSION['id']}'";
    // $sql = "SELECT * FROM `apointment` WHERE `start_date` = '2021-10-29'AND `userID` = '18'";
    
    $result = $mysqli->query($sql);
    $app_data = array();
    while ($row = mysqli_fetch_assoc($result)) { array_push($app_data,$row); };
    // $data = array();
    // $data['app'] = $app_data;
    echo json_encode($app_data);
?>