$('button').click(() => {
	var username = $('.username-box').val();
	var password = $('.password-box').val();

	$("small").css("visibility","hidden");
	$.ajax({
		url: './loginValidate.php',
		method: 'POST',
		data: {username,password},
		dataType: 'json',
		success: (data) =>{
			if(data.success){
				Swal.fire({
  					position: 'center',
 					icon: 'success',
  					title: 'LOGIN SUCCESS',
 					showConfirmButton: false,
  					timer: 2500
				})
				setTimeout(function(){window.location.href = "./welcome.php";}, 3000);
			}else {
				$(".error").html("USERNAME or PASSWORD incorrect");
				$(".error").css("visibility","visible");
			}
		},
	})
});