// to do:
// get response from firebase to be persistant
// build timer for Minutes Away
// add timer to firebase
// pull timer into train log
// css bootstrap  
// show input and output on different pages
  // add button to pull up input
  // add button to pull up schedule
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAJMYtYIXHmqSmCskFPZTqxcJhsPob07iY",
  authDomain: "tims-7fde9.firebaseapp.com",
  databaseURL: "https://tims-7fde9.firebaseio.com",
  projectId: "tims-7fde9",
  storageBucket: "tims-7fde9.appspot.com",
  messagingSenderId: "1042851588393"
};

firebase.initializeApp(config);
// gets a reference to the firebase server
var database = firebase.database();
var newName = "";
var newDest = "";
var newArrival = 0;
var newFreq = 0;

$("#addTrain").on("click", function(event) {
  // prevent form from trying to submit/refresh the page
  event.preventDefault();


  var name = $("#name-input").val().trim();
  var destination = $("#dest-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var arrival = $("#arrival-input").val().trim();
 
// send data to firebase
  database.ref().set({
    newName: name,
    newDest: destination,
    newFreq: frequency,
    newArrival: arrival,
  });
});

database.ref().on("value", function(snapshot) {
  console.log(snapshot.val());
  $("#newName").text(snapshot.val().newName);
      newName = snapshot.val().newName;
      $("#newDest").text(snapshot.val().newDest);
      newDest = snapshot.val().newDest;
      $("#newFreq").text(snapshot.val().newFreq);
      newFreq = snapshot.val().newFreq;
      $("#newArrival").text(snapshot.val().newArrival);
      newArrival = snapshot.val().newArrival;
});
  
