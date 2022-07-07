// global variables
let inGame = false;
let player1Turn = true;

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
    // set global variables
    inGame = true;

    // swap start and quit game buttons
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("quit-btn").classList.remove("hidden");

    // show turn indicator
    document.getElementById("turn-display").classList.remove("hidden");

    turn();
}

function turn() {
    // show which player is taking turn
    if (player1Turn) {
        document.getElementById("p1-turn-dot").style.backgroundColor = "palevioletred";
        document.getElementById("p2-turn-dot").style.backgroundColor = "white";
    } else {
        document.getElementById("p1-turn-dot").style.backgroundColor = "white";
        document.getElementById("p2-turn-dot").style.backgroundColor = "yellow";
    }

    // // switch turn
    // if (player1Turn) {
    //     player1Turn = false;
    // } else {
    //     player1Turn = true;
    // }
}

const colClicked = (col) => {
    if (inGame) {
        console.log("col " + col + " clicked");
    }

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
            await new Promise(resolve => setTimeout(resolve, 100))
            cell.style.backgroundColor = "darkseagreen";
        }
        
    }

    loop();

    // for (let j = 0; j < 6; j++) {
    //     cell = document.getElementById(`cell-${col}-${j}`);
    //     console.log(cell);
    //     // set cells to correct color
    //     if (player1Turn) {
    //         cell.style.backgroundColor = "palevioletred";
    //     } else {
    //         cell.style.backgroundColor = "yellow";
    //     }
    //     // await wait(2000);
    //     // setTimeout(() => { }, 1000);
    //     cell.style.backgroundColor = "darkseagreen";
    // }
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


