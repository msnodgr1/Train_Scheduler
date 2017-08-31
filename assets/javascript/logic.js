//Mark Snodgrass
//Week 7 firebase HW


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDdGfRi-zgTfDso4JmtwbgwieuU-7jVdtY",
    authDomain: "week-7-assignment-45d45.firebaseapp.com",
    databaseURL: "https://week-7-assignment-45d45.firebaseio.com",
    projectId: "week-7-assignment-45d45",
    storageBucket: "",
    messagingSenderId: "231319189657"
  };

  firebase.initializeApp(config);

var database = firebase.database();

//initial values for the data
var train = "";
var destination = "";
var firstTime = 0;
var frequency = 0;

//capturing button click data from form
$("#submit").on("click", function(event){
  event.preventDefault();

  train = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTime = $("#firstTrain").val().trim();
  frequency = $("#frequency").val().trim();



  database.ref().push({

    train: train,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency


  });


$("#trainName").val("");
$("#destination").val("");
$("#firstTrain").val("");
$("#frequency").val("");

});

//Snapshot for data in firebase to display/convert
database.ref().on("child_added", function(childSnapshot, prevChildKey){

  var tName = childSnapshot.val().train;
  var tdest = childSnapshot.val().destination;
  var first = childSnapshot.val().firstTime;
  var freq = childSnapshot.val().frequency;

  var current = moment();
  var newfirst = first;
  var timeDif = moment().diff(moment(newfirst), "minutes");
  var remainder = timeDif % freq;

  var minutesTil = freq - remainder;


  var nextArrival = moment().add(minutesTil, "minutes");

 var nextArrival = moment(nextArrival).format("hh:mm A");



  $("#trainTable > tbody").append("<tr><td>" + tName +
   "</td><td>" + tdest + "</td><td>" + freq + "</td><td>" + 
   nextArrival + "</td><td>" + minutesTil + "</td></tr>");
});

