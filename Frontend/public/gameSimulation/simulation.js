//key features of gameplay
const offense = document.getElementById("Offender");
const defender = document.getElementById("Defender");
const passer = document.getElementById("Passer");
const soccerBall = document.getElementById("Ball");
const offsideContainer = document.getElementById("offsideContainer");
const buttonContainer = document.getElementById("buttonContainer2").innerHTML; //contains all the inner html
const offsideButton = document.getElementById("offside");
const onsideButton = document.getElementById("notOffside");
const startButtonContainer = document.getElementById("buttonContainer4");
const scoreCounter = document.getElementById("scoreCounter");
//allow for game play fluidity
var divider = 2.0;
let inProgress = false;
let counter = 1;
let incrementer = 1;
let flag = null; //default for flag
let flag2 = false;
let gameIsReset = false;
//transitionSet
const transitionFunctions = [transition1, transition2, transition3, transition4, transition5, transition6, transition7, transition8, transition9, transition10];
var modifiedTransitions = [transition1, transition2, transition3, transition4, transition5, transition6, transition7, transition8, transition9, transition10]; 
const onsideSet = [transition1, transition5, transition3, transition7, transition9];
//allow to configure transition anonymous function
//middleTextBox
const wrongDecisionOffside = document.createElement("h3");
wrongDecisionOffside.textContent = "Wrong Decision: OFFSIDE!";
wrongDecisionOffside.classList.add("offsidePopup");
const wrongDecisionOnside = document.createElement("h3");
wrongDecisionOnside.textContent = "Wrong Decision: ONSIDE!";
wrongDecisionOnside.classList.add("offsidePopup");
const rightDecision = document.createElement("h3");
rightDecision.textContent = "Correct Decision!";
rightDecision.classList.add("offsidePopup");

function closeInfo() {
    document.getElementById("popUpBox").style.display = "none";
    document.getElementById("blurContainer").style.filter = "none";
}

function onside() {
    if (flag2 || gameIsReset) { // will stop offside button from being clicked
        return;
    }
    flag2 = true; //what sets up the offside button not being clicked
    // Append the appropriate message
    if (flag) {
        startButtonContainer.appendChild(rightDecision);
        gameTracker(true);
    } else {
        startButtonContainer.appendChild(wrongDecisionOffside);
        gameTracker(false);
    }
    setTimeout(() => {
        if (!gameIsReset) { //will run if game is not reset
            startButtonContainer.innerHTML = "";
            inProgress = false;
            if (counter < 11) {
                runPlayMenu();
            } else {
                restartMenu();
            }
        }
    }, 2000);
}

function offside() {
    if (flag2 || gameIsReset) { // will stop offside button from being clicked
        return;
    }
    flag2 = true; //what sets up the offside button not being clicked

    if (!flag) {
        startButtonContainer.appendChild(rightDecision);
        gameTracker(true);
    } else {
        startButtonContainer.appendChild(wrongDecisionOnside);
        gameTracker(false);
    }
    setTimeout(() => {
        if (!gameIsReset) {
            startButtonContainer.innerHTML = "";
            inProgress = false;
            if (counter < 11) {
                runPlayMenu();
            } else {
                restartMenu();
            }
        }
    }, 2000);
}

function changeScore() {
    scoreCounter.innerText = "Score: " + incrementer;
    incrementer++;
}

function gameTracker(choice) {
    let number = "play" + counter;
    const playTracker = document.getElementById(number);
    if (choice) {
        playTracker.style.backgroundColor = "green";
        playTracker.style.boxShadow = "green 0 0 0 1.5px inset, rgba(45, 150, 66, 0.4) 0 2px 4px, rgba(45, 150, 66, 0.3) 0 7px 13px -3px, green 0 -3px 0 inset";
        changeScore();
    } else {
        playTracker.style.backgroundColor = "red";
        playTracker.style.boxShadow = "red 0 0 0 1.5px inset, rgba(150, 45, 45, 0.4) 0 2px 4px, rgba(150, 45, 45, 0.3) 0 7px 13px -3px, red 0 -3px 0 inset";
    }
    ++counter;
}

function changeArray(array, num) { // changes array by subtracting size and returns transition
    newArray = [];
    newArray.size = modifiedTransitions.length- 1;
    var count = 0;
    for (let i = 0; i < modifiedTransitions.length; i++) {
        if (i != num) {
            newArray[count++] = modifiedTransitions[i];
        }
    }
    modifiedTransitions = newArray;
}
  
  // Random function that calls all the transition functions in random order
function randomTransitions() {
    console.log(6);
    if (inProgress || gameIsReset) { // keep for now
        return;
    }
    console.log(7);
    inProgress = true; //prevents run button from being clicked
    flag2 = false; //allows offside button to be clicked
    var num = Math.floor(Math.random() * (modifiedTransitions.length  - 0)); //gets random number 0-9
    var transition = modifiedTransitions[num];
    changeArray(modifiedTransitions, num);
    transition();
    flag = onsideSet.includes(transition);
    onsideButton.addEventListener("click", onside);
    offsideButton.addEventListener("click", offside);
}

function showInfo() {
    document.getElementById("infoText").style.visibility = "visible";
    document.getElementById("infoText").style.opacity = "1";
}

function hideInfo() {
    document.getElementById("infoText").style.visibility = "hidden";
    document.getElementById("infoText").style.opacity = "0";
}

function createNewButton(id, label, reference) {
    const button = document.createElement('button');
    button.id = id;
    button.className = reference; //class name
    button.textContent = label;
    return button;
}

function createh1Element() {
    var score = document.createElement('h1');
    score.innerText = scoreCounter.innerText; //takes the score
    document.getElementById("buttonContainer4").appendChild(score);
    score.id = "scorePopup";
}

function restartMenu() {
    if (gameIsReset) {
        return;
    }
    startButtonContainer.innerHTML = ""; //makes sure the innerHTML is erased
    gameIsReset = true;
    document.getElementById("buttonContainer4").appendChild(createNewButton('Start', 'Restart Game', 'button'));
    offsideContainer.style.visibility = "hidden";
    createh1Element();
    scoreCounter.style.visibility = "hidden";
    incrementer = 1;
    counter = 1;
    scoreCounter.innerText = "Score: 0"; //hides and changes back the increment score
    modifiedTransitions = transitionFunctions; // resets and fulfills transitions
    inProgress = false;
    buttonMenu();
}

function resetMenu() {
    document.getElementById("buttonContainer2").innerHTML = buttonContainer;
    if (document.getElementById("Start") == null) {
        runPlayMenu();
    } else {
        buttonMenu();
    }
}

function easySetting() { //paces the speed 
    divider = 1.0;
    resetMenu();
}

function mediumSetting() { //paces the speed
    divider = 2.0;
    resetMenu();
}

function hardSetting() { //paces the speed
    divider = 3.0;
    resetMenu();
}

function changeDifficulty() {
    if (inProgress) {
        return;
    }

    //Making new butttons
    document.getElementById("buttonContainer2").innerHTML = "";
    document.getElementById("buttonContainer2").appendChild(createNewButton('E-Level', 'Easy', 'button'));
    document.getElementById("buttonContainer2").appendChild(createNewButton('M-Level', 'Medium', 'button'));
    document.getElementById("buttonContainer2").appendChild(createNewButton('H-Level', 'Hard', 'button'));
    //adding event clickers to buttons
    document.getElementById("E-Level").addEventListener("click", easySetting);
    document.getElementById("M-Level").addEventListener("click", mediumSetting);
    document.getElementById("H-Level").addEventListener("click", hardSetting);
}

function runPlayMenu() {
    startButtonContainer.innerHTML = "";
    scoreCounter.style.visibility = "visible";
    offsideContainer.style.visibility = "visible";
    const runPlayButton = document.getElementById("Run");
    const resetButton = document.getElementById("Reset");
    const levelButton = document.getElementById("Level");

    // Remove previous event listeners
    // runPlayButton.removeEventListener("click", randomTransitions);
    //resetButton.removeEventListener("click", restartMenu);
    // levelButton.removeEventListener("click", changeDifficulty);

    levelButton.addEventListener("click", changeDifficulty)
    runPlayButton.addEventListener("click", randomTransitions);
    resetButton.addEventListener("click", restartMenu);
}

function buttonMenu() {
    console.log(5);
    const startButton = document.getElementById("Start");
    const levelButton = document.getElementById("Level");

    levelButton.addEventListener("click", changeDifficulty);
    startButton.addEventListener("click", () => { //change matchButtons back to default and goes to runPlayMenu
        document.querySelectorAll("#buttonContainer3 button").forEach((button) => {
            button.style.boxShadow = "#D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset";
            button.style.backgroundColor = "#FCFCFD";
        });
        gameIsReset = false; //allows the game to run
        runPlayMenu();
    });
}

function transition1() {
    defender.style.zIndex = 2;
    offense.style.zIndex = 3;
    soccerBall.style.zIndex = 4;
    const key1Frame1 = defender.animate([{ top: '250px', left: '1250px'}], { duration: 6000 / divider, easing: 'linear'});
    const key1Frame2 = offense.animate([{top : '350px', left : '1950px'}], {duration: 6000 / divider, easing : 'linear'});
    const key1Frame3 = soccerBall.animate([{top : '-250px', left : '1950px', transform : 'rotate(270deg)'}], {duration: 3000 / divider, easing : 'linear', delay : 3000 / divider});
    //ONSIDE
}

function transition2() {
    defender.style.zIndex = 2;
    offense.style.zIndex = 3;
    soccerBall.style.zIndex = 4;
    const key2Frame1 = defender.animate([{ top: '250px', left: '1250px'}], { duration: 6000 / divider, easing: 'linear'});
    const key2Frame2 = offense.animate([{top : '350px', left : '1950px'}], {duration: 6000 / divider, easing : 'linear'});
    const key2Frame3 = soccerBall.animate([{top : '-250px', left : '1950px', transform : 'rotate(270deg)'}], {duration: 2400 / divider, easing : 'linear', delay : 3600 / divider});
    //OFFSIDE
}

function transition4() {
    defender.style.zIndex = 3;
    offense.style.zIndex = 2;
    soccerBall.style.zIndex = 4;
    const key3Frame1 = defender.animate([{left: '1200px', top: '400px'}], { duration: 2000 / divider, easing: 'linear'});
    const key3Frame2 = defender.animate([{left: '1200px', top: '400px'}, {left: '1000px', top: '250px'}], { duration: 2000 / divider, easing: 'linear', delay : 2000 / divider});
    const key3Frame6 = defender.animate([{left: '1000px', top: '250px'}, {left: '1100px', top: '300px'}], { duration: 2000 / divider, easing: 'linear', delay : 4000 / divider});
    const key3Frame3 = offense.animate([{top: '400px', left: '1100px'}], { duration: 2000 / divider, easing: 'linear'});
    const key3Frame4 = offense.animate([{top: '400px', left: '1100px'}, {top: '200px', left: '1200px'}], { duration: 2000 / divider, easing: 'linear', delay : 2000 / divider});
    const key3Frame5 = offense.animate([{top: '200px', left: '1200px'}, {top: '300px', left: '1400px'}], { duration: 2000 / divider, easing: 'linear', delay : 4000 / divider});
    const key3Frame7 = soccerBall.animate([{top:'-300px', left: '1400px', transform : 'rotate(270deg)'}], { duration: 2250 / divider, easing: 'linear', delay : 3750 / divider});
    //offside
}

function transition3() {
    defender.style.zIndex = 3;
    offense.style.zIndex = 2;
    soccerBall.style.zIndex = 4;
    const key3Frame1 = defender.animate([{left: '1200px', top: '400px'}], { duration: 2000 / divider, easing: 'linear'});
    const key3Frame2 = defender.animate([{left: '1200px', top: '400px'}, {left: '1000px', top: '250px'}], { duration: 2000 / divider, easing: 'linear', delay : 2000 / divider});
    const key3Frame6 = defender.animate([{left: '1000px', top: '250px'}, {left: '1100px', top: '300px'}], { duration: 2000 / divider, easing: 'linear', delay : 4000 / divider});
    const key3Frame3 = offense.animate([{top: '400px', left: '1100px'}], { duration: 2000 / divider, easing: 'linear'});
    const key3Frame4 = offense.animate([{top: '400px', left: '1100px'}, {top: '200px', left: '1200px'}], { duration: 2000 / divider, easing: 'linear', delay : 2000 / divider});
    const key3Frame5 = offense.animate([{top: '200px', left: '1200px'}, {top: '300px', left: '1400px'}], { duration: 2000 / divider, easing: 'linear', delay : 4000 / divider});
    const key4Frame7 = soccerBall.animate([{top:'-300px', left: '1400px', transform : 'rotate(270deg)'}], { duration: 2850 / divider, easing: 'linear', delay : 3150 / divider});
    //onside
}

function transition5() {
    defender.style.zIndex = 2;
    offense.style.zIndex = 3;
    soccerBall.style.zIndex = 4;
    const key5Frame1 = offense.animate([{left: '900px', top: '250px'}], { duration: 1500 / divider, easing: 'linear'});
    const key5Frame2 = offense.animate([{left: '900px', top: '250px'}, {left: '1000px', top: '150px'}], { duration: 1500 / divider, easing: 'linear', delay : 1500 / divider});
    const key5Frame3 = offense.animate([{left: '1000px', top: '150px'}, {left: '1050px', top: '400px'}], { duration: 1500 / divider, easing: 'linear', delay : 3000 / divider});
    const key5Frame4 = offense.animate([{left: '1050px', top: '400px'}, {left: '1600px', top: '450px'}], { duration: 1875 / divider, easing: 'linear', delay : 4500 / divider});
    const key5Frame5 = defender.animate([{left: '1150px', top: '350px'}], { duration: 1500 / divider, easing: 'linear'});
    const key5Frame6 = defender.animate([{left: '1150px', top: '350px'}, {left: '1000px', top : '250px'}], { duration: 1500 / divider, easing: 'linear', delay : 1500 / divider});
    const key5Frame7 = defender.animate([{left: '1000px', top: '250px'}, {left: '1100px', top : '300px'}], { duration: 1500 / divider, easing: 'linear', delay : 3000 / divider});
    const key5Frame8 = defender.animate([{left: '1100px', top : '300px'}, {left: '1200px', top : '400px'}], { duration: 1875 / divider, easing: 'linear', delay : 4500 / divider});
    const key5Frame9 = soccerBall.animate([{top:'-150px', left: '1600px', transform : 'rotate(270deg)'}], { duration: 1650 / divider, easing: 'linear', delay : 4725 / divider});
    //onside
}

function transition6() {
    defender.style.zIndex = 2;
    offense.style.zIndex = 3;
    soccerBall.style.zIndex = 4;
    const key5Frame1 = offense.animate([{left: '900px', top: '250px'}], { duration: 1500 / divider, easing: 'linear'});
    const key5Frame2 = offense.animate([{left: '900px', top: '250px'}, {left: '1000px', top: '150px'}], { duration: 1500 / divider, easing: 'linear', delay : 1500 / divider});
    const key5Frame3 = offense.animate([{left: '1000px', top: '150px'}, {left: '1050px', top: '400px'}], { duration: 1500 / divider, easing: 'linear', delay : 3000 / divider});
    const key5Frame4 = offense.animate([{left: '1050px', top: '400px'}, {left: '1600px', top: '450px'}], { duration: 1875 / divider, easing: 'linear', delay : 4500 / divider});
    const key5Frame5 = defender.animate([{left: '1150px', top: '350px'}], { duration: 1500 / divider, easing: 'linear'});
    const key5Frame6 = defender.animate([{left: '1150px', top: '350px'}, {left: '1000px', top : '250px'}], { duration: 1500 / divider, easing: 'linear', delay : 1500 / divider});
    const key5Frame7 = defender.animate([{left: '1000px', top: '250px'}, {left: '1100px', top : '300px'}], { duration: 1500 / divider, easing: 'linear', delay : 3000 / divider});
    const key5Frame8 = defender.animate([{left: '1100px', top : '300px'}, {left: '1200px', top : '400px'}], { duration: 1875 / divider, easing: 'linear', delay : 4500 / divider});
    const key6Frame9 = soccerBall.animate([{top:'-150px', left: '1600px', transform : 'rotate(270deg)'}], { duration: 750 / divider, easing: 'linear', delay : 5625 / divider});
    //offside
}

function transition7() {
    defender.style.zIndex = 3;
    offense.style.zIndex = 1;
    soccerBall.style.zIndex = 2;

    const key7Frame1 = offense.animate([{left: '1000px', top: '350px'}], { duration: 3000 / divider, easing: 'linear'});
    const key7Frame2 = offense.animate([{left: '1000px', top: '350px'}, {left: '1500px', top: '50px'}], { duration: 3000 / divider, easing: 'linear', delay : 3000 / divider});
    const key7Frame3 = defender.animate([{left: '1200px', top: '350px'}], { duration: 3000 / divider, easing: 'linear'});
    const key7Frame4 = defender.animate([{left: '1200px', top: '350px'}, {left: '1000px', top: '400px'}], { duration: 3000 / divider, easing: 'linear', delay : 3000 / divider});
    const key7Frame5 = soccerBall.animate([{top:'-550px', left: '1500px', transform : 'rotate(270deg)'}], { duration: 2100 / divider, easing: 'linear', delay : 3900 / divider});
    //onside
}

function transition8() {
    defender.style.zIndex = 3;
    offense.style.zIndex = 1;
    soccerBall.style.zIndex = 2;

    const key7Frame1 = offense.animate([{left: '1000px', top: '350px'}], { duration: 3000 / divider, easing: 'linear'});
    const key7Frame2 = offense.animate([{left: '1000px', top: '350px'}, {left: '1500px', top: '50px'}], { duration: 3000 / divider, easing: 'linear', delay : 3000 / divider});
    const key7Frame3 = defender.animate([{left: '1200px', top: '350px'}], { duration: 3000 / divider, easing: 'linear'});
    const key7Frame4 = defender.animate([{left: '1200px', top: '350px'}, {left: '1000px', top: '400px'}], { duration: 3000 / divider, easing: 'linear', delay : 3000 / divider});
    const key8Frame5 = soccerBall.animate([{top:'-550px', left: '1500px', transform : 'rotate(270deg)'}], { duration: 1350 / divider, easing: 'linear', delay : 4650 / divider});
    //offside
}

function transition10() {
    //offside
    defender.style.zIndex = 3;
    offense.style.zIndex = 1;
    soccerBall.style.zIndex = 2;

    const key9Frame1 = offense.animate([{ left: '1000px', top : '300px'}], {duration: 1500 / divider, easing: 'linear'});
    const key9Frame2 = offense.animate([{ left: '1000px', top : '300px'}, { left: '1500px', top : '200px'}], {duration: 1500 / divider, easing: 'linear', delay: 1500 / divider});
    const key9Frame3 = offense.animate([{ left: '1500px', top : '200px'}, {left: '1600px', top: '500px'} ], {duration: 1500 / divider, easing: 'linear', delay: 3000 / divider});
    const key9Frame4 = offense.animate([{left: '1600px', top: '500px'}, {left: '1000px', top: '600px'} ], {duration: 1500 / divider, easing: 'linear', delay: 4500 / divider});
    const key9Frame5 = defender.animate([{ left: '1300px', top : '300px'}], {duration: 1500 / divider, easing: 'linear'});
    const key9Frame6 = defender.animate([{ left: '1300px', top : '300px'}, { left: '1200px', top : '250px'}], {duration: 1500 / divider, easing: 'linear', delay: 1500 / divider});
    const key9Frame7 = defender.animate([{ left: '1200px', top : '250px'}, { top: '400px', left : '1300px'}], {duration: 1500 / divider, easing: 'linear', delay: 3000 / divider});
    const key9Frame8 = defender.animate([{ top: '400px', left : '1300px'}, { top : '500px', left: '1400px'}], {duration: 1500 / divider, easing: 'linear', delay: 4500 / divider});
    const key9Frame9 = soccerBall.animate([{top:'0px', left: '1000px', transform : 'rotate(270deg)'}], { duration: 1500 / divider, easing: 'linear', delay : 4500 / divider});

    setTimeout(() => {
        defender.style.zIndex = 2;
        offense.style.zIndex = 3;
        soccerBall.style.zIndex = 4;
    }, 3000 / divider);
}

function transition9() {
    //onside
    defender.style.zIndex = 3;
    offense.style.zIndex = 1;
    soccerBall.style.zIndex = 2;

    const key9Frame1 = offense.animate([{ left: '1000px', top : '300px'}], {duration: 1500 / divider, easing: 'linear'});
    const key9Frame2 = offense.animate([{ left: '1000px', top : '300px'}, { left: '1500px', top : '200px'}], {duration: 1500 / divider, easing: 'linear', delay: 1500 / divider});
    const key9Frame3 = offense.animate([{ left: '1500px', top : '200px'}, {left: '1600px', top: '500px'} ], {duration: 1500 / divider, easing: 'linear', delay: 3000 / divider});
    const key9Frame4 = offense.animate([{left: '1600px', top: '500px'}, {left: '1000px', top: '600px'} ], {duration: 1500 / divider, easing: 'linear', delay: 4500 / divider});
    const key9Frame5 = defender.animate([{ left: '1300px', top : '300px'}], {duration: 1500 / divider, easing: 'linear'});
    const key9Frame6 = defender.animate([{ left: '1300px', top : '300px'}, { left: '1200px', top : '250px'}], {duration: 1500 / divider, easing: 'linear', delay: 1500 / divider});
    const key9Frame7 = defender.animate([{ left: '1200px', top : '250px'}, { top: '400px', left : '1300px'}], {duration: 1500 / divider, easing: 'linear', delay: 3000 / divider});
    const key9Frame8 = defender.animate([{ top: '400px', left : '1300px'}, { top : '500px', left: '1400px'}], {duration: 1500 / divider, easing: 'linear', delay: 4500 / divider});
    const key10Frame9 = soccerBall.animate([{top:'0px', left: '1000px', transform : 'rotate(270deg)'}], { duration: 900 / divider, easing: 'linear', delay : 5100 / divider});

    setTimeout(() => {
        defender.style.zIndex = 2;
        offense.style.zIndex = 3;
        soccerBall.style.zIndex = 4;
    }, 3000 / divider);
}

buttonMenu();
