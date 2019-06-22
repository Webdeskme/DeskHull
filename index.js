$(document).ready(function(){
var fs = require('fs');
var SHA256 = require("crypto-js/sha256");
const {shell} = require('electron');
const dh_homedir = require('os').homedir();
var items = Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9");
var dh_home = dh_homedir + '/Documents/DeskHull/';
if (!fs.existsSync(dh_home)) {
	fs.mkdirSync(dh_home);
}
var dh_www = dh_homedir + '/Documents/DeskHull/www/';
if (!fs.existsSync(dh_www)) {
        fs.mkdirSync(dh_www);
}
var dh_apps = dh_homedir + '/Documents/DeskHull/apps/';
if (!fs.existsSync(dh_apps)) {
        fs.mkdirSync(dh_apps);
}
var dh_files = dh_homedir + '/Documents/DeskHull/files/';
if (!fs.existsSync(dh_files)) {
        fs.mkdirSync(dh_files);
}
var dh_db = dh_homedir + '/Documents/DeskHull/db/';
if (!fs.existsSync(dh_db)) {
        fs.mkdirSync(dh_db);
}
var dh_set = dh_homedir + '/Documents/DeskHull/db/dh_set/';
if (!fs.existsSync(dh_set)) {
        fs.mkdirSync(dh_set);
var un = "admin";
var pass = "password";
var i;
var key = "";
for (i = 0; i < 63; i++) {
	var item = items[Math.floor(Math.random()*items.length)];
	key += item;
}
pass = SHA256("pass");
pass = pass.toString();
var data = {"usr":un,"pwd":pass,"key":key};
data = JSON.stringify(data);
fs.writeFileSync(dh_set + 'admin.json', data);
}
// site map

var con = '<!DOCTYPE html><html><title>Site Map</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><body><h3>Site Map:</h3><ul>';
files = fs.readdirSync(dh_apps);
for (i = 0; i < files.length; i++) {
    if (fs.existsSync(dh_apps + files[i])) {
     // file = fs.readFileSync(dh_apps + files[i]);
      con += '<li><a href="' + encodeURIComponent(files[i]) + '" target="_blank">' + files[i] +'</a></li>';
    }
}
con += '</ul><script src="../Plugins/jquery.min.js"></script><script src="../dh_api.js"></script></body></html>';
fs.writeFile(dh_apps + 'index.html', con, function (err) {
  if (err) throw err;
  console.log('Saved Site Map!');
});

// site map Files

var con = '<!DOCTYPE html><html><title>File Map</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><body><h3>File Map:</h3><ul>';
files = fs.readdirSync(dh_files);
for (i = 0; i < files.length; i++) {
    if (fs.existsSync(dh_files + files[i])) {
     // file = fs.readFileSync(dh_apps + files[i]);
      con += '<li><a href="' + encodeURIComponent(files[i]) + '" target="_blank">' + files[i] +'</a></li>';
    }
}
con += '</ul></body></html>';
fs.writeFile(dh_files + 'index.html', con, function (err) {
  if (err) throw err;
  console.log('Saved File Map!');
});

// Save Button

$("#resset").click(function(){
	var un = $("#usr").val();
	var pass = $("#pwd").val();
	var i;
	var key = "";
	for (i = 0; i < 63; i++) {
        	var item = items[Math.floor(Math.random()*items.length)];
        	key += item;
	}
	pass = SHA256(pass);
	pass = pass.toString();
	var data = {"usr":un,"pwd":pass,"key":key};
	data = JSON.stringify(data);
	fs.writeFileSync(dh_set + 'admin.json', data);
	alert("Status: Resset");
});
});
