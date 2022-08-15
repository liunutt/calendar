<?php

	$host = "localhost";
	$user = "root";
	$password = "";

	$mysqli = new mysqli($host,$user,$password);

	if($mysqli->query("create database CalendarProject;") == true){
		echo "Successfully create database";
	}else{
		echo "fail to create database";
	}


	if($mysqli->multi_query("
		use calendarproject;
		create table user(
			id int primary key auto_increment,
			username varchar(30) not null,
			password varchar(255) not null
		)
	") == true){
		echo "Successfully to create table";
	}else{
		echo "Fail to create table" . $mysqli->error;
	}


?>