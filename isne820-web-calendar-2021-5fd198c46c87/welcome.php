<?php
	session_start();
	if(!isset($_SESSION['id'])){
		header("Location:login.php");
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="./welcome.css">
	<title>Welcome</title>
</head>
<body>
	<div class="container">
		<div class="welcome">
			WELCOME TO CALENDAR
			<div>
				ARE YOU READY TO GO TO HOME PAGE!
				<div>
					LET'S GO!
					<div>
						<button onclick="myFunction()">GO!</button>
					</div>
				</div>
			</div>
		</div>
<script>
		function myFunction() {
  			window.location.href = "./calendar2.php";
		}
</script>
	</div>
</body>
</html>