let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

function startGame() {
    if(started == false){
        console.log("game is started");
        started = true;

        play();
        levelUp();
    }
}

document.addEventListener("keypress",startGame);

document.addEventListener("touchstart",function(e){
    if(!e.target.classList.contains("btn")){
        startGame();
    }
});

function play(){
    h2.innerText = "Enjoy Siman Says Game";
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    },250);

}


function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    },250);

}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText=`Level ${level}`;

    //random btn choose
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp(), 1100);
        }
    }else{
        if(level > highScore){
            highScore = level;
        }
        h2.innerText = "Please try again for boost your Score";
        h3.innerHTML = `<h3><b>Game over!</b></h3> <b>Your Score: ${level}</b> <br> <b>Highest Score: ${highScore}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor ="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "bisque";
        },150);
        reset();
    }
}

function btnPress(){
    //console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    //console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
