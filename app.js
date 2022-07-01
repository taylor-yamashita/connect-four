function initializeBoard() {
    for (let i = 0; i < 6; i++) {
        document.getElementById("game-board").innerHTML += `<div class="row" id="row-${i}"></div>`;
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            document.getElementById(`row-${i}`).innerHTML += `<div class="cell">${i}, ${j}</div>`;
        }
    }
}