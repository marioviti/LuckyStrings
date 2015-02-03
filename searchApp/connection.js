var mysql = require('mysql');

var connection = mysql.createConnection(
    {
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'museum',
      port : 8809
    }
);
 
module.exports = connection;
