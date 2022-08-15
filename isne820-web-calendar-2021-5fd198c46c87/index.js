$("#submit").click((e) => {
	e.preventDefault();
	var username = $(".username-box").val();
	var password = $(".password-box").val();
	var confirmPassword = $(".confirm-box").val();

	// console.table({username,password,confirmPassword});
	$("small").css("visibility","hidden");
	$.ajax({
		url:"./register.php",
		method: 'post',
		data: {username,password,confirmPassword},
		dataType: "json",
		success: (data) => {
			
			// console.table(data);
			if(typeof data.error !== "underfined")
			data.error?.forEach(element => {
				//console.log("HELLO")
				$(".error").html(element);
				$(".error").css("visibility","visible");
			});
			if(typeof data.success !== "undefined"){
				$(".success").html(data.success);
				$(".success").css("visibility","visible");
			}
		},
	})
});