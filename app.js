class Game {

    // Create new Game object
    constructor() {
        // variables
        this.inGame = false;
        this.currPlayer = 1;
        this.gameBoard = [];
        this.colsFull = [];

        // constants
        this.maxCols = 7;
        this.maxRows = 6;
    }

    // Set up board and buttons after page load
    initializeBoard = () => {
        // create columns
        for (let i = 0; i < this.maxCols; i++) {
            document.getElementById("game-board").innerHTML += `<div class="col" id="col-${i}"></div>`;
        }
        
        // add column listeners
        for (let i = 0; i < this.maxCols; i++) {
            const currCol = document.getElementById(`col-${i}`);
            currCol.addEventListener("click", this.playerMove);
            currCol.param = i;
        }
        
        // create board cells within columns
        for (let i = 0; i < this.maxCols; i++) {
            for (let j = 0; j < this.maxRows; j++) {
                document.getElementById(`col-${i}`).innerHTML += `<div class="cell" id="cell-${i}-${j}"></div>`;
            }
        } 
        document.getElementById("start-btn").addEventListener("click", this.startGame);
        document.getElementById("quit-btn").addEventListener("click", this.quitGame);
    }


    // Begin new game
    startGame = () => {
        // set global variables
        this.inGame = true;
        this.currPlayer = 1;

        // update button display
        document.getElementById("start-btn").classList.add("hidden");
        document.getElementById("quit-btn").classList.remove("hidden");
        document.getElementById("player-display").classList.remove("hidden");

        // initialize empty game board double array and full column array
        for (let i = 0; i < this.maxCols; i++) {
            this.colsFull[i] = false;
            this.gameBoard[i] = [];
            for (let j = 0; j < this.maxRows; j++) {
                this.gameBoard[i][j] = null;
            }
        }
    }


    // Quit the game
    quitGame = () => {
        // set global variables
        this.inGame = false;

        // update button display
        document.getElementById("quit-btn").classList.add("hidden");
        document.getElementById("start-btn").classList.remove("hidden");
        document.getElementById("player-display").classList.add("hidden");

        // reset board
        for (let i = 0; i < this.maxCols; i++) {
            for (let j = 0; j < this.maxRows; j++) {
                let cell = document.getElementById(`cell-${i}-${j}`);
                cell.style.backgroundColor = "darkseagreen";
            }
        } 
    }


    // Take player turn
    playerMove = (e) => {
        let col = e.currentTarget.param;

        if (this.inGame && this.colsFull[col] === false) {
            // update current player display
            if (this.currPlayer === 1) {
                document.getElementById("p1-turn-dot").style.backgroundColor = "white";
                document.getElementById("p2-turn-dot").style.backgroundColor = "yellow";
            } else {
                document.getElementById("p1-turn-dot").style.backgroundColor = "palevioletred";
                document.getElementById("p2-turn-dot").style.backgroundColor = "white";
            }
            
            // update board front end and back end
            let openIndex = this.openCell(col);
            this.pieceDrop(col, openIndex);
            this.gameBoard[col][openIndex] = this.currPlayer;

            // check win conditions
            this.checkForWin();

            // switch current player 
            if (this.currPlayer === 1) {
                this.currPlayer = 2;
            } else {
                this.currPlayer = 1;
            }
        }
    }


    // Given column index, return next open board cell in column
    openCell = (col) => {
        let cell = this.gameBoard[col][0];
        let openIndex = 0;
        for (let i = 0; i < this.maxRows; i++) {
            cell = this.gameBoard[col][i];
            if (cell === null) {
                openIndex = i;
            }
        }
        
        // if column is now full, update full col array
        if (openIndex === 0 && this.colsFull[col] === false) {
            this.colsFull[col] = true;
        }
        
        return openIndex;
    }


    // Given current col and open index, run animation and update front end board
    pieceDrop = async (col, openIndex) => {
        let player = this.currPlayer;
        
        // piece drop animation
        for (let j = 0; j < this.maxRows; j++) {
            const cell = document.getElementById(`cell-${col}-${j}`);
            if (this.gameBoard[col][j] === null) {
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
    checkForWin = async () => {
        const player = this.currPlayer;
        
        // vertical win check
        for (let i = 0; i < this.maxCols; i++) {
            let vertConsec = 0;
            for (let j = 0; j < this.maxRows; j++) {
                if (this.gameBoard[i][j] === player) {
                    vertConsec++;
                } else {
                    vertConsec = 0;
                }
                if (vertConsec >= 4) { this.handleWin(player); }
            }
        }
        
        // horizontal win check
        for (let j = 0; j < this.maxRows; j++) {
            let horizConsec = 0;
            for (let i = 0; i < this.maxCols; i++) {
                if (this.gameBoard[i][j] === player) {
                    horizConsec++;
                } else {
                    horizConsec = 0;
                }
                if (horizConsec >= 4) { this.handleWin(player); }
            }
        }
        
        // diagonal win check 1
        
        // first half (upper triangle)
        for (let i = 0; i < this.maxCols; i++) {
            let diagConsec1 = 0;
            for (let j = i; j >= 0 && i - j < this.maxRows; j--) {
                if (this.gameBoard[i - j][j] === player) {
                    diagConsec1++;
                } else {
                    diagConsec1 = 0;
                }
                if (diagConsec1 >= 4) { this.handleWin(player); }
            }
        }
        // second half (lower triangle)
        for (let i = 1; i < this.maxCols; i++) {
            let diagConsec1 = 0;
            for (let j = this.maxRows - 1, k = 0; j >= 0 && i + k < this.maxCols; j--, k++) {
                if (this.gameBoard[i + k][j] === player) {
                    diagConsec1++;
                } else {
                    diagConsec1 = 0;
                }
                if (diagConsec1 >= 4) { this.handleWin(player); }
            }
        }
        
        // diagonal win check 2
        
        // first half (upper triangle)
        for (let i = this.maxRows; i >= 0; i--) {
            let diagConsec2 = 0;
            for (let j = 0; i + j < this.maxCols; j++) {
                console.log
                if (this.gameBoard[i + j][j] === player) {
                    diagConsec2++;
                } else {
                    diagConsec2 = 0;
                }
                if (diagConsec2 >= 4) { this.handleWin(player); }
            }
        }
        // second half (lower triangle)
        for (let j = 1; j < this.maxRows; j++) {
            let diagConsec2 = 0;
            for (let i = 0, k = 0; i < this.maxCols && j + k < this.maxRows; i++, k++) {
                if (this.gameBoard[i][j + k] === player) {
                    diagConsec2++;
                } else {
                    diagConsec2 = 0;
                }
                if (diagConsec2 >= 4) { this.handleWin(player); }
            }   
        }
    }


    // Announce player win and reset game
    handleWin = async (player) => {
        this.inGame = false;
        await new Promise(resolve => setTimeout(resolve, 600))
        alert("Congratulations! Player " + player + " wins!");
        this.quitGame();
    }

}


// Main
window.onload = () => {
    let game = new Game();
    game.initializeBoard();
}