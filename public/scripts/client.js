$(document).ready(function(){
  console.log("client.js is here and ready.");

  $('#reset').on('click', resetGame);
  $('.container').empty();


  $('#easy').on('click', function() {
    console.log("clicked easy");
    setUpGameType ('easy');
  });//end easy click

  $('#medium').on('click', function() {
    console.log("clicked medium");
    setUpGameType('medium');
  });//end medium

  $('#hard').on('click', function() {
    console.log("clicked hard");
    setUpGameType('hard');
  });//end hard

  $('#submit').on('click', function(){
    console.log("we clicked the submit woo");

    var objectToSend = {
      guess: $( '#guess' ).val(),
    };

//user making a guess, checks for success
// calls function for all guesses
    $.ajax({
          url: '/addGuess',
          type: 'POST',
          data: objectToSend,
          success: function( response ){
            console.log(objectToSend);
            console.log( 'back from server with:', response );

            // update DOM
            getAllGuesses();
            successFail();
          } // end success
        }); // end ajax

  });


//this adds all the array items to the DOM
  function getAllGuesses(){
    $.ajax({
      url: '/items',
      type: 'GET',
      success: function( response ){
        console.log( 'back from server with:', response);
        console.log( 'back from server with:', response.inventory[0].guess);

        // empty outputDiv
        $( '.container' ).empty();
        // $('.container').append(response.guess);
        for (var i = 0; i < response.inventory.length; i++) {
          $( '.container' ).append('<div>' + response.inventory[i].guess + '</div>');
        } // end for

        // $('.container').append('SUCCESS');
      } // end success
    }); // end ajax
  } // end getInventory


});


// this sets up easy medium and hard game modes
function setUpGameType (mode){
  var buttonToSend = {
    button: mode
  };
console.log('this is button to send ->', buttonToSend);
  $.ajax({
    url: '/click',
    type: 'POST',
    data: buttonToSend,
    success: function(response){
      console.log(buttonToSend);
      console.log('click -->', response);
    }
  });
}// end setUpGameType function


//attemps to reset the game
function resetGame() {
  $('.container').empty();
  // userInput.empty();
}//end resetGame function


//this creates the success response from the server
function successFail (foo){
  $.ajax({
    url: '/success',
    type: 'GET',
    success: function(response){
      console.log('success? -->', response);
      $( '.status' ).text(response.status);
    }
  });
}//end successFail function
