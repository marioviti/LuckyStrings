var mysql = require('mysql');
 
var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'museum',
      port : '8889',
    }
);
 
connection.connect();
 
var queryString = 'SELECT * FROM OBJECTS LEFT JOIN DISPLAY on OBJECTS.display_id = DISPLAY.id where simple_name OR description LIKE '; 


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('/Users/marioviti/serverTest/test1/index.html');
});

io.on('connection', function(socket){

  socket.on('chat message', function(msg){

    var newquery;
    newquery=queryString+'\'%'+msg+'%\'';

    connection.query(newquery, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        
        var message=rows[i].simple_name + ': ' ;
        message=message+rows[i].L2;

        socket.emit('chat message', message);
        console.log('object location: ', rows[i].L2);
    }
    socket.emit('chat message', '\n');

  });

  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});