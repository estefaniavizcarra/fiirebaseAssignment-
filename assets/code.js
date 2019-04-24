  // Initialize Firebase
  $(document).ready(function(){

  var config = {
    apiKey: "AIzaSyAd8dLaup0qiGxvAMKW0S15qsNejw2wnZU",
    authDomain: "fir-assignment-42105.firebaseapp.com",
    databaseURL: "https://fir-assignment-42105.firebaseio.com",
    projectId: "fir-assignment-42105",
    storageBucket: "fir-assignment-42105.appspot.com",
    messagingSenderId: "900102790076"
  };
  firebase.initializeApp(config);
  var dataRef= firebase.database()

  var trainName="";
  var destination="";
  var frequency=0;


  // $(document).on("click", "button", function() {
    $("#submit").on("click", function(event) {
      event.preventDefault();
      console.log("test")
      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      firstTrainTime= $("#trainTime").val().trim();
      frequency= $("#frequency").val().trim();

    console.log(firstTrainTime)


    var timeFrecuency=frequency;
    console.log(timeFrecuency);


    var firstTime= firstTrainTime;
   console.log(firstTime)

    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);222
    // time at the moment
    var realTime = moment();
    console.log("CURRENT TIME: " + moment(realTime).format("hh:mm"));
    // Rest of hours
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time left
    var tRest = diffTime % timeFrecuency;
    console.log(tRest);
    //minutos para llegar al tren


    var minutesTrain = timeFrecuency - tRest;
    console.log("MINUTES TILL TRAIN: " + minutesTrain);

    var nextTrain = moment().add(minutesTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var trainTime = moment(nextTrain).format("hh:mm");
    console.log(trainTime)


      dataRef.ref().push({
        trainName:trainName,
        destination:destination,
        frequency:frequency,       
        firstTrainTime:firstTrainTime,
        // trainTime:trainTime,
        // minutesTrain: minutesTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP	


      });
    });
        dataRef.ref().on("child_added", function(childSnapshot){

            console.log(childSnapshot.val().trainName);
            console.log(childSnapshot.val().destination);
            console.log(childSnapshot.val().frequency);
            console.log(childSnapshot.val().firstTrainTime);
            console.log(childSnapshot.val().trainTime);
            console.log(childSnapshot.val().dateAdded);

           var childSnapshotVal = childSnapshot.val();

           $("#table").append("<tr><td> " + childSnapshotVal.trainName + 
           " </td><td class='destination'> " + childSnapshotVal.destination + 
           " </td><td class='frequency'> " + childSnapshotVal.frequency +
           " </td><td class='trainTime'> " + childSnapshotVal.trainTime +
           " </td><td class='tMinutesTillTrain'> " + childSnapshotVal.minutesTrain +
           " </td></tr>");
     
     
     });
     

          dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

            var sv = snapshot.val();
            
                  console.log(sv.name);
                  console.log(sv.destination);
                  console.log(sv.frequency);
                  console.log(sv.trainTime);
            
            
            $("#trainName").text(snapshot.val().trainName);
            $("#destination").text(snapshot.val().destination)
            $("#frequency").text(snapshot.val().frequency)
            $("#trainTime").text(snapshot.val().trainTime)
            
            
            });
          });

            
