var userClickedPattern = [];
var gamePattern = [];


var buttonColors = ["red", "blue", "green", "yellow"];


function nextSequence() {
    level++;
    $("#level-title").text("Level"+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("soundsSimonGame/" + randomChosenColor + ".mp3");
    audio.play();
}



$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length)-1);
});

function playSound(name) {
    var audio = new Audio("soundsSimonGame/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    // $("#"+currentColor).addClass("pressed");
    $("#" + currentColor).addClass('pressed');
    setTimeout(function () {
        $("#" + currentColor).removeClass('pressed');
    }, 100);
}

var started = false;
var level = 0;
$(document).keypress(function(){
    if (!started) {
        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }