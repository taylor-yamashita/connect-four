// global variables
let inGame = false;

// gameplay functions
function initializeBoard() {
    for (let i = 0; i < 7; i++) {
        document.getElementById("game-board").innerHTML += `<div class="col" id="col-${i}" onclick="colClicked(${i})"></div>`;
    }
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
            document.getElementById(`col-${i}`).innerHTML += `<div class="cell">${i}, ${j}</div>`;
        }
    }
}

function startGame() {
    // set global variables
    inGame = true;

    // swap start and quit game buttons
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("quitBtn").classList.remove("hidden");
}

function quitGame() {
    // set global variables
    inGame = false;

    // swap start and quit game buttons
    document.getElementById("quitBtn").classList.add("hidden");
    document.getElementById("startBtn").classList.remove("hidden");
}

const colClicked = (col) => {
    if (inGame) {
        console.log("col " + col + " clicked");
    }
}
