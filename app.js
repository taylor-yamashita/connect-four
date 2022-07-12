// global constants
let maxCols = 7;
let maxRows = 6;

// global variables
let inGame = false;
let playerWon = false;
let currentPlayer = 1;
let gameBoard = []; 
let colsFull = [];

window.onload = () => {
    initializeBoard();
}

// set up after page load
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
    document.getElementById("start-btn").addEventListener("click", startGame);
    document.getElementById("quit-btn").addEventListener("click", quitGame);
}

// begin a new game
const startGame = () => {
    // set global variables
    inGame = true;
    currentPlayer = 1;

    // update button display
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("quit-btn").classList.remove("hidden");
    document.getElementById("player-display").classList.remove("hidden");

    // initialize empty game board double array and full column array
    for (let i = 0; i < maxCols; i++) {
        colsFull[i] = false;
        gameBoard[i] = [];
        for (let j = 0; j < maxRows; j++) {
            gameBoard[i][j] = null;
        }
    }
}

// quit the game
const quitGame = () => {
    // set global variables
    inGame = false;

    // update button display
    document.getElementById("quit-btn").classList.add("hidden");
    document.getElementById("start-btn").classList.remove("hidden");
    document.getElementById("player-display").classList.add("hidden");

    // reset board
    // need to reset board cells to darkseagreen
}

// take player turn
const playerMove = (col) => {
    if (inGame && colsFull[col] === false) {
        let openIndex = openCell(col);
        
        // update board front end
        pieceDrop(col, openIndex);

        // update board back end
        if (colsFull[col] === false) {
            gameBoard[col][openIndex] = currentPlayer;
        }

        // update current player display
        if (currentPlayer === 1) {
            document.getElementById("p1-turn-dot").style.backgroundColor = "white";
            document.getElementById("p2-turn-dot").style.backgroundColor = "yellow";
        } else {
            document.getElementById("p1-turn-dot").style.backgroundColor = "palevioletred";
            document.getElementById("p2-turn-dot").style.backgroundColor = "white";
        }

        // check for player win
        checkForWin();

        // switch current player 
        if (currentPlayer === 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }
    }
}

// handle front end during player turn
const pieceDrop = async (col, openIndex) => {
    let localCurrentPlayer = currentPlayer;
    // piece drop animation
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
    // set filled cell to player color 
    let currCell = document.getElementById(`cell-${col}-${openIndex}`);
    if (localCurrentPlayer === 1) {
        currCell.style.backgroundColor = "palevioletred";
    } else {
        currCell.style.backgroundColor = "yellow";
    }
}

// return next open board cell in column, given column index
const openCell = (col) => {
    let cell = gameBoard[col][0];
    let openIndex = 0;
    for (let i = 0; i < maxRows; i++) {
        cell = gameBoard[col][i];
        if (cell === null) {
            openIndex = i;
        }
    }
    // if last piece in col was just placed, mark col as full
    if (openIndex === 0 && colsFull[col] === false) {
        colsFull[col] = true;
    }
    return openIndex;
}

// check win conditions
const checkForWin = async () => {
    const localCurrentPlayer = currentPlayer;
    // vertical win check
    for (let i = 0; i < maxCols; i++) {
        let vertConsec = 0;
        for (let j = 0; j < maxRows; j++) {
            if (gameBoard[i][j] === localCurrentPlayer) {
                vertConsec++;
            } else {
                vertConsec = 0;
            }
            if (vertConsec >= 4) {
                inGame = false;
                await new Promise(resolve => setTimeout(resolve, 400))
                alert("Congratulations! Player " + localCurrentPlayer + " wins!");
                quitGame();
            }
        }
    }
    // horizontal win check
    for (let j = 0; j < maxRows; j++) {
        let horizConsec = 0;
        for (let i = 0; i < maxCols; i++) {
            if (gameBoard[i][j] === localCurrentPlayer) {
                horizConsec++;
            } else {
                horizConsec = 0;
            }
            if (horizConsec >= 4) {
                inGame = false;
                await new Promise(resolve => setTimeout(resolve, 700))
                alert("Congratulations! Player " + localCurrentPlayer + " wins!");
                quitGame();
            }
        }
    }
    // diagonal win check
    
}
