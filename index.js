var http = require( 'http' ) ,
    url = require( 'url' ) ;

var port = 8080,
    month = [ "January" , "February" , "March" , 
	      "April" , "May" , "June" , 
	      "July" , "August" , "September" , 
	      "October" , "November" , "December" ] ;

function dig2(n){
	return ( "0" + n ).substr( ( "0" + n ).length - 2 , 2 );
}

function parseTime ( time ) {
        return {
                hour: { num: time.getHours( ) , format2: dig2( time.getHours( ) ) } ,
                minute: { num: time.getMinutes( ) , format2: dig2( time.getMinutes( ) ) } ,
                second: { num: time.getSeconds( ) , format2: gig2( time.getSeconds( ) ) }
        }
}

function parseDate( date ) {
        return { 
                day: { num: date.getDate( ) } ,
                month: { num: date.getMonth( ) , short: month[date.getMonth( ) ].substr( 0, 3 ) , full: month[date.getMonth( ) ] } ,
                year: { full: date.getFullYear( ), short: date.getFullYear( ).toString( ).substr( 2, 2 ) }
        }
}
   
var server = http.createServer(function ( req, res ) {
	var date = req.url.substr( req.url.lastIndexOf( '/' ) + 1 ) ,
	    json = { "unix": null, "natural": null } ;

	if( date != '' ) {
		date = decodeURI( date ) ;
		if(!isNaN(parseInt( date ) ) ) {
			date = parseInt( date ) * 1000 ;
		}
		var d = new Date( date ) ;
		if( d.toString() !== "Invalid Date" ) {
			var ymd = parseDate( d ) ,
			    utime = d.getTime( ) / 1000 ;

			json["unix"] = utime ;
			json["natural"] = ymd.month.full + " " + ymd.day.num + ", " + ymd.year.full ;
		}
	}
	//null data returned for bad urls
	res.writeHead( 200 , { 'Content-Type': 'application/json' } ) ;
	res.end( JSON.stringify( json ) ) ;
})

server.listen( process.env.PORT || Number( port) ) ;
