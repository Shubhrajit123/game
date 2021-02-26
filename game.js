
var started = false

var level = 0;

var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedArray = [];

$(document).keypress(function(e) {

  if(started == false){
    nextSequence();
    started = true;
  }

});

$(".btn").on("click", function() {

  var userChosenColor = $(this).attr("id");

  cliclOnAnimation(userChosenColor);

  userClickedArray.push(userChosenColor);

  console.log(userClickedArray);

  playSound(userChosenColor);

  checkAnswer(userClickedArray.length-1);

});

function checkAnswer(i) {

  if (gamePattern[i] === userClickedArray[i]) {

    console.log("success");

    if (userClickedArray.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");

    setTimeout(function() {

      $("body").removeClass("game-over");

    }, 200);

    $("h1").text("Game Over, Press any key to restart");

    startOver();

  }

}


//Function area.

function nextSequence() {

  userClickedArray = [];

  var randNo = Math.floor(Math.random() * 4);

  var randChosenColor = buttonColor[randNo];

  gamePattern.push(randChosenColor);

  //console.log(gamePattern);

  level++;

  $("#level-title").text("level " + level);

  $("#" + randChosenColor).fadeOut(100).fadeIn(100);

  var id = $("#" + randChosenColor).attr("id");

  playSound(id);



  //console.log(gamePattern);

}

//sound function

function playSound(color) {

  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();

}

//Click Animation Function

function cliclOnAnimation(currentColor) {

  $("#" + currentColor).toggleClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).toggleClass("pressed");
  }, 100);

}

function startOver() {

  started = false;
  level = 0;
  gamePattern = [];

}
