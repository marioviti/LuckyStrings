
var io = require('socket.io')();
var connection = require('./connection.js');
connection.connect();

//need to create a query module
//var queryString = 'SELECT * FROM OBJECTS LEFT JOIN DISPLAY on OBJECTS.display_id = DISPLAY.id where simple_name OR description LIKE '; 
var queryString = 'SELECT * FROM OBJECTS LEFT JOIN DISPLAY on OBJECTS.display_id = DISPLAY.id where simple_name LIKE '; 
	
	io.on('connection', function(){
  	
  		console.log('a user connected');
	
	}); 
	
	io.on('connection', function(socket){

	  socket.on('chat message', function(msg){

	    var newquery;
	    var message;
	    newquery=queryString+'\'%'+msg+'%\'';

	    connection.query(newquery, function(err, rows, fields) {
	    if (err) throw err;
	 
	    for (var i in rows) {
	        
	        message=message+rows[i].simple_name + ': '+rows[i].L2+'\n';

	        //socket.emit('chat message', message);
	        //console.log('object location: ', rows[i].L2);
	    }
	    console.log('object location: ', message);

	  });

	  });

	});

module.exports = io;
