// Standard 5-choice game
let choices = [
    "Scissors",
    "Lizard",
    "Paper",
    "Spock",
    "Rock"
];

let playerChoiceIndex;
let playerScore = 0;
let computerScore = 0;

// Declare a constant s, which is the number of choices
const numberOfChoices = choices.length;
// Number of winning results (or losing results)
const numberOfWinningResults = (Math.floor(numberOfChoices / 2));

// Create arrays representing the possible results
const draw = [0];
const win = Array.from({ length: numberOfWinningResults }, (_, i) => i + 1);
const lose = Array.from({ length: numberOfWinningResults }, (_, i) => numberOfWinningResults + i + 1);

let finalResult;
let gameResult;
let victory;
let defeat;
let opponent;
let listenerCheck = false;

function adjustScore(gameResult) {
    if (gameResult === "win") {
        playerScore += 1;
        let playerScoreSpan = document.getElementById('player-1-score');
        playerScoreSpan.innerHTML = playerScore;
        if (playerScore === 10) {
            gameOver("victory");
        }
    } else if (gameResult === "lose") {
        computerScore += 1;
        let computerScoreSpan = document.getElementById('computer-score');
        computerScoreSpan.innerHTML = computerScore;
        if (computerScore === 10) {
            gameOver("defeat");
        }
    }
    console.log(`Player : ${playerScore} \nComputer : ${computerScore}`);
}

function gameOver(finalResult) {
    // Get the play game box, game container and game over elements
    const playGameBox = document.getElementById("play-game-box");
    const gameContainer = document.getElementById("game-container");
    const gameOverBox = document.getElementById("game-over-box");
    // Hide game container
    gameContainer.style.display = "none";

    // Show game over container
    gameOverBox.style.display = "block";
    // get the p text inside the game over box
    let gameOverText = document.getElementById("game-over-text");

    if (finalResult === "victory") {
        gameOverText.innerHTML = "You win! Play again?";
        console.log("YOU WIN THE GAME");
    } else {
        gameOverText.innerHTML = "You lost. Play again?";
        console.log("YOU LOSE THE GAME");
    }
    // for (let i = 0; i < choices.length; i++) {
    //     const buttonId = `player-1-choice-button-${i}`;
    //     const button = document.getElementById(buttonId);
    //     // REMOVE click event listener to each button, activated on click
    //     button.removeEventListener("click", function () { setPlayerChoice(i); });
}


function setPlayerChoice(clicked) {
    playerChoiceIndex = clicked;
    playerChoice = choices[clicked];
    let computerChoiceIndex = Math.floor(Math.random() * numberOfChoices);
    let computerChoice = choices[computerChoiceIndex];

    console.log("computerChoice :\n" + computerChoice + "\n");
    console.log("playerChoice :\n" + playerChoice + "\n");

    let computerChoiceImage = document.getElementById("computer-choice-image");
    let newImagePath = `assets/images/${computerChoice.toLowerCase()}.png`;
    computerChoiceImage.src = newImagePath;

    // Removing border from all buttons. This way, there's no need to keep track of prevous clicked
    let playerChoiceButtons = document.getElementsByClassName("player-choices-buttons");
    for (let i = 0; i < playerChoiceButtons.length; i++) {
        playerChoiceButtons[i].classList.remove("win-border", "lose-border", "draw-border");
    }

    let outcome;

    let indexResult = (numberOfChoices + computerChoiceIndex - playerChoiceIndex) % numberOfChoices;
    // If choice corresponds to value in win, then win is logged.
    // Similarly for lose and draw. +s to keep modulo values +ve
    if (win.includes(indexResult)) {
        document.getElementById(`player-1-choice-button-${clicked}`).classList.add("win-border");
        gameResult = "win";
        outcome = "You win! " + playerChoice + " beats " + computerChoice;
    } else if (lose.includes(indexResult)) {
        document.getElementById(`player-1-choice-button-${clicked}`).classList.add("lose-border");
        gameResult = "lose";
        outcome = "You lose! " + computerChoice + " beats " + playerChoice;
    } else if (draw.includes(indexResult)) {
        document.getElementById(`player-1-choice-button-${clicked}`).classList.add("draw-border");
        gameResult = "draw";
        outcome = "DRAW";
    } else outcome = "Oops, something went wrong!";
    console.log(outcome);
    let resultSpan = document.getElementById('result');
    resultSpan.innerHTML = outcome;

    adjustScore(gameResult);
}


// Iterate through buttons and attach corresponding event listeners to each 1
function startComputerGame() {
    // for (let i = 0; i < choices.length; i++) {
    // const buttonId = `player-1-choice-button-${i}`;
    // const button = document.getElementById(buttonId);
    // Add click event listener to each button, activated on click
    if (listenerCheck == false) {
        for (let i = 0; i < choices.length; i++) {
            const buttonId = `player-1-choice-button-${i}`;
            const button = document.getElementById(buttonId);
            button.addEventListener("click", function () { setPlayerChoice(i); });
        }
        listenerCheck = true;
    }
}

function resetScores() {
    let playerScoreSpan = document.getElementById('player-1-score');
    let computerScoreSpan = document.getElementById('computer-score');

    // Reset scores to 0
    playerScore = 0;
    computerScore = 0;

    // Update the score display
    playerScoreSpan.innerHTML = playerScore;
    computerScoreSpan.innerHTML = computerScore;
}

function resetBorders() {
    let playerChoiceButtons = document.getElementsByClassName("player-choices-buttons");
    for (let i = 0; i < playerChoiceButtons.length; i++) {
        playerChoiceButtons[i].classList.remove("win-border", "lose-border", "draw-border");
    }

}


// startComputerGame();
// let endTime = new Date();
// let timeElapsed = endTime - startTime;
// console.log("\nTotal time taken :\n" + timeElapsed + "ms");

document.addEventListener("DOMContentLoaded", function () {
    // Get the play game box, game container and game over elements
    const playGameBoxes = document.getElementsByClassName("play-game-box");
    const gameContainer = document.getElementById("game-container");
    const playAgainstComputerButtons = document.getElementsByClassName("play-against-computer");
    const playAgainstFriendButtons = document.getElementsByClassName("play-against-friend");



    // Click event listner for play-against-computer buttons (play and replay)
    for (let i = 0; i < playAgainstComputerButtons.length; i++) {
        playAgainstComputerButtons[i].addEventListener("click", function () {
            // Reset scores to 0
            resetScores();

            // Remove borders from all buttons
            resetBorders();

            // Run computer opponent game code
            startComputerGame();
        });
    }

    // Click event listener for play against friend
    for (let i = 0; i < playAgainstFriendButtons.length; i++) {
        playAgainstFriendButtons[i].addEventListener("click", function () {
            // Reset scores to 0
            resetScores();

            // Remove borders from all buttons
            resetBorders();

            // Show game container
            gameContainer.style.display = "block";

            // Run friend game code (modify as needed)
            startFriendGame();
        });
    }

    // Iterate through elements with class "play-game-box"
    for (let j = 0; j < playGameBoxes.length; j++) {
        playGameBoxes[j].addEventListener("click", function () {
            // Hide ALL elements with class "play-game-box"
            for (let i = 0; i < playGameBoxes.length; i++) {
                playGameBoxes[i].style.display = "none";
            }

            // Show game-container
            gameContainer.style.display = "block";
        });
    }
});

// deciding which game to set up, depending on whether opponent
// is chosen as computer or friend
function gameTypeDecider(opponent) {
    if (opponent == "computer") {
        startComputerGame();
    } else if (opponent == "friend") {
        startFriendGame();
    }

}