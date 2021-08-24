/*
  AimPunch.js file to handle all events and animations
  Programmer:Jonathan Loyola
*/
var timervar = null; //timer for recursive call...used for animation
var el = null; //event listener
var score = 0; //score counter
var trackingScore = 0;
var shots = 0;  //shots counter
var accuracy = 0;
var accuracy = 0; //accuracy counter
var changeDir = false; //change direction boolean
var moveRight = 1; //move right counter set to default value 1
var moveLeft = 0; //move left counter set to default 0
var changeToSpawn = false; //change animation mechanism boolean
var spawnDiffEasy = false;
var spawnDiffMedium = false;
var spawwnDiffHard = false;
var spawnDiffExpert = false;
var defaultTimer = false;


//var snd = new Audio("lasersound.wav"); //incorporating sound file when target is clicked on

function timedOutReload()
{
    document.getElementById("timed-out").innerHTML= 'TIMES UP!, Click Restart';
    var rangeRemove = document.getElementById("range");
    remove(rangeRemove);
    var timerRemove = document.getElementById("timer");
    remove(timerRemove);
    document.body.style.backgroundColor = 'black';
}

function timer(x)
{
    if (x){
        var sec = 90;
        var timer = setInterval(function()
        {
            if (sec >= 0 && sec <10){
                document.getElementById('timer').innerHTML='00:'+'0'+sec;
            }
            else{
                document.getElementById('timer').innerHTML='00:'+sec;
            }
            sec--;
            if (sec < 0) 
            {
                clearInterval(timer);
                timedOutReload();
            }
        }, 1000);
    }
    else{
        document.getElementById('timer').innerHTML='00:00';
    }   
}
//getrandomintinclusive will handle spawning boundaries
function getRandomIntInclusive(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
      
//Function moveIt() will handle spawning
function moveIt()
{
    if(score >= 0 && score < 30)
    {
        spawnDiffMedium = true;
        spawnDiffEasy = false;
        el.style.top = getRandomIntInclusive(7,50) + '%';
        el.style.right = (Math.random() * 60) + '%';
        el.style.left = (Math.random() * 60) + '%';
    }
    if(score >= 30 && score < 60)
    {
        spawwnDiffHard = true;
        spawnDiffMedium = false;
        el.style.top = getRandomIntInclusive(7,50) + '%';
        el.style.right = (Math.random() * 60) + '%';
        el.style.left = (Math.random() * 60) + '%';
    }
    if(score >= 60)
    {
        spawnDiffExpert = true;
        spawnDiffHard = false;
        el.style.top = getRandomIntInclusive(7,50) + '%';
        el.style.right = (Math.random() * 60) + '%';
        el.style.left = (Math.random() * 60) + '%';
    }
    if(changeToSpawn == true && spawnDiffEasy == true)
    {
        timervar = setTimeout(moveIt,1000);
    }
    else if(spawnDiffMedium == true)
    {
        timervar = setTimeout(moveIt,800);
    }
    else if(spawwnDiffHard == true)
    {
        timervar = setTimeout(moveIt,700);
    }
    else if(spawnDiffExpert == true)
    {
        timervar = setTimeout(moveIt,500);
    }
    else
    {
        timervar = setTimeout(moveIt, 20);
    }
}
//Increase score counter, play sound when shot registers a score.
function scoreUp()
{
    score++;
    scoreboard();
}
//once reload event is called, reload the page which will call window.onload()
function reloadEvent()
{
    document.getElementById("stop-me").onclick = function()
    {
        location.reload();
    }
}
function reloadHandler()
{
    var x = document.getElementById("stop-me");
    x.style.display = "none"; //set the display of the restart button to be omitted
    //Once play button is clicked on, restart button will show up, calling reloadEvent() to handle onClick of said button
    if (x.style.display == "none"){
        x.style.display = "block";
        reloadEvent();
    }
    else{
        x.style.display = "none";
    }
}
function remove(y)
{
    //Similar to reloadHandler() but only job is to remove block elements upon an action.
    y.style.display = "block";
    if (y.style.display == "block")
    {
        y.style.display = "none";
    }
}

function scoreboard()
{
    //Scoreboard function will first attempt to get local highscore and if it does not exist, will set one upon playing for the first time.
    accuracy = ((score/shots)* 100).toFixed(2);
    var highscore = localStorage.getItem("highscore");
    var accuracyHigh = localStorage.getItem("accuracyHigh");
    if(highscore !== null)
    {
        if (score > highscore) 
        {
            localStorage.setItem("highscore", score); 
            localStorage.setItem("accuracyHigh",accuracy) ; 
        }
    }
    else
    {
        localStorage.setItem("highscore", score);
        localStorage.setItem("accuracyHigh",accuracy);
    }
    var showHighScores = document.getElementById("high-scores"); //initializing showHighScores variable to element high-scores
    showHighScores.innerHTML = 'Score: ' + highscore + '     ' + 'Acc: ' + accuracyHigh + '%'; //write high scores to div
    //if statement handles shots showing 0, score showing 0 and accuracy being calculated correctly for 0/0. Else handles outputting shots, score, and accuracy with accuracy being rounded to 2 decimal places.
    if(shots == 0 && score == 0)
    {
        document.getElementById("score").innerHTML = "Shots: " + shots + " Score: " + score  + " Accuracy: " + 0 + "%";
    }
    else
    {
        document.getElementById("score").innerHTML = "Shots: " + shots + " Score: " + score  + " Accuracy: " + accuracy + "%";
    }
}

window.onload = function () 
{
    scoreboard(); //call the scoreboard to show preloaded.
    //Once play me is clicked...
    timer(defaultTimer);
    document.getElementById("play-me").onclick = function () 
    {
        defaultTimer = true;
        timer(defaultTimer);
        el = document.getElementById("img1");  //getting the Cannon Image by ID
        el.onclick = scoreUp;
        //...remove High Scores heading
        var removeHSHeading = document.getElementById("high-scores-heading");
        remove(removeHSHeading);
        //...remove high scores integer value
        var removeHS = document.getElementById("high-scores");
        remove(removeHS);
        //...remove play button
        var removePlayMe = document.getElementById("play-me");
        remove(removePlayMe);
        //...remove game title
        var removeGameTitle = document.getElementById("game-title");
        remove(removeGameTitle);
        document.getElementById("range").onclick = function () //getting the element which is Range or the clickable area on screen
        {
            shots++; //if its clicked, increment the number of shots taken
            scoreboard(); //call the ScoreBoard function to populate values
        }
        scoreboard(); //Otherwise, this assuming that only the cannon is being clicked on and getting point
        el.style.right = '5%'; //start off the target 5% from the right of the screen
        el.style.width = '10%';
        moveIt(); //call animation function
        reloadHandler(); //call reload handler to see if a reload is needed to start a new game.
    }
}