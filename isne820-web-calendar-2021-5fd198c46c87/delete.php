<?php
    require('./connection.php');

	$id = $_POST['id'];
    // $id = 21;

	$sql = "DELETE FROM `apointment` WHERE `id` = {$id}";
    $mysqli->query($sql);
    echo json_encode("");
?>