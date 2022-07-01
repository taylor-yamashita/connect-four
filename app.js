function initializeBoard() {
    for (let j = 0; j < 7; j++) {
        document.getElementById("game-board").innerHTML += `<div class="col" id="col-${j}"></div>`;
    }
    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 6; i++) {
            document.getElementById(`col-${j}`).innerHTML += `<div class="cell">${j}, ${i}</div>`;
        }
    }
}