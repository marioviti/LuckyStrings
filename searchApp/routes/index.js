var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {

	console.log(req.query.search)
  	res.render('index', { title: 'searchMuseum' });

});

module.exports = router;
