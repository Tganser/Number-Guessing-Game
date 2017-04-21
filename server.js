var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var ranNum = require('./public/scripts/module');

var port = 3000;
var userInput = [];
var guess;
var secretEasyNumber;
var secretMedNumber;
var secretHardNumber;
var success = false;

console.log(ranNum);

app.use( express.static( 'public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );


// spin up server
app.listen( port, function(){
  console.log( 'server up on:', port );
});

//easy, medium, hard button
app.post('/click', function(req, res){
  if(req.body.button === "easy"){
    secretEasyNumber = ranNum(1,10);
    console.log("secretEasyNumber ->", secretEasyNumber);
    console.log('bang', req.body.button);
    res.send('Prince');
    }


  else if (req.body.button === "medium") {
    console.log('Little Red Corvette', req.body.button);
    secretMedNumber = ranNum(1,100);
    console.log("secretMedNumber ->", secretMedNumber);
    res.send('Purple Rain');
  }
  else if (req.body.button === "hard") {
    console.log('1999', req.body.button);
    secretHardNumber = ranNum(1,1000);
    console.log("secretHardNumber ->", secretHardNumber);
    res.send('When Doves Cry');
  }

});

// app.post('/mediumClick', function(req, res){
//   console.log('SHIT');
// });

//this brings the html up
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  // send back index.html as response
  res.sendFile( path.resolve( 'public/views/index.html' ) );
}); // end base url


//add the user's guess to the array
app.post( '/addGuess', function( req, res ){
  console.log( '/addGuess hit:', req.body );
  // push req.body content into userInput array
  userInput.push( req.body );
  guess = req.body;
  console.log("guess is : ", guess.guess);
  if (guess.guess === String(secretEasyNumber)){
    console.log("you got it dude!");
    success = true;
    // // res.send(200 );
    // res.head();
    res.write('guess');
    // response.write('boop');
    // res.send("success");
    res.end();
    // res.send(guess);
  }
  else {
    console.log("try again");
    console.log( 'userInput:', userInput);
  res.send(200 );
  }
}); // end /addGues


app.get( '/items', function( req, res ) {
  console.log( '/items hit' );
  // return al items array in an object
  var responseObject = {
    inventory: userInput
  }; // end responseObject
  res.send( responseObject );
}); // end /items


app.get('/success', function(req, res){
  var responseObject2 = {
    status : "successful",
  };
  var responseObject3 = {
    status : "unsuccesful",
  };

  if (success === true){
    res.send(responseObject2);
  }
  else {
    res.send(responseObject3);
  }
});

function resetAll(){
  userInput.empty();

}
