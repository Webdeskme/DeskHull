// Require express and create an instance of it
var fs = require('fs');
var SHA256 = require("crypto-js/sha256");
const {shell} = require('electron');
var express = require('express');
var app = express();
const dh_homedir = require('os').homedir();
var dh_www = dh_homedir + '/Documents/DeskHull/www/';
var dh_apps = dh_homedir + '/Documents/DeskHull/apps/';
var dh_db = dh_homedir + '/Documents/DeskHull/db/';
var dh_set = dh_homedir + '/Documents/DeskHull/db/dh_set/';
//app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies
// on the request to root (localhost:7070/)
app.use("/", express.static(dh_www));
var dh_protect = function(req, res, next) {
	if (typeof(Storage) !== "undefined") {
		var tkey = sessionStorage.getItem("dh_key");
		var cred = fs.readFileSync(dh_set + "admin.json");
		cred = JSON.parse(cred);
		if(tkey === cred.key){
			console.log('Storage enabled - key: ' + tkey);
		}
  	else{
			console.log("Bad key");
		}
	}
	else {
  	console.log('Storage not enabled in your browser!');
	}
    next();
};
app.use("/apps", express.static(dh_apps));
app.post('/dh_server.html', function (req, res) {
	if(req.body.type = "login"){
	var name = req.body.name;
	var pass = req.body.pass;
	var items = Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9");
	var cred = fs.readFileSync(dh_set + "admin.json");
	cred = JSON.parse(cred);
	if(cred.usr === name){
		pass = SHA256(pass);
		pass = pass.toString();
		if(pass === cred.pwd){
			var i;
			var key = "";
			for (i = 0; i < 63; i++) {
		        	var item = items[Math.floor(Math.random()*items.length)];
		        	key += item;
			}
			var data = {"usr":name,"pwd":pass,"key":key};
			data = JSON.stringify(data);
			fs.writeFileSync(dh_set + 'admin.json', data);
			res.send(key);
			console.log(name + " just logged in.");
		}
		else{
			res.send("pwd");
		}
	}
	else{
		res.send("usr");
	}
}
else{
	var key = req.body.key;
	var db = req.body.db;
if(req.body.type = "ntable"){
	var table = req.body.table;
	var col = req.body.col;
	if (!fs.existsSync(dh_db + db)) {
	        fs.mkdirSync(dh_db + db);
	}
}

else if(req.body.type = "ddb"){

}

else if (req.body.type = "dtable"){

}

else if (req.body.type = "nrow"){

}

else if (req.body.type = "urow"){

}

else if (req.body.type = "drow"){

}

else if (req.body.type = "ucell"){

}

else if (req.body.type = "vtable"){

}

else if (req.body.type = "vrow"){

}
}
});

// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(7070, function () {
    console.log('DeskHull listening on port 7070.');
});
