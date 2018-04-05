// to do:

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
var minAway = 0;
var newNextTrain = 0;

$("#addTrain").on("click", function (event) {
  // prevent form from trying to submit/refresh the page
  event.preventDefault();

  var name = $("#name-input").val().trim();
  var destination = $("#dest-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var arrival = $("#firstArrival-input").val().trim();
  var firstTime = "00:00";
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("h:mm"));

  // send data to firebase
  database.ref().push({
    newName: name,
    newDest: destination,
    newFreq: frequency,
    newArrival: arrival,
    newMinAway: tMinutesTillTrain,
    newNextTrain: moment(nextTrain).format("h:mm"),
  });
});

database.ref().on("child_added", function (snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();
  // prints the info from firebase onto the screen
  $('#tbody').append(
    `
    <tr>
    <td class="tableName">${sv.newName}</td>
    <td class="tableDest">${sv.newDest}</td>
    <td class="tableFreq">${sv.newFreq}</td>
    <td class="tableArrival">${sv.newArrival}</td>
    <td class="tableMinAway">${sv.newMinAway}</td>
    <td class="tableNextTrain">${sv.newNextTrain}</td>
    </tr>`
  );
});