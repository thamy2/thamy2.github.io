 $( function() {
    $( "#accordion" ).accordion();
  } );

  $( function() {
  	$( "#accordion" ).accordion()
    	$( "#accordion" ).accordion({ header: "h3", collapsible: true, active: false });
  } );
var myjason = { venue: "Big Hall", artist: "Carimi", genre: "Kompa", city: "Brooklyn", date: "2019-12-31", event: "New Year Celebration", price: "30" };
var myJSON = JSON.stringify(myjason);
document.getElementById("venue").innerHTML = jason.JSON;