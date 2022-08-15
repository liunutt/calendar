<?php
	header('Content-Type: application/json');
	require('./connection.php');

	$id = $_POST['id'];

	$sql = "SELECT * FROM `apointment` WHERE `id` = {$id}";

    $result = $mysqli->query($sql);
    $app_data = array();
    while ($row = mysqli_fetch_assoc($result)) { array_push($app_data,$row); };
    echo json_encode($app_data[0]);
?>