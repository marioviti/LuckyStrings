var queryDB = function (msg, conn, callback)
{

	conn.query( newquery, function(err, rows, fields) {
	    
	    if (err) callback(null,err);

	    callback(rows,null);

	});
	//DO STUFF
}

module.exports = queryDB;