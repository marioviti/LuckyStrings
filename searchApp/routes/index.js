var express = require('express');
var connection = require('../connection.js');
var router = express.Router();
var queryDb = require('../queryDB.js');

connection.connect();


/* GET home page. */
router.get('/', function(req, res) {

  	res.render('index', { title: 'searchMuseum' });

});

/* GET home page. */
router.get('/form', function(req, res) {

	var urlObj=url.parse(req.url,true);

	var json = urlObj.query;
	
	queryDb(urlObj.query.search,connection,function(data,err){

			console.log(data);
			res.json(data);

		});
  	}

  	res.render('index', { title: 'searchMuseum' });

});

module.exports = router;
