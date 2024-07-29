var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var start = false;

var level = 0;




$(document).keydown(function(){
    if(!start){
    $("#level-title").text("Level "+level);
    nextSequence();
    start = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
 });

function nextSequence(){

    userClickedPattern = [];
    level++;

    $("#level-title").text("Level "+level);

    var randomNumber = Math.random();
    randomNumber = Math.floor((randomNumber*4));
    var randomChoseColor = buttonColours[randomNumber];
    gamePattern.push(randomChoseColor);

    $("#"+randomChoseColor).fadeIn(100).fadeOut(100).fadeIn(100); 

    playSound(randomChoseColor);
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
   $("#"+currentColor).addClass("pressed");
   setTimeout(function(){
   $("#"+currentColor).removeClass("pressed");
   }, 100); 
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("Success")
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Failure");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function startOver(){
     gamePattern = [];
     start = false;
     level = 0;
}








