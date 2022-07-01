function initializeBoard() {
    for (let i = 0; i < 6; i++) {
        document.getElementById("game-board").innerHTML += `<div id="row-${i}" style="display:inline-block">${i}</div>`;
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            // print(i + ", " + j);
            document.getElementById(`row-${i}`).innerHTML += `<div>${j}</div>`;
        }
    }
}