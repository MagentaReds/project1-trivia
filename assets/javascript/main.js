$(document).ready(function() {

  $("#player1-name-submit").on("click", function(event) {
    event.preventDefault();
    var name=$("#player1-name-input").val().trim();
    if(name!=="")
      main_game.joinGame(1, name);
    $("#player1-name-input").val("");
  });
  $("#player2-name-submit").on("click", function(event) {
    event.preventDefault();
    var name=$("#player2-name-input").val().trim();
    if(name!=="")
      main_game.joinGame(2, name);
    $("#player2-name-input").val("");
  });
  $("#player3-name-submit").on("click", function(event) {
    event.preventDefault();
    var name=$("#player3-name-input").val().trim();
    if(name!=="")
      main_game.joinGame(3, name);
    $("#player3-name-input").val("");
  });
  $("#player4-name-submit").on("click", function(event) {
    event.preventDefault();
    var name=$("#player4-name-input").val().trim();
    if(name!=="")
      main_game.joinGame(4, name);
    $("#player4-name-input").val("");
  });
  $("#player5-name-submit").on("click", function(event) {
    event.preventDefault();
    var name=$("#player5-name-input").val().trim();
    if(name!=="")
      main_game.joinGame(5, name);
    $("#player5-name-input").val("");
  });

  $("#chat-submit").on("click", function(event) {
    //console.log();
    event.preventDefault();
    var msg=$("#chat-input").val().trim();
    if(msg!=="")
      main_game.fbSendChatMessage(msg);
    $("#chat-input").val("");
  });

  $("#modalConfirmMovie .modal-button").on("click", function(event) {
    //cosole.log("WE CLICKED MODA:S");
    event.preventDefault();
    var action = $(this).attr("data-action");
    if (action === "reroll")
      main_game.getHintAnswer();
    else if (action === "set")
      main_game.setAnswer(movieTitle);
  });


  $("#player-ready").on("click", function() {
    var ready=main_game.windowReady();
    var num=main_game.windowNum();
    buttonReadyState(ready, num);
  });

  $("#show-plot").on("click", function() {
    $("#modalMoviePlot").modal("show");
  });


  database.ref("player/1").on("value", function(snapshot) {
    if (snapshot.exists())
      main_game.fbUpdateSeat(snapshot.key, snapshot.val());
    else
      main_game.fbUpdateSeat(snapshot.key, null);
  }, function(errorObject) {
    console.log("Errors handled: " + errObject.code);
  });
  database.ref("player/2").on("value", function(snapshot) {
    if (snapshot.exists())
      main_game.fbUpdateSeat(snapshot.key, snapshot.val());
    else
      main_game.fbUpdateSeat(snapshot.key, null);
  }, function(errorObject) {
    console.log("Errors handled: " + errObject.code);
  });
  database.ref("player/3").on("value", function(snapshot) {
    if (snapshot.exists())
      main_game.fbUpdateSeat(snapshot.key, snapshot.val());
    else
      main_game.fbUpdateSeat(snapshot.key, null);
  }, function(errorObject) {
    console.log("Errors handled: " + errObject.code);
  });
  database.ref("player/4").on("value", function(snapshot) {
    if (snapshot.exists())
      main_game.fbUpdateSeat(snapshot.key, snapshot.val());
    else
      main_game.fbUpdateSeat(snapshot.key, null);
  }, function(errorObject) {
    console.log("Errors handled: " + errObject.code);
  });
  database.ref("player/5").on("value", function(snapshot) {
    if (snapshot.exists())
      main_game.fbUpdateSeat(snapshot.key, snapshot.val());
    else
      main_game.fbUpdateSeat(snapshot.key, null);
  }, function(errorObject) {
    console.log("Errors handled: " + errObject.code);
  });

  database.ref("chat").on("child_added", function(snapshot) {
    main_game.jqDisplayChatMessage(snapshot.val().msg);
  }, function(errorObject) {
    console.log("Errors handled: " + errObject.code);
  });

  database.ref("q-chat").on("child_added", function(snapshot) {
    main_game.jqDisplayHinterChat(snapshot.val().msg);
  }, function(errorObject) {
    console.log("Errors handled: " + errObject.code);
  });

  database.ref("game").on("value", function(snapshot) {
    main_game.fbUpdateGame(snapshot.val());
  }, function(errorObject) {
    console.log("Errors handled: " + errObject.code);
  });

  database.ref("mask").on("value", function(snapshot) {
    if (snapshot.exists())
      main_game.fbUpdateMask(snapshot.val());
  }, function(errorObject) {
    console.log("Errors handled: " + errObject.code);
  });


  //main_game.fbPlayerInit();
  main_game.reset();
  $("#modalGameLoad").modal("show");

  
  $("#modalGameLoad").on("hide.bs.modal", function (event){
    $(".curtainLeft").addClass("animated slideOutLeft");
    $(".curtainRight").addClass("animated slideOutRight");

  });

});

