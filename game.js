let buttonColors = ["aqua", "orangered", "purple", "mediumseagreen"];
let userClickedPattern = [];
let gamePattern = [];
let clickedPatternLastIndex = userClickedPattern[userClickedPattern.length - 1];

let level = 0;
let started = false;



$(document).keypress(function() {
   if(!started) {
       $("h1").text("Level" + " " + level);
       nextSequence();
       started = true;

       patternChecker();
   }
});



$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animateButton(userChosenColor);

    console.log(userClickedPattern);

    patternChecker(userClickedPattern.length - 1);
});



function patternChecker(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("succes");

        if(userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    }else{
        $("body").addClass("game-over");
        playSound("wrong");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        $("h1").text("Game Over Try Again!!");
        console.log("wrong");

        startOver();
    }
}




function nextSequence() {
    userClickedPattern = [];
    level++;

    $("h1").text("Level" + " " + level);

    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}



function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
}



function animateButton(currentKey) {
    $("#" + currentKey).addClass("pressed");
    setTimeout(() => {
        $("#" + currentKey).removeClass("pressed");
    }, 250);
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;   
}