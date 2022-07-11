// global constants
let maxCols = 7;
let maxRows = 6;

// global variables
let inGame = false;
let playerWon = false;
let currentPlayer = 1;
let gameBoard = []; 
let colsFull = [];

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

    // initialize empty game board double array and array tracking full cols
    for (let i = 0; i < maxCols; i++) {
        colsFull[i] = false;
        
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

    // reset board
    // need to reset board cells to darkseagreen
}

// called when board is clicked during game
const playerMove = (col) => {
    if (inGame && colsFull[col] === false) {
        // update board back end
        let openIndex = openCell(col);

        // piece drop animation
        const loop = async () => {
            let localCurrentPlayer = currentPlayer;
            for (let j = 0; j < maxRows; j++) {
                const cell = document.getElementById(`cell-${col}-${j}`);
                if (gameBoard[col][j] === null) {
                    // set cells to correct color
                    if (localCurrentPlayer === 1) {
                        cell.style.backgroundColor = "palevioletred";
                    } else {
                        cell.style.backgroundColor = "yellow";
                    }
                    if (j !== openIndex) {
                        // sleep, then reset background color
                        await new Promise(resolve => setTimeout(resolve, 110))
                        cell.style.backgroundColor = "darkseagreen";
                    }
                }   
            }
            // update board front end
            let openCell = document.getElementById(`cell-${col}-${openIndex}`);
            if (localCurrentPlayer === 1) {
                openCell.style.backgroundColor = "palevioletred";
            } else {
                openCell.style.backgroundColor = "yellow";
            }
        }
        loop();

        // switch current player 
        if (currentPlayer === 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }

        // update current player display
        if (currentPlayer === 1) {
            document.getElementById("p1-turn-dot").classList.remove("hidden");
            document.getElementById("p2-turn-dot").classList.add("hidden");
        } else {
            document.getElementById("p1-turn-dot").classList.add("hidden");
            document.getElementById("p2-turn-dot").classList.remove("hidden");
        }

        // check for player win; if win, handle end game
    }
}

// called when players make moves. takes col index and returns next open board cell in that column. 
const openCell = (col) => {
    let currCell = gameBoard[col][0];
    let openIndex = 0;
    for (let i = 0; i < maxRows; i++) {
        currCell = gameBoard[col][i];
        if (currCell === null) {
            openIndex = i;
        }
    }

    // check if col is full
    if (openIndex === 0 && colsFull[col] === false) {
        colsFull[col] = true;
    }
    
    // if col not full, fill board cell with "1" or "2" to track play
    if (colsFull[col] === false) {
        gameBoard[col][openIndex] = currentPlayer;
    }

    // update front end to reflect current board
    // let openCell = document.getElementById(`cell-${col}-${openIndex}`);
    // if (currentPlayer === 1) {
    //     openCell.style.backgroundColor = "palevioletred";
    // } else {
    //     openCell.style.backgroundColor = "yellow";
    // }

    return openIndex;
    
}