$(document).ready(function(){
if( $('#dh_login').length ){
		$("#dh_login").append('<div class="form-group"><label for="dh_login_usr">UserName:</label><input type="text" id="dh_login_usr" class="form-control" placeholder="Username"></div>');
		$("#dh_login").append('<div class="form-group"><label for="dh_login_pwd">Password:</label><input type="password" id="dh_login_pwd" class="form-control" placeholder="Password"></div>');
		$("#dh_login").append('<div class="form-group"><button type="button" id="dh_login_submit" class="form-control btn btn-success">Submit</button></div>');
		$("#dh_login_submit").click(function(){
			var usr = $("#dh_login_usr").val();
			var pwd = $("#dh_login_pwd").val();
      $.post("/dh_server.html",
			{
				type: "login",
				name: usr,
				pass: pwd
      },
      function(data, status){
			if(data === null || data === ""){
				alert("Error: No key recieved. Please try again.");
			}
			else if (data === "usr") {
				alert("Error: Your username is incorect.");
			}
			else if (data === "pwd") {
				alert("Error: Your password is incorect.");
			}
			else{
				if (typeof(Storage) !== "undefined") {
	  			sessionStorage.setItem("dh_key", data);
					sessionStorage.setItem("dh_prem", "yes");
					window.location.assign("/apps/");
				}
				else {
	  			alert("Sorry! No Web Storage support in this browser. Please use a difrent browser.");
				}
			}
                        });

		});
	}
});
