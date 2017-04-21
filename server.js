var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );

var port = 3000;
var userInput = [];


app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );


// spin up server
app.listen( port, function(){
  console.log( 'server up on:', port );
});

app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  // send back index.html as response
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); // end base url


app.post( '/addGuess', function( req, res ){
  console.log( '/addGuess hit:', req.body );
  // push req.body content into allItems array
  userInput.push( req.body );
  console.log( 'userInput:', userInput);
  res.send( 200 );
}); // end /addItem

app.get( '/items', function( req, res ) {
  console.log( '/items hit' );
  // return al items array in an object
  var responseObject = {
    inventory: userInput
  }; // end responseObject
  res.send( responseObject );
}); // end /items
