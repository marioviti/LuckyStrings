var newquery =
"SELECT "+
"o.id as id, "+
//"d.id as displayid, "+
"o.simple_name as title, "+
"o.description, "+
"d.l2 "+
"FROM "+
"OBJECTS o "+
"INNER JOIN DISPLAY d ON d.id = o.display_id "+
"where simple_name LIKE ";

var order =
"ORDER BY "+
"d.l2";

var roomLocations = new Array();
roomLocations["Glass Gallery"] = new Array(752,235,0);
roomLocations["Geology Gallery"] = new Array(375,250,0);
roomLocations["Eastern Art Gallery"] = new Array(805,110,0);
roomLocations["World Wildlife Gallery"] = new Array(370,110,0);
roomLocations["Wills (Rear) Hall"] = new Array(153,155,0);
roomLocations["British Wildlife Gallery"]= new Array(535,220,0);
roomLocations["Egypt Gallery"]= new Array(250,370,0);
roomLocations["Ground Floor Lift Foyer"] = new Array(100,420,0);
roomLocations["Curiosity"] = new Array(250,140,0);
roomLocations["Winterstoke (Front) Hall"] = new Array(150,340,0);
roomLocations["Chinese Glass Gallery"] = new Array(688,120,0);
roomLocations["Sea Dragons Gallery"] = new Array(153,225,0);
roomLocations["South West Wildlife Gallery"] = new Array(50,380,0);


var floor1Obj={"id":"1","name":"Ground Floor","title":"Ground Floor",
               "map":"images/apartment/floor1.svg",
               "minimap":"images/apartment/floor1.svg",
               "locations":[]};
var floor2Obj={"id":"2","name":"First Floor","title":"First Floor",
               "map":"images/apartment/floor2.svg",
               "minimap":"images/apartment/floor2.svg",
               "locations":[]};
var floor3Obj={"id":"3","name":"Second Floor","title":"Second Floor",
               "map":"images/apartment/floor3.svg",
               "minimap":"images/apartment/floor3.svg",
               "locations":[]};
var mapplicObj={"mapwidth":"800","mapheight":"600","levels":[]};
function cloneJsonObj(data){

  var string = JSON.stringify(data);
  return JSON.parse(string);

}

function populateJson(rows){

  var floor1 = cloneJsonObj(floor1Obj);
  var floor2 = cloneJsonObj(floor2Obj);
  var floor3 = cloneJsonObj(floor3Obj);

  var mapplic = cloneJsonObj(mapplicObj);
  mapplic.levels = [floor1,floor2,floor3];
  for(var idx in rows){
    if (rows.hasOwnProperty(idx))
    {
      var itemLocation = roomLocations[rows[idx].l2];
      //console.log(itemLocation);
      if(itemLocation!=null){

        rows[idx].x = roomLocations[rows[idx].l2][0];
        rows[idx].y = roomLocations[rows[idx].l2][1];
        mapplic.levels[roomLocations[rows[idx].l2][2]].locations.push(rows[idx]);

        console.log(rows[idx]);
      }
    }
  }
  console.log(JSON.stringify(mapplic));
}


var queryDB = function (msg, conn, callback)
{
	newquery=newquery+'\'%'+msg+'%\''+order;

	conn.query( newquery, function(err, rows, fields) {

	    if (err) callback(null,err);
      populateJson(rows);
	    callback(rows,null);

	});

}

module.exports = queryDB;
