// global variables
let inGame = false;
let player1Turn = true;
let playerClicked = false;

// gameplay functions
function initializeBoard() {
    for (let i = 0; i < 7; i++) {
        // document.getElementById("game-board").innerHTML += `<div class="col" id="col-${i}" onclick="colClicked(${i})"></div>`;
        document.getElementById("game-board").innerHTML += `<div class="col" id="col-${i}"></div>`;
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
    player1Turn = true;
    playerClicked = false;

    // swap start and quit game buttons
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("quit-btn").classList.remove("hidden");

    // show turn indicator
    document.getElementById("turn-display").classList.remove("hidden");

    // run game - loop repeating turn() while ingame i.e. while neither player has won yet
   
    // while (inGame) {
    //     turn();
    //     // check win logic every turn
    // }

    for (let i = 0; i < 4; i++) {
        console.log(i);
        if (!playerClicked) {
            turn();
        }
    }

    // exit loop, handle game end
}

function turn() {
    console.log('turn');
    // show which player is taking turn
    if (player1Turn) {
        document.getElementById("p1-turn-dot").style.backgroundColor = "palevioletred";
        document.getElementById("p2-turn-dot").style.backgroundColor = "white";
    } else {
        document.getElementById("p1-turn-dot").style.backgroundColor = "white";
        document.getElementById("p2-turn-dot").style.backgroundColor = "yellow";
    }

    for (let i = 0; i < 7; i++) {
        document.getElementById(`col-${i}`).onclick = () => colClicked(i);
    }

    switchTurn();
}

// switch turn - update globals
function switchTurn() {
    if (player1Turn && playerClicked) {
        player1Turn = false;
    } else if (!player1Turn && playerClicked) {
        player1Turn = true;
    }
    console.log('switch');
    playerClicked = false;
    console.log(player1Turn);
    console.log(playerClicked);
}

const colClicked = (col) => {
    console.log('clicked');
    if (inGame) {
        playerClicked = true;
        
        // piece drop animation
        const loop = async () => {
            for (let j = 0; j < 6; j++) {
                const cell = document.getElementById(`cell-${col}-${j}`);
                // set cells to correct color
                if (player1Turn) {
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

        // remove onclick listeners from columns 
        for (let i = 0; i < 7; i++) {
            document.getElementById(`col-${i}`).onclick = null;
        }
    }
}

function quitGame() {
    // set global variables
    inGame = false;

    // swap start and quit game buttons
    document.getElementById("quit-btn").classList.add("hidden");
    document.getElementById("start-btn").classList.remove("hidden");

    // hide turn indicator
    document.getElementById("turn-display").classList.add("hidden");
}


