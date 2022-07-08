// global variables
let inGame = false;
let playerWon = false;
let currentPlayer = 1;

// gameplay functions
function initializeBoard() {
    for (let i = 0; i < 7; i++) {
        document.getElementById("game-board").innerHTML += `<div class="col" id="col-${i}" onclick="colClicked(${i})"></div>`;
    }
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
            document.getElementById(`col-${i}`).innerHTML += `<div class="cell" id="cell-${i}-${j}"></div>`;
        }
    }
}

function startGame() {
    // set global variables for new game
    inGame = true;
    currentPlayer = 1;
    playerClicked = false;

    // swap start and quit game buttons
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("quit-btn").classList.remove("hidden");

    // show current player
    document.getElementById("current-player-display").classList.remove("hidden");
}

const colClicked = (col) => {
    if (inGame) {

        playerClicked = true;

        // piece drop animation
        const loop = async () => {
            let localCurrentPlayer = currentPlayer;
            for (let j = 0; j < 6; j++) {
                const cell = document.getElementById(`cell-${col}-${j}`);
                // set cells to correct color
                if (localCurrentPlayer === 1) {
                    cell.style.backgroundColor = "palevioletred";
                } else {
                    cell.style.backgroundColor = "yellow";
                }
                // sleep, then reset background color
                await new Promise(resolve => setTimeout(resolve, 110))
                cell.style.backgroundColor = "darkseagreen";
            }
        }
        loop();

        // switch current player
        if (currentPlayer === 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }

        // update current player
        if (currentPlayer === 1) {
            document.getElementById("p1-turn-dot").style.backgroundColor = "palevioletred";
            document.getElementById("p2-turn-dot").style.backgroundColor = "white";
        } else {
            document.getElementById("p1-turn-dot").style.backgroundColor = "white";
            document.getElementById("p2-turn-dot").style.backgroundColor = "yellow";
        }
    }
}

function quitGame() {
    // set global variables
    inGame = false;

    // swap start and quit game buttons
    document.getElementById("quit-btn").classList.add("hidden");
    document.getElementById("start-btn").classList.remove("hidden");

    // hide current player
    document.getElementById("current-player-display").classList.add("hidden");
}


