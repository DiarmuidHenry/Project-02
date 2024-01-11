function updateComputerChoiceImage() {
}

function setPlayerChoice(clicked) {
    playerChoiceIndex = clicked;
    playerChoice = choices[clicked]
}

function showResult(outcome) {
    let resultSpan = document.getElementById('result');
    resultSpan.innerHTML = outcome;
}

function endGame() {

}


