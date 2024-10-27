const PB = document.querySelector(".play-board");
const SE = document.querySelector(".score");
const HSE = document.querySelector(".high-score");
const GC = document.querySelectorAll(".game-controls i");

                  //PB = playBoard
                  //SE = Score Element
                 //HSE = HighScoreElement
                  //GC = GameControls

let gO = false;
let fX, fY;
let sX = 5, sY = 5;
let vX = 0, vY = 0;
let sB = [];
let SII;
let Score = 0;

                  //gO = gameOver
                  //sB = snakeBody
                  //SI = setIntervalId
            //fX = food in X, fY = food in Y
           //vX = velocity in X, vY = velocity in Y
           //sX = snake in X, sY = snake in Y
           
let highScore = localStorage.getItem("high-score") || 0;
HSE.innerText = `High Score: ${highScore}`;

const UpdateFoodPosition = () => {
    fX = Math.floor(Math.random() * 30) + 1;
    fY= Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(SII);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const chageDirection = e => {
    if(e.key === "ArrowUp" && vY != 1) {
        vX = 0;
        vY = -1;
    } else if(e.key === "ArrowDown" && vY != -1) {
        vX = 0;
        vY = 1;
    } else if(e.key === "ArrowRight" && vX != -1) {
        vX = 1;
        vY = 0;
    } else if(e.key === "ArrowLeft" && vX != 1) {
        vX = -1;
        vY = 0;
    }
}

GC.forEach(button => button.addEventListener("click",
() => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gO) return handleGameOver();
    let html = `<div class="food" style="grid-area:
    ${fY} / ${fX}"></div>`;


//Checking if the snake hit the food
if(sX === fX && sY === fY) {
    UpdateFoodPosition();
    sB.push({fY, fX});
    Score++; //increment score by 1
    highScore = Score >= highScore ? Score : highScore;
    localStorage.setItem("high-score", highScore);
    SE.innerText = `Score: ${Score}`;
}

sX += vX;
sY += vY;

for (let i = sB.length - 1; i > 0; i--) {
    sB[i] = sB[i - 1];
}

sB[0] = [sX, sY];

if(sX <= 0 || sX > 30 || sY <= 0 || sY > 30) {
    return gO = true;
}

for (let i = 0; i < sB.length; i++) {
    html += `<div class="head" style="grid-area: 
    ${sB[i][1]} / ${sB[i][0]}"></div>`;

    if (i !==  0 && sB[0][1] === sB[i][1] && sB[0][0] === sB[i][0]) {
        gO = true;
    }
}
PB.innerHTML = html;

}


UpdateFoodPosition();
SII = setInterval(initGame, 100);
document.addEventListener("keyup", chageDirection);
