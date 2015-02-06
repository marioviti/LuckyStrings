var express = require('express');
var connection = require('../connection.js');
var router = express.Router();
var queryDb = require('../queryDB.js');
var url = require('url');
var fs = require('fs');

connection.connect();

/* GET home page. */
router.get('/', function(req, res) {
	//display homepage
  	res.render('index', { title: 'searchMuseum' });

});

/* GET home page. */
router.get('/form', function(req, res) {

	var urlObj=url.parse(req.url,true);

	var json = urlObj.query;
	console.log(urlObj.query.search);
	console.log("SEARCHING");


	queryDb(urlObj.query.search,connection,function(data,err){
			fs.writeFileSync('../public/objects.json', JSON.stringify(data));

	});

	res.render('index', { title: 'searchMuseum' });


});

module.exports = router;
