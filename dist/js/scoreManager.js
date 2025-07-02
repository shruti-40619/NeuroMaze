let currentScore =0;
let hintUsed = false;

const levelScoreConfig = [
  { win: 10, hint: -5 },
  { win: 15, hint: -7 },
  { win: 20, hint: -10 },
  { win: 25, hint: -15 },
  { win: 30, hint: -15 },
  { win: 35, hint: -20 },
  { win: 40, hint: -15 },
  { win: 45, hint: -25 },
  { win: 50, hint: -30 },
  { win: 100, hint: 0 }, 
];

export function resetScore(){
    currentScore=0;
    hintUsed=false;
    updateScoreUi();
}

export function addScore(points){
    currentScore += points;
    updateScoreUi();
}

export function deductScore(points){
    currentScore -= points;
    updateScoreUi();
}

export function getLevelScore(level){
    return levelScoreConfig[level];
}

export function markHintUsed(){
    hintUsed=true;
}


function updateScoreUi(){
    const display=document.getElementById("score");
    if(display){
        display.textContent=currentScore;
    }
}