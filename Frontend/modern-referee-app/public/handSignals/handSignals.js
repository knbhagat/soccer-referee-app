const leftArm = document.getElementById("left-arm");
const rightArm = document.getElementById("right-arm");
const whistle = document.getElementById("whistle");
const whistleText = document.getElementById("textForWhistle");
const card = document.getElementById("card");
const textBox = document.getElementById("textBox");
let inMotion = false; //sees if another button is already in motion

function backPage() {
    history.go(0);
}

function cornerRight() {
    if (inMotion) {
        return;
    }
    inMotion = true;
    rightArm.style.transform = "rotateX(135deg) rotateY(135deg) rotateZ(-30deg)";

    setTimeout(() => {
        rightArm.style.transform = "rotate(0deg)";
        inMotion = false;
    }, 3000);
}

function cornerLeft() {
    if (inMotion) {
        return;
    }
    inMotion = true;
    leftArm.style.transform = "rotateX(135deg) rotateY(45deg) rotateZ(-30deg)";

    setTimeout(() => {
        leftArm.style.transform = "rotate(0deg)";
        inMotion = false;
    }, 3000);
}

function pickASide() {
    document.getElementById("buttonContainer").innerHTML = "";
    document.getElementById("buttonContainer").style.marginTop = "0px";
    document.getElementById("buttonContainer").appendChild(createNewButton('Left', 'Left Corner', 'button'));
    document.getElementById("buttonContainer").appendChild(createNewButton('Right', 'Right Corner', 'button'));

    const right = document.getElementById("Right");
    const left = document.getElementById("Left");

    document.getElementById("getBack").removeAttribute("href");
    document.getElementById("getBack").addEventListener("click", backPage);
    right.addEventListener("click", cornerRight);
    left.addEventListener("click", cornerLeft);
}

function advantage() {
    if (inMotion) {
        return;
    }

    inMotion = true;
    whistleText.innerText = "Follow the play with your hands up until you feel that the advantage is successful where you can put your hands down";
    whistleText.style.borderStyle = "dashed";
    leftArm.style.transform = "rotateX(120deg)";
    rightArm.style.transform = "rotateX(120deg)";
    setTimeout(() => {
        leftArm.style.transform = "rotateX(0deg)";
        rightArm.style.transform = "rotateX(0deg)";
        inMotion = false;
        whistleText.innerText = "";
        whistleText.style.borderStyle = "hidden";
    }, 4000);
}

function goalKickSignal() {
    if (inMotion) {
        return;
    }
    inMotion = true;
    rightArm.style.transform = "rotateX(60deg)";
    whistleText.innerText = "Point in the direction of the side of the box the goal kick corresponds to";
    whistleText.style.borderStyle = "dashed";
    setTimeout(() => {
        rightArm.style.transform = "rotateX(0deg)";
        whistleText.innerText = "";
        whistleText.style.borderStyle = "hidden";
        inMotion = false;
    }, 3000);
}

function leftThrow() {
    if (inMotion) {
        return;
    }

    inMotion = true;
    leftArm.style.transform = "rotate(-135deg)";
    textBox.style.top = "275px";
    whistleText.innerText = "Dependent on the position you are in on the field. Move hand in direction towards the teams attacking side";
    whistleText.style.borderStyle = "dashed";
    setTimeout(() => {
        leftArm.style.transform = "rotate(0deg)";
        whistleText.innerText = "";
        textBox.style.top = "180px";
        whistleText.style.borderStyle = "hidden";
        inMotion = false;
    }, 3000);
}

function rightThrow() {
    if (inMotion) {
        return;
    }
    inMotion = true;
    rightArm.style.transform = "rotate(135deg)";
    whistleText.innerText = "Dependent on the position you are in on the field. Move hand in direction towards the teams attacking side";
    whistleText.style.borderStyle = "dashed";
    setTimeout(() => {
        rightArm.style.transform = "rotate(0deg)";
        whistleText.innerText = "";
        whistleText.style.borderStyle = "hidden";
        inMotion = false;
    }, 3000);
}

function leftOrRight() {
    document.getElementById("buttonContainer").innerHTML = "";
    document.getElementById("buttonContainer").style.marginTop = "0px";
    document.getElementById("buttonContainer").appendChild(createNewButton('Left', 'Left', 'button'));
    document.getElementById("buttonContainer").appendChild(createNewButton('Right', 'Right', 'button'));

    const right = document.getElementById("Right");
    const left = document.getElementById("Left");

    document.getElementById("getBack").removeAttribute("href");
    document.getElementById("getBack").addEventListener("click", () => {
        backPage();
    }); 
    right.addEventListener("click", rightThrow);
    left.addEventListener("click", leftThrow);
}

function penaltyKick() {
    if (inMotion) {
        return;
    }
    inMotion = true

    whistleText.innerText = "Whistle";
    whistleText.style.borderStyle = "dashed";
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        whistle.classList.remove("shake-animation");
        rightArm.style.transform = "rotateX(60deg)";
        whistleText.innerText = "Point towards the penalty marker"
    }, 2000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(0deg)";
        whistleText.innerText = "";
        whistleText.style.borderStyle = "hidden";
        inMotion = false;
    }, 6000);
}

function indirectFoul() {
    if (inMotion) {
        return;
    }
    inMotion = true

    whistleText.innerText = "Whistle";
    whistleText.style.borderStyle = "3px dashed black visible";
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        whistle.classList.remove("shake-animation");
        rightArm.style.transform = "rotateX(80deg)";
        whistleText.innerText = "Point towards the side in which the team is attacking"
    }, 2000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(180deg)";
        whistleText.innerText = "Raise Arm until the ball is touched by another player other than the kicker"
    }, 5000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(0deg)";
        whistleText.innerText = "";
        whistleText.style.borderStyle = "hidden";
        inMotion = false;
    }, 8000);    
}

function directFoul() {
    if (inMotion) {
        return;
    }
    inMotion = true

    whistleText.innerText = "Whistle";
    whistleText.style.borderStyle = "dashed";
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        whistle.classList.remove("shake-animation");
        rightArm.style.transform = "rotateX(80deg)";
        whistleText.innerText = "Point towards the side in which the team is attacking"
    }, 3000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(0deg)";
        whistleText.innerText = "";
        whistleText.style.borderStyle = "hidden";
        inMotion = false;
    }, 6000); 
}

function directRed() {
    if (inMotion) {
        return;
    }
    inMotion = true

    whistleText.innerText = "Whistle";
    whistleText.style.borderStyle = "dashed";
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        card.style.backgroundColor = "red"; //confirms card color is red
        rightArm.style.zIndex = "-1";
        whistle.classList.remove("shake-animation");
        rightArm.style.transform = "rotateX(80deg)";
        whistleText.innerText = "Point towards the side in which the team is attacking, then take card from back-right pouch of shorts"
    }, 2000);

    setTimeout(() => {
        rightArm.style.transform = "rotate(-20deg)";
        whistleText.innerText = "Stand up straight with red card facing direction of player and discuss the section from the rulebook on which the red was given for. Make sure player is escorted off of field before play begins";
    }, 5000);

    setTimeout(() => {
        card.style.visibility = "visible";
    }, 6000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(180deg)";
    }, 7000);

    setTimeout(() => {
        rightArm.style.transform = "rotate(-10deg)";
    }, 10000);

    setTimeout(() => {
        card.style.visibility = "hidden";
    }, 11000);   

    setTimeout(() => {
        rightArm.style.transform = "rotateX(0deg)";
        whistleText.innerText = "";
        whistleText.style.borderStyle = "hidden";
        rightArm.style.zIndex = "0";
        inMotion = false;
    }, 13000); 
}

function directYellow() {
    if (inMotion) {
        return;
    }
    inMotion = true

    whistleText.innerText = "Whistle";
    whistleText.style.borderStyle = "dashed";
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        card.style.backgroundColor = "yellow"; //confirms card color is yellow
        whistle.classList.remove("shake-animation");
        rightArm.style.transform = "rotateX(80deg)";
        whistleText.innerText = "Point towards the side in which the team is attacking, then take card from left pouch of uniform"
    }, 2000);

    setTimeout(() => {
        rightArm.style.transform = "rotate(-100deg)";
        whistleText.innerText = "Stand up straight with yellow card facing direction of player and discuss the section from the rulebook on which the yellow was given for to contain future misconduct"
    }, 5000);

    setTimeout(() => {
        card.style.visibility = "visible";
    }, 6000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(180deg)";
    }, 7000);

    setTimeout(() => {
        rightArm.style.transform = "rotate(-100deg)";
    }, 10000);

    setTimeout(() => {
        card.style.visibility = "hidden";
    }, 11000); 

    setTimeout(() => {
        rightArm.style.transform = "rotateX(0deg)";
        whistleText.innerText = "";
        whistleText.style.borderStyle = "hidden";
        inMotion = false;
    }, 13000); 
}

function indirectRed() {
    if (inMotion) {
        return;
    }
    inMotion = true

    whistleText.innerText = "Whistle";
    whistleText.style.borderStyle = "dashed";
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        card.style.backgroundColor = "red"; //confirms card color is red
        rightArm.style.zIndex = "-1";
        whistle.classList.remove("shake-animation");
        rightArm.style.transform = "rotateX(80deg)";
        whistleText.innerText = "Point towards the side in which the team is attacking, then take card from back-right pouch of shorts"
    }, 2000);

    setTimeout(() => {
        rightArm.style.transform = "rotate(-20deg)";
        whistleText.innerText = "Stand up straight with red card facing direction of player and discuss the section from the rulebook on which the red was given for. Make sure player is escorted off of field before play begins";
    }, 5000);

    setTimeout(() => {
        card.style.visibility = "visible";
    }, 6000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(180deg)";
    }, 7000);

    setTimeout(() => {
        rightArm.style.transform = "rotate(-10deg)";
    }, 9000);

    setTimeout(() => {
        card.style.visibility = "hidden";
    }, 10000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(180deg)";
        whistleText.innerText = "Raise Arm until the ball is touched by another player other than the kicker"
    }, 12000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(0deg)";
        whistleText.innerText = "";
        whistleText.style.borderStyle = "hidden";
        rightArm.style.zIndex = "0";
        inMotion = false;
    }, 15000);    
}

function indirectYellow() {
    if (inMotion) {
        return;
    }
    inMotion = true

    whistleText.innerText = "Whistle";
    whistleText.style.borderStyle = "dashed";
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        card.style.backgroundColor = "yellow"; //confirms card color is yellow
        whistle.classList.remove("shake-animation");
        rightArm.style.transform = "rotateX(80deg)";
        whistleText.innerText = "Point towards the side in which the team is attacking, then take card from left pouch of uniform"
    }, 2000);

    setTimeout(() => {
        rightArm.style.transform = "rotate(-100deg)";
        whistleText.innerText = "Stand up straight with yellow card facing direction of player and discuss the section from the rulebook on which the yellow was given for to contain future misconduct"
    }, 5000);

    setTimeout(() => {
        card.style.visibility = "visible";
    }, 6000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(180deg)";
    }, 7000);

    setTimeout(() => {
        rightArm.style.transform = "rotate(-100deg)";
    }, 9000);

    setTimeout(() => {
        card.style.visibility = "hidden";
    }, 10000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(180deg)";
        whistleText.innerText = "Raise Arm until the ball is touched by another player other than the kicker"
    }, 12000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(0deg)";
        whistleText.innerText = "";
        whistleText.style.borderStyle = "hidden";
        inMotion = false;
    }, 13000);    
}

function cardSelection(indirectKick) {
    document.getElementById("buttonContainer").innerHTML = "";
    document.getElementById("buttonContainer").style.marginTop = "30px";
    document.getElementById("buttonContainer").appendChild(createNewButton('NoCard', 'No Card', 'button'));
    document.getElementById("buttonContainer").appendChild(createNewButton('Yellow', 'Yellow Card', 'button'));
    document.getElementById("buttonContainer").appendChild(createNewButton('Red', 'Red Card', 'button'));
    const noCard = document.getElementById('NoCard');
    const yellowCard = document.getElementById('Yellow');
    const redCard = document.getElementById('Red');

    document.getElementById("getBack").removeAttribute("href");
    document.getElementById("getBack").addEventListener("click", backPage);
    noCard.addEventListener("click", () => {
        if (indirectKick == null) {
            penaltyKick();
        }
        else if (indirectKick) {
            indirectFoul();
        } else {
            directFoul();
        }
    });

    yellowCard.addEventListener("click", () => {
        if (indirectKick == null) {
            penaltyYellow();
        }
        else if (indirectKick) {
            indirectYellow();
        } else {
            directYellow();
        }
    });

    redCard.addEventListener("click", () => {
        if (indirectKick == null) {
            penaltyRed();
        }
        else if (indirectKick) {
            indirectRed();
        } else {
            directRed();
        }
    });
}

function penaltyYellow() {
    if (inMotion) {
        return;
    }
    inMotion = true

    whistleText.innerText = "Whistle"
    whistleText.style.borderStyle = "dashed";
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        card.style.backgroundColor = "yellow"; //confirms card color is yellow
        whistle.classList.remove("shake-animation");
        rightArm.style.transform = "rotateX(60deg)";
        whistleText.innerText = "Point towards the penalty marker, then take card from left pouch of uniform"
    }, 2000);

    setTimeout(() => {
        rightArm.style.transform = "rotate(-100deg)";
        whistleText.innerText = "Stand up straight with yellow card facing direction of player and discuss the section from the rulebook on which the yellow was given for to contain future misconduct"
    }, 5000);

    setTimeout(() => {
        card.style.visibility = "visible";
    }, 6000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(180deg)";
    }, 7000);

    setTimeout(() => {
        rightArm.style.transform = "rotate(-100deg)";
    }, 9000);

    setTimeout(() => {
        card.style.visibility = "hidden";
    }, 10000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(0deg)";
        whistleText.innerText = "";
        whistleText.style.borderStyle = "hidden";
        inMotion = false;
    }, 12000);    
}

function penaltyRed() {
    if (inMotion) {
        return;
    }
    inMotion = true

    whistleText.innerText = "Whistle"
    whistleText.style.borderStyle = "dashed";
    whistle.classList.add("shake-animation");

    setTimeout(() => {
        card.style.backgroundColor = "red"; //confirms card color is red
        rightArm.style.zIndex = "-1";
        whistle.classList.remove("shake-animation");
        rightArm.style.transform = "rotateX(60deg)";
        whistleText.innerText = "Point towards the penalty marker, then take card from back-right pouch of shorts"
    }, 2000);

    setTimeout(() => {
        rightArm.style.transform = "rotate(-20deg)";
        whistleText.innerText = "Stand up straight with red card facing direction of player and discuss the section from the rulebook on which the red was given for. Make sure player is escorted off of field before play begins";
    }, 5000);

    setTimeout(() => {
        card.style.visibility = "visible";
    }, 6000);

    setTimeout(() => {
        rightArm.style.transform = "rotateX(180deg)";
    }, 7000);

    setTimeout(() => {
        rightArm.style.transform = "rotate(-10deg)";
    }, 10000);

    setTimeout(() => {
        card.style.visibility = "hidden";
    }, 11000);   

    setTimeout(() => {
        rightArm.style.transform = "rotateX(0deg)";
        whistleText.innerText = "";
        whistleText.style.borderStyle = "hidden";
        rightArm.style.zIndex = "0";
        inMotion = false;
    }, 13000);   
}

function createNewButton(id, label, reference) {
    const button = document.createElement('button');
    button.id = id;
    button.className = reference; //class name
    button.textContent = label;
    return button;
}

function newSignalButtons() {
    const adv = document.getElementById("Advantage");
    const corner = document.getElementById("Corner");
    const goalKick = document.getElementById("GoalKick");
    const throwIn = document.getElementById("ThrowIn");
    const penalty = document.getElementById("PenaltyKick");
    const indirect = document.getElementById("Indirect");
    const direct = document.getElementById("Direct");

    adv.addEventListener("click", advantage);
    corner.addEventListener("click", () => {
        if (inMotion) {
            return;
        }
        pickASide();
    });
    goalKick.addEventListener("click", goalKickSignal);
    throwIn.addEventListener("click", () => {
        if (inMotion) {
            return;
        }
        leftOrRight();
    });

    indirect.addEventListener("click", () => {
        if (inMotion) {
            return;
        }
        cardSelection(true)
    });
    penalty.addEventListener("click", () => {
        if (inMotion) {
            return;
        }
        cardSelection(null);
    });
    direct.addEventListener("click", () => {
        if (inMotion) {
            return;
        }
        cardSelection(false);
    });
}

newSignalButtons();