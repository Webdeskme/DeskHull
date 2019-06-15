	var dh_protect = "no";
	if (typeof(Storage) !== "undefined") {
		var dh_prem = sessionStorage.getItem("dh_prem");
		if(dh_prem === "yes"){
			dh_protect = "yes";
		}
	}
	if(dh_protect === "no"){
		window.location.assign("/");
	}
$(document).ready(function(){
	
});
