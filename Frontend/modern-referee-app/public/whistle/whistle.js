const whistle = document.getElementById("whistle");
const sub = document.getElementById("Substitution");
const half = document.getElementById("Half");
const start = document.getElementById("Start");
const foul = document.getElementById("Foul");
const fight = document.getElementById("Fight");
const restart = document.getElementById("Restart");
const fulltimeWhistle = document.getElementById("audio1");
const startWhistle = document.getElementById("audio2");
const restartWhistle = document.getElementById("audio3");
const foulWhistle = document.getElementById("audio4");
const fightWhistle = document.getElementById("audio5");
const subWhistle = document.getElementById("audio6");
let animationProgress = false;

function endGame() {
    if (animationProgress) {
        return;
    }
    animationProgress = true;
    fulltimeWhistle.play();
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        whistle.classList.remove("shake-animation");
        animationProgress = false;
    }, 4000);
}

function startGame() {
    if (animationProgress) {
        return;
    }
    animationProgress = true;
    startWhistle.play();
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        whistle.classList.remove("shake-animation");
        animationProgress = false;
    }, 1800);
}

function restartPlay() {
    if (animationProgress) {
        return;
    }
    animationProgress = true;
    restartWhistle.play();
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        whistle.classList.remove("shake-animation");
        animationProgress = false;
    }, 800);
}

function callFoul() {
    if (animationProgress) {
        return;
    }
    animationProgress = true;
    foulWhistle.play();
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        whistle.classList.remove("shake-animation");
        animationProgress = false;
    }, 1300);
}

function substitution() {
    if (animationProgress) {
        return;
    }
    animationProgress = true;
    subWhistle.play();
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        whistle.classList.remove("shake-animation");
        animationProgress = false;
    }, 1000);
}

function stopFight() {
    if (animationProgress) {
        return;
    }
    animationProgress = true;
    fightWhistle.play();
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        whistle.classList.remove("shake-animation");
        animationProgress = false;
    }, 2000);
}

start.addEventListener("click", startGame);
half.addEventListener("click", endGame);
restart.addEventListener("click", restartPlay);
foul.addEventListener("click", callFoul);
sub.addEventListener("click", substitution);
fight.addEventListener("click", stopFight);

