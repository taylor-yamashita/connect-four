// global variables
let inGame = false;

// gameplay functions
function initializeBoard() {
    for (let i = 0; i < 7; i++) {
        document.getElementById("game-board").innerHTML += `<div class="col" id="col-${i}" onclick="turn(${i})"></div>`;
    }
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
            document.getElementById(`col-${i}`).innerHTML += `<div class="cell">${i}, ${j}</div>`;
        }
    }
}

function startGame() {
    inGame = true;
}

const turn = (col) => {
    if (inGame) {
        console.log("col " + col + " clicked");
    }
}
