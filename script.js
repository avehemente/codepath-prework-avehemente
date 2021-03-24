// global constants
const clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var progress = 0; 
var guessCounter = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var triesLeft = 3;
var timer;
var secondsLeft = 10;

function startGame(numButtons){
    //initialize game variables
    progress = 0;
    gamePlaying = true;
    triesLeft = 3;
    // swap the Start and Stop buttons
    document.getElementById("startBtn3").classList.add("hidden");
    document.getElementById("startBtn4").classList.add("hidden");
    document.getElementById("startBtn5").classList.add("hidden");
    document.getElementById("startBtn6").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
  
    //remove unnecessary buttons
    for(let i=6; i>numButtons;i--){
        document.getElementById("button" + i).classList.add("hidden");
    }
    generatePattern(numButtons)
    playClueSequence();
}

//use to generate random 8-length patterns
function generatePattern(numButtons) {
    let patternLength = 8;
    for(let i=0; i<patternLength; i++){
        pattern[i] = Math.floor(Math.random() * numButtons) + 1; //pick random num from 0-3 then add 1
    }
    console.log(pattern)
}

function stopGame(){
    stopTimer();
    gamePlaying = false;
    document.getElementById("stopBtn").classList.add("hidden");
    document.getElementById("startBtn3").classList.remove("hidden");
    document.getElementById("startBtn4").classList.remove("hidden");
    document.getElementById("startBtn5").classList.remove("hidden");
    document.getElementById("startBtn6").classList.remove("hidden");
    //re-add hidden buttons
    document.getElementById("button4").classList.remove("hidden");
    document.getElementById("button5").classList.remove("hidden");
    document.getElementById("button6").classList.remove("hidden");
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}

function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
  setTimeout(startTimer, delay - cluePauseTime); //start timer after the clues have finished playing
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  
  //if button wrong, decrease triesLeft by 1 and end if necessary
  if(btn != pattern[guessCounter]) {
      stopTimer();
      triesLeft -=1;
      if(triesLeft == 0) {
          loseGame(); //if no tries left, lose game
      }
      else {
          alert("Incorrect. Watch pattern again. " + triesLeft + " tries left.");
          playClueSequence();
          guessCounter = 0; //reset guessCounter to allow them to restart
      }
      return;
  }
  
  //if guess not yet done, increment guessCounter
  else if (guessCounter != progress) {
      guessCounter++;
  }
  
  //if not at end of pattern, increment progress and play next clue
  else if (progress != pattern.length - 1) {
      stopTimer();
      progress++;
      playClueSequence();
  }
  
  //if all above not satisfied, game must be over and player won.
  else {
      winGame();
  }
}

//Timer Functions
function startTimer() {
    timer = setInterval(decrement, 1000);
}

function decrement() {
    if (!gamePlaying) { //used to stop edge case where timer goes if stop button is pressed before the clue finishes playing
       stopTimer();
    }
    if(secondsLeft == 0){
        stopTimer();
        triesLeft--;
        if(triesLeft == 0) {
            loseGame(); //if no tries left, lose game
        }
        else {
            alert("Out of time. Watch pattern again. " + triesLeft + " tries left.");
            playClueSequence();
            guessCounter = 0; //reset guessCounter to allow them to restart
        }
    }
    document.getElementById("timer").innerHTML = "<b>Timer: " + secondsLeft; //update timer on the page
    secondsLeft--; 
}

function stopTimer(){
    clearInterval(timer);
    secondsLeft = 10;
}

//Ending Games Function
function loseGame(){
    stopGame();
    alert("Game Over. You lost. :(");
}

function winGame(){
    stopGame();
    alert("Game over. Congrats! You win! :D");
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 587.33,
  6: 659.25
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)