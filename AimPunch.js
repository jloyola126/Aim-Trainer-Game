/*
  AimPunch.js file to handle all events and animations
  Programmer:Jonathan Loyola
*/
var timervar = null; //timer for recursive call...used for animation
var el = null; //event listener
var score = 0; //score counter
var shots = 0;  //shots counter
var accuracy = 0; //accuracy counter
var changeDir = false; //change direction boolean
var moveRight = 1; //move right counter set to default value 1
var moveLeft = 0; //move left counter set to default 0
var changeToSpawn = false; //change animation mechanism boolean

var snd = new Audio("lasersound.wav"); //incorporating sound file when target is clicked on
      
//Function moveIt() will handle animations
function moveIt()
{
    //if target reaches 90% from the right side of the page, call a change to direction, set the default starting point to that percentage
    if(parseInt(el.style.right) > 90 && moveRight == 0){
    changeDir = true;
    el.style.right = '90%';
    }
    //if target reaches 0% from the right side of the page, call a change to direction, set the default starting point to that percentage
    if(parseInt(el.style.right) < 0 && moveLeft == 1){
    changeDir = false;
    el.style.right = '0%';
    }
    /*
    Depending on the direction boolean and score counter, create patterns that increase in difficulty
    parseInt will strip away the integer value from the full expression and add it back for movement.
    */
    /*if (changeDir == true && score < 2){
    el.style.right = parseInt(el.style.right) - 1 + '%';
    moveLeft = 1;
    }
    if (changeDir == false && score < 2){
    el.style.right = parseInt(el.style.right) + 1 + '%';
    moveRight = 0;
    }
    if (changeDir == true && score >= 5){
    el.style.right = parseInt(el.style.right) - 2 + '%';
    el.style.top = 4 + (8 * Math.tan(parseInt(el.style.right)/5)) + '%';
    moveLeft = 1;
    }
    if (changeDir == false && score >= 5){
    el.style.right = parseInt(el.style.right) + 2 + '%';
    el.style.top = 4 + (8 * Math.tan(parseInt(el.style.right)/5)) + '%';
    moveRight = 0;
    }
    if (changeDir == true && (score >= 2 && score < 4)){
    el.style.width = '2.5%';
    el.style.right = parseInt(el.style.right) - 2 + '%';
    moveLeft = 1;
    }
    if (changeDir == false && (score >= 2 && score < 4)){
    el.style.width = '2.5%';
    el.style.right = parseInt(el.style.right) + 2 + '%';
    moveRight = 0;
    }
    if (changeDir == true && (score >= 4  && score < 6)){
    el.style.width = '2.5%';
    el.style.right = parseInt(el.style.right) - 2.5 + '%';
    moveLeft = 1;
    }
    if (changeDir == false && (score >= 4 && score < 6)){
    el.style.width = '2.5%';
    el.style.right = parseInt(el.style.right) + 2.5 + '%';
    moveRight = 0;
    }
    if (changeDir == true && (score >= 6  && score < 7)){
    el.style.width = '2%';
    el.style.right = parseInt(el.style.right) - 2 + '%';
    moveLeft = 1;
    }
    if (changeDir == false && (score >= 6 && score < 7)){
    el.style.width = '2%';
    el.style.right = parseInt(el.style.right) + 2 + '%';
    moveRight = 0;
    }
    if (changeDir == true && (score >= 7  && score < 8)){
    el.style.width = '1.5%';
    el.style.right = parseInt(el.style.right) - 2 + '%';
    moveLeft = 1;
    }
    if (changeDir == false && (score >= 7 && score < 8)){
    el.style.width = '1.5%';
    el.style.right = parseInt(el.style.right) + 2 + '%';
    moveRight = 0;
    }
    */
    if (changeDir == true && (score < 2)){
    el.style.width = '5%';
    el.style.right = parseInt(el.style.right) - 1 + '%';
    el.style.top = 32 + (12.8 * Math.sin(parseInt(el.style.right)/8)) + '%';
    moveLeft = 1;
    }
    if (changeDir == false && (score <2 )){
    el.style.width = '5%';
    el.style.right = parseInt(el.style.right) + 1 + '%';
    el.style.top = 32 + (12.8 * Math.sin(parseInt(el.style.right)/8)) + '%';
    moveRight = 0;
    }
        
    //Once higher difficulty is reached, change pattern to random spawning.
    if(score >= 10){
    changeToSpawn = true;
    el.style.top = (Math.random() * 60) + '%';
    el.style.right = (Math.random() * 60) + '%';
    el.style.bottom = (Math.random() * 60) + '%';
    el.style.left = (Math.random() * 60) + '%';
    }
    /*else if (score > 1)
    el.style.top = 300 + (80 * Math.sin(parseInt(el.style.left)/50)) + 'px';
    else if (score > 3)
    el.style.top = 200 + (80 * Math.sin(parseInt(el.style.left)/50)) + 'px';
    */
    if(changeToSpawn == true){
    timervar = setTimeout(moveIt,2000)
    }
    else{
    timervar = setTimeout(moveIt, 20);
    }
}
//Increase score counter, play sound when shot registers a score.
function scoreUp()
{
    score++;
    snd.play();
}
//once reload event is called, reload the page which will call window.onload()
function reloadEvent(){
    document.getElementById("stop-me").onclick = function(){
    location.reload();
    }
}
function reloadHandler(){
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
function remove(y){
    //Similar to reloadHandler() but only job is to remove block elements upon an action.
    y.style.display = "block";
    if (y.style.display == "block"){
    y.style.display = "none";
    }
}
function scoreboard()
{
    //Scoreboard function will first attempt to get local highscore and if it does not exist, will set one upon playing for the first time.
    var highscore = localStorage.getItem("highscore");
    if(highscore !== null){
        if (score > highscore) {
            localStorage.setItem("highscore", score);      
        }
    }
    else{
        localStorage.setItem("highscore", score);
    }
    var showHighScores = document.getElementById("high-scores"); //initializing showHighScores variable to element high-scores
    showHighScores.innerHTML = highscore; //write high scores to div
    //if statement handles shots showing 0, score showing 0 and accuracy being calculated correctly for 0/0. Else handles outputting shots, score, and accuracy with accuracy being rounded to 2 decimal places.
    if(shots == 0 && score == 0){
    document.getElementById("score").innerHTML = "Shots: " + shots + "Score: " + score  + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accuracy: " + 0 + "%";
    }
    else{
    document.getElementById("score").innerHTML = "Shots: " + shots + "Score: " + score  + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accuracy: " + ((score/shots)* 100).toFixed(2) + "%";
    }
}

window.onload = function () {
    scoreboard(); //call the scoreboard to show preloaded.
    //Once play me is clicked...
    document.getElementById("play-me").onclick = function () {
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
    el = document.getElementById("img1");  //getting the Cannon Image by ID
    el.onclick = scoreUp;//If its clicked on, call the ScoreUp function
    document.getElementById("range").onclick = function () //getting the element which is Range or the clickable area on screen
    {
        shots++; //if its clicked, increment the number of shots taken
        scoreboard(); //call the ScoreBoard function to populate values
    }
    scoreboard(); //Otherwise, this assuming that only the cannon is being clicked on and getting point
    el.style.right = '1%'; //start off the target 1% from the right of the screen
    moveIt(); //call animation function
    reloadHandler(); //call reload handler to see if a reload is needed to start a new game.
    }
}