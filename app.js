// Global Constants
const maxCols = 7;
const maxRows = 6;

// Global Variables
let inGame = false;
let currentPlayer = 1;
let gameBoard = []; 
let colsFull = [];


// Main
window.onload = () => {
    initializeBoard();
}


// Set up board and buttons after page load
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


// Begin new game
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


// Quit the game
const quitGame = () => {
    // set global variables
    inGame = false;

    // update button display
    document.getElementById("quit-btn").classList.add("hidden");
    document.getElementById("start-btn").classList.remove("hidden");
    document.getElementById("player-display").classList.add("hidden");

    // reset board
    for (let i = 0; i < maxCols; i++) {
        for (let j = 0; j < maxRows; j++) {
            let cell = document.getElementById(`cell-${i}-${j}`);
            cell.style.backgroundColor = "darkseagreen";
        }
    } 
}


// Take player turn
const playerMove = (col) => {
    if (inGame && colsFull[col] === false) {
        // update current player display
        if (currentPlayer === 1) {
            document.getElementById("p1-turn-dot").style.backgroundColor = "white";
            document.getElementById("p2-turn-dot").style.backgroundColor = "yellow";
        } else {
            document.getElementById("p1-turn-dot").style.backgroundColor = "palevioletred";
            document.getElementById("p2-turn-dot").style.backgroundColor = "white";
        }
        
        // update board front end and back end
        let openIndex = openCell(col);
        pieceDrop(col, openIndex);
        gameBoard[col][openIndex] = currentPlayer;

        // check win conditions
        checkForWin();

        // switch current player 
        if (currentPlayer === 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }
    }
}


// Given column index, return next open board cell in column
const openCell = (col) => {
    let cell = gameBoard[col][0];
    let openIndex = 0;
    for (let i = 0; i < maxRows; i++) {
        cell = gameBoard[col][i];
        if (cell === null) {
            openIndex = i;
        }
    }
    
    // if column is now full, update full col array
    if (openIndex === 0 && colsFull[col] === false) {
        colsFull[col] = true;
    }
    
    return openIndex;
}


// Given current col and open index, run animation and update front end board
const pieceDrop = async (col, openIndex) => {
    let player = currentPlayer;
    
    // piece drop animation
    for (let j = 0; j < maxRows; j++) {
        const cell = document.getElementById(`cell-${col}-${j}`);
        if (gameBoard[col][j] === null) {
            if (player === 1) {
                cell.style.backgroundColor = "palevioletred";
            } else {
                cell.style.backgroundColor = "yellow";
            }
            if (j !== openIndex) {
                await new Promise(resolve => setTimeout(resolve, 110))
                cell.style.backgroundColor = "darkseagreen";
            }
        }   
    }
    
    // set piece color in board cell
    let currCell = document.getElementById(`cell-${col}-${openIndex}`);
    if (player === 1) {
        currCell.style.backgroundColor = "palevioletred";
    } else {
        currCell.style.backgroundColor = "yellow";
    }
}


// Check win conditions and handle wins
const checkForWin = async () => {
    const player = currentPlayer;
    
    // vertical win check
    for (let i = 0; i < maxCols; i++) {
        let vertConsec = 0;
        for (let j = 0; j < maxRows; j++) {
            if (gameBoard[i][j] === player) {
                vertConsec++;
            } else {
                vertConsec = 0;
            }
            if (vertConsec >= 4) {
                handleWin(player);
            }
        }
    }
    
    // horizontal win check
    for (let j = 0; j < maxRows; j++) {
        let horizConsec = 0;
        for (let i = 0; i < maxCols; i++) {
            if (gameBoard[i][j] === player) {
                horizConsec++;
            } else {
                horizConsec = 0;
            }
            if (horizConsec >= 4) {
                handleWin(player);
            }
        }
    }
    
    // diagonal win check 1
    
    // first half (upper triangle)
    for (let i = 0; i < maxCols; i++) {
        let diagConsec1 = 0;
        for (let j = i; j >= 0 && i - j < maxRows; j--) {
            if (gameBoard[i][i - j] === player) {
                diagConsec1++;
            } else {
                diagConsec1 = 0;
            }
            if (diagConsec1 >= 4) {
                handleWin(player);
            }
        }
    }
    // second half (lower triangle)
    for (let i = 1; i < maxCols; i++) {
        let diagConsec1 = 0;
        for (let j = maxRows - 1, k = 0; j >= 0 && i + k < maxCols; j--, k++) {
            if (gameBoard[i + k][j] === player) {
                diagConsec1++;
            } else {
                diagConsec1 = 0;
            }
            if (diagConsec1 >= 4) {
                handleWin(player);
            }
        }
    }
    
    // diagonal win check 2
    
    // first half (upper triangle)
    for (let i = maxRows; i >= 0; i--) {
        let diagConsec2 = 0;
        for (let j = 0; i + j < maxCols; j++) {
            if (gameBoard[i + j][j] === player) {
                diagConsec2++;
            } else {
                diagConsec2 = 0;
            }
            if (diagConsec2 >= 4) {
                handleWin(player);
            }
        }
    }
    // second half (lower triangle)
    for (let j = 1; j < maxRows; j++) {
        let diagConsec2 = 0;
        for (let i = 0, k = 0; i < maxCols && j + k < maxRows; i++, k++) {
            if (gameBoard[i][j + k] === player) {
                diagConsec2++;
            } else {
                diagConsec2 = 0;
            }
            if (diagConsec2 >= 4) {
                handleWin(player);
            }
        }
    }
}


// Announce player win and reset game
const handleWin = async (player) => {
    inGame = false;
    await new Promise(resolve => setTimeout(resolve, 600))
    alert("Congratulations! Player " + player + " wins!");
    quitGame();
}
