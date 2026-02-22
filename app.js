//Simon Says Game - Using JS
let userSeq = [];
let gameSeq = [];
// let scores = [];
let maxScore = localStorage.getItem('maxScore') || 0; //Storing scores permanently even after refresh
let btns = ['pink' , 'green' , 'orange' , 'blue'];
let started = false;
let level = 0;

let h2 = document.querySelector('h2');
let h3 = document.querySelector('h3');
h3.innerHTML = `Your highest Score till now : <b>${maxScore}</b>`;

document.addEventListener('keypress' , function(){
    if (started == false){
        console.log('game is started');
        started = true;
    }
    levelUp();
});

function gameFlash(btn){
    btn.classList.add('gameflash');
    setTimeout(function(){
        btn.classList.remove('gameflash');
    } , 250);
}
function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    } , 250);
}

function levelUp(){
    userSeq = []; //***VImp Since as level upgrades, user has to enter the entire sequence again
    level++;
    h2.innerText = `Level ${level}`;
    //Random button choose
    //To take out random color -> take random index from 0 till 3
    let randomIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randomIdx]; //Choose random color
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randomIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}
function findMaxScore(scores){
    let max = 0;
    for (let i = 0 ; i < scores.length ; i++){
        max = Math.max(max , scores[i]);
    }
    return max;
}
function checkAns(idx){

    if (userSeq[idx] == gameSeq[idx]){
        if (userSeq.length == gameSeq.length){
            setTimeout(levelUp , 1000);
        }
    }
    else{
        //Score = last level you played
        h2.innerHTML = `Game Over ! Your score <b>${level-1}</b> <br> Press any key to start the game`;
        
        maxScore = Math.max(maxScore , level-1);
        localStorage.setItem('maxScore' , maxScore);
        h3.innerHTML = `Your highest Score till now : <b>${maxScore}</b>`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        }, 150);
        reset();
    }
}

function btnPress(){
    // console.log(this);
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute('id');
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}



let allBtns = document.querySelectorAll('.btn');
for (let btn of allBtns){
    btn.addEventListener('click' , btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

