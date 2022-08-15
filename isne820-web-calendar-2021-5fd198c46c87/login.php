<?php
	session_start();
	if(isset($_SESSION['id'])){
		header("Location:welcome.php");
	}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>LOGIN</title>
		<link rel="stylesheet" type="text/css" href="login.css">
	<script defer src="https://code.jquery.com/jquery-3.6.0.min.js" 
			integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" 
			crossorigin="anonymous">
	</script>
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script type="text/javascript" defer  src="./login.js"></script>
</head>
<body>
	<div class="container">
		<h1>-- Login -- </h1>
		<div>
			Username : <br>
			<input type="text" placeholder="Username" class="username-box"><br>
		</div>
		<div>
			Password : <br>
			<input type="password" placeholder="Password" class="password-box"><br>
		</div>
		<button>LOGIN</button>
		<small class="error">error</small><br>
		<a href="index.php" > sign in</a>
		
	</div>
</body>
</html>