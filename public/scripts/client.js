$(document).ready(function(){
  console.log("client.js is here and ready.");

  $('#reset').on('click', function(){
    console.log("we clicked the reset woo");

  });

  $('#easy').on('click', function() {
    console.log("clicked easy");
    setUpGameType ('easy');
  });//end easy click

  $('#medium').on('click', function() {
    console.log("clicked medium");
  });//end medium

  $('#hard').on('click', function() {
    console.log("clicked hard");
  });//end hard

  $('#submit').on('click', function(){
    console.log("we clicked the submit woo");

    // var objectToSend = {
    //   guess: $( '#guess' ).val(),
    // };
// user making a guess
    $.ajax({
          url: '/addGuess',
          type: 'POST',
          data: objectToSend,
          success: function( response ){
            console.log(objectToSend);
            console.log( 'back from server with:', response );
            // update DOM
            getAllGuesses();
          } // end success
        }); // end ajax

  });

  function getAllGuesses(){
    // make ajax call to server for inventory array
    $.ajax({
      url: '/items',
      type: 'GET',
      success: function( response ){
        console.log( 'back from server with:', response.inventory );
        // empty outputDiv
        $( '.container' ).empty();
        // loop through inventory and append each to outputDiv
        for (var i = 0; i < response.inventory.length; i++) {
          $( '.container' ).append('<div>' + response.inventory[i].guess + '</div>');
        } // end for
      } // end success
    }); // end ajax
  } // end getInventory

  //censorship changes

  // more censorship changes

});

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
}
