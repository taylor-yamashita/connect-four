// global variables
let inGame = false;
let playerWon = false;
let currentPlayer = 1;
let gameBoard = []; 

// global constants
let maxCols = 7;
let maxRows = 6;

// called upon page load
const initializeBoard = () => {
    // create columns
    for (let i = 0; i < maxCols; i++) {
        document.getElementById("game-board").innerHTML += `<div class="col" id="col-${i}" onclick="playerMove(${i})"></div>`;
    }
    // create board cells within columns
    for (let i = 0; i < maxCols; i++) {
        for (let j = 0; j < maxRows; j++) {
            document.getElementById(`col-${i}`).innerHTML += `<div class="cell" id="cell-${i}-${j}"></div>`;
        }
    }
}

// called when start button is clicked 
const startGame = () => {
    // set global variables for new game
    inGame = true;
    currentPlayer = 1;

    // swap start and quit game buttons
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("quit-btn").classList.remove("hidden");

    // show current player display
    document.getElementById("player-display").classList.remove("hidden");

    // initialize empty game board double array
    for (let i = 0; i < maxCols; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < maxRows; j++) {
            gameBoard[i][j] = null;
        }
    }
}

// called when quit button is clicked
const quitGame = () => {
    // set global variables
    inGame = false;

    // swap start and quit game buttons
    document.getElementById("quit-btn").classList.add("hidden");
    document.getElementById("start-btn").classList.remove("hidden");

    // hide current player display
    document.getElementById("player-display").classList.add("hidden");
}

// called when board is clicked during game
const playerMove = (col) => {
    if (inGame) {
        // piece drop animation (colored based on current player)
        const loop = async () => {
            let localCurrentPlayer = currentPlayer;
            for (let j = 0; j < maxRows; j++) {
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

        // update board array


        // switch current player
        if (currentPlayer === 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }

        // update current player display
        if (currentPlayer === 1) {
            document.getElementById("p1-turn-dot").style.backgroundColor = "palevioletred";
            document.getElementById("p2-turn-dot").style.backgroundColor = "white";
        } else {
            document.getElementById("p1-turn-dot").style.backgroundColor = "white";
            document.getElementById("p2-turn-dot").style.backgroundColor = "yellow";
        }

        // check for player win; if win, handle end game
    }
}