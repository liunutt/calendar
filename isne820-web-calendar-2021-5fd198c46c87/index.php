<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Register</title>
	<link rel="stylesheet" type="text/css" href="index.css">
	<script defer src="https://code.jquery.com/jquery-3.6.0.min.js"
			integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" 
			crossorigin="anonymous">
	</script>
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script type="text/javascript" defer  src="./index.js"></script>
</head>
<body>
	<div class="container">
		<form id="form" class ="form">
		<h1>-- Register -- </h1>
		<div>
			Username : <br>
			<input type="text" placeholder="Username" class="username-box"><br>
		</div>
		
		<div>
			Password : <br>
			<input type="password" placeholder="Password" class="password-box"><br>
		</div>
		
		<div>
			Confirm Password : <br>
			<input type="password" placeholder="Comfirm Password" class="confirm-box"><br>
			
		</div>
		
		<button id="submit">REGISTER</button>
		<small class="error">error</small><br>
		<small class="success">success</small><br>
		<a href="login.php" > sign up</a>
		</form>
	</div>
</body>
</html>