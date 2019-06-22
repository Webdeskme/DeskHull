// Require express and create an instance of it
var fs = require('fs');
var SHA256 = require("crypto-js/sha256");
const {shell} = require('electron');
var express = require('express');
var app = express();
const dh_homedir = require('os').homedir();
var dh_www = dh_homedir + '/Documents/DeskHull/www/';
var dh_apps = dh_homedir + '/Documents/DeskHull/apps/';
var dh_files = dh_homedir + '/Documents/DeskHull/files/';
var dh_db = dh_homedir + '/Documents/DeskHull/db/';
var dh_set = dh_homedir + '/Documents/DeskHull/db/dh_set/';
//app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true})); // to support URL-encoded bodies
// on the request to root (localhost:7070/)
app.use("/", express.static(dh_www));
/*var dh_protect = function(req, res, next) {
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
};*/
app.use("/apps", express.static(dh_apps));
app.use("/files", express.static(dh_files));
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

		var cred = fs.readFileSync(dh_set + "admin.json");
		cred = JSON.parse(cred);
		if(key === cred.key){
	var db = req.body.db;
	var table = req.body.table;
if(req.body.type = "insert"){
	var row = req.body.row;
	var col = req.body.col;
	var data = req.body.data;
	if (fs.existsSync(dh_db + db + "/" + table + ".js")){
		var obj = readFileSync(dh_db + db + "/" + table + ".js");
		obj = JSON.parse(obj);
		obj[row][col] = data;
		obj = JSON.stringify(obj);
		fs.writeFileSync(dh_db + db + "/" + table + ".js", obj);
	}
	else{
		res.send("error: no table exists");
	}
}
else if (req.body.type = "drow"){
	var row = req.body.row;
	if (fs.existsSync(dh_db + db + "/" + table + ".js")){
		var obj = readFileSync(dh_db + db + "/" + table + ".js");
		 obj = JSON.parse(obj);
		 delete(obj[row]);
		 obj = JSON.stringify(obj);
		 fs.writeFileSync(dh_db + db + "/" + table + ".js", obj);
		 res.send("deleted");
	}
	else{
		res.send("error: no table exists");
	}
}
else if (req.body.type = "vtable"){
	if (fs.existsSync(dh_db + db + "/" + table + ".js")){
		var data = readFileSync(dh_db + db + "/" + table + ".js");
		res.send(data);
	}
}
}
else{
	console.log("Bad key");
	res.send("Bad Key")
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
