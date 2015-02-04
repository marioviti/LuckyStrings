var newquery = 
"SELECT"
"o.id as objectid,"
"d.id as displayid,"
"o.description,"
"o.simple_name,"
"d.l2"
"FROM"
"OBJECTS o"
"INNER JOIN DISPLAY d ON d.id = o.display_id "
"where simple_name LIKE '%fos%'"
"ORDER BY "
"d.l2";

var queryDB = function (msg, conn, callback)
{

	conn.query( newquery, function(err, rows, fields) {
	    
	    if (err) callback(null,err);

	    callback(rows,null);

	});
	//DO STUFF
}

module.exports = queryDB;