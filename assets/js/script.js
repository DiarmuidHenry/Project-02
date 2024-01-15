// Standard 5-choice game
let choices = [
    "Scissors",
    "Lizard",
    "Paper",
    "Spock",
    "Rock"
];

// Declare global variables
let playerChoiceIndex;
let playerChoice;
let playerOneChoiceIndex;
let playerOneChoice;
let playerTwoChoiceIndex;
let playerTwoChoice;
let playerScore = 0;
let computerScore = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let finalResult;
let gameResult;
let victory;
let defeat;
let opponent;
let listenerComputerCheck = false;
let listenerFriendCheck = false;


// Declare a constant s, which is the number of choices
const numberOfChoices = choices.length;
// Number of winning results (or losing results)
const numberOfWinningResults = (Math.floor(numberOfChoices / 2));

// Create arrays representing the possible results
const draw = [0];
const win = Array.from({ length: numberOfWinningResults }, (_, i) => i + 1);
const lose = Array.from({ length: numberOfWinningResults }, (_, i) => numberOfWinningResults + i + 1);



function adjustScore(gameResult) {
    if (gameResult === "win") {
        playerScore += 1;
        let playerScoreSpan = document.getElementById('player-score');
        playerScoreSpan.innerHTML = playerScore;
        console.log(`Player : ${playerScore} \nComputer : ${computerScore}`);
        if (playerScore === 10) {
            gameOver("victory");
            console.log(`Player : ${playerScore} \nComputer : ${computerScore}`);
        }
    } else if (gameResult === "lose") {
        computerScore += 1;
        let computerScoreSpan = document.getElementById('computer-score');
        computerScoreSpan.innerHTML = computerScore;
        console.log(`Player : ${playerScore} \nComputer : ${computerScore}`);
        if (computerScore === 10) {
            gameOver("defeat");
        }
    } else if (gameResult === "player 1") {
        playerOneScore += 1;
        let playerOneScoreSpan = document.getElementById("player-1-score");
        playerOneScoreSpan.innerHTML = playerOneScore;

    }
    
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

    resetScores();
    resetBorders();

    if (finalResult === "victory") {
        gameOverText.innerHTML = "You win! Play again?";
        console.log("YOU WIN THE GAME");
    } else {
        gameOverText.innerHTML = "You lost. Play again?";
        console.log("YOU LOSE THE GAME");
    }

}

function setPlayerOneChoice(clicked) {
    playerOneChoiceIndex = clicked;
    playerOneChoice = choices[clicked];
    console.log("Player 1 choice :\n" + playerOneChoice);
    document.getElementById(`player-1-choice-button-${clicked}`).classList.add("chosen-border");
}

function setPlayerTwoChoice(clicked) {
    playerTwoChoiceIndex = clicked;
    playerTwoChoice = choices[clicked];
    console.log("Player 2 choice :\n" + playerTwoChoice);
    document.getElementById(`player-2-choice-button-${clicked}`).classList.add("chosen-border");
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

    resetBorders();

    let outcome;

    let indexResult = (numberOfChoices + computerChoiceIndex - playerChoiceIndex) % numberOfChoices;
    // If choice corresponds to value in win, then win is logged.
    // Similarly for lose and draw. +s to keep modulo values +ve
    if (win.includes(indexResult)) {
        document.getElementById(`player-choice-button-${clicked}`).classList.add("win-border");
        gameResult = "win";
        outcome = "You win! " + playerChoice + " beats " + computerChoice;
    } else if (lose.includes(indexResult)) {
        document.getElementById(`player-choice-button-${clicked}`).classList.add("lose-border");
        gameResult = "lose";
        outcome = "You lose! " + computerChoice + " beats " + playerChoice;
    } else if (draw.includes(indexResult)) {
        document.getElementById(`player-choice-button-${clicked}`).classList.add("draw-border");
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
    const gameContainer = document.getElementById("game-container");
    gameContainer.style.display = "block";
    if (listenerComputerCheck == false) {
        for (let i = 0; i < choices.length; i++) {
            const buttonId = `player-choice-button-${i}`;
            const button = document.getElementById(buttonId);
            button.addEventListener("click", function () { setPlayerChoice(i); });
        }
        
        listenerComputerCheck = true;
    }
}

function resetScores() {
    let playerScoreSpan = document.getElementById('player-score');
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
        playerChoiceButtons[i].classList.remove("win-border", "lose-border", "draw-border", "chosen-border");
    }

}

function showPlayerOneChoices() {
    console.log("showPlayerOneChoices started");

    let playerOneChoicePopup = document.getElementById("player-1-make-choice");
    playerOneChoicePopup.style.display = "none";


    let playerOneArea = document.getElementById("player-1-area");
    playerOneArea.style.display = "flex";

    let gameArea = document.getElementById("game-area");
    let gameContainer = document.getElementById("game-container")
    let playerArea = document.getElementById("player-area");
    let computerArea = document.getElementById("computer-area");
    playerArea.style.display = "none";
    computerArea.style.display = "none";
    gameArea.style.display = "block";
    gameContainer.style.display = "block";
}

function showPlayerTwoPopup() {

    // Get the play game box, game container and game over elements
    const gameContainer = document.getElementById("game-container");
    // Hide game container

    console.log("hiding game container");
    gameContainer.style.display = "none";
    console.log("game container hidden");


    const playerTwoChoicePopup = document.getElementById("player-2-make-choice");
    playerTwoChoicePopup.style.display = "block";

    const playerTwoMakeChoiceButton = document.getElementById("player-2-make-choice-button");
    playerTwoMakeChoiceButton.addEventListener("click", function () { showPlayerTwoChoices(); });


}

function showPlayerTwoChoices() {
    console.log("showPlayerTwoChoices started");

    let playerTwoChoicePopup = document.getElementById("player-2-make-choice");
    playerTwoChoicePopup.style.display = "none";

    let playerTwoArea = document.getElementById("player-2-area");
    playerTwoArea.style.display = "flex";

    let gameArea = document.getElementById("game-area");
    let gameContainer = document.getElementById("game-container");
    let playerArea = document.getElementById("player-area");
    let computerArea = document.getElementById("computer-area");
    let playerOneArea = document.getElementById("player-1-area");
    // playerArea.style.display = "none";
    // computerArea.style.display = "none";
    playerOneArea.style.display = "none";
    gameArea.style.display = "block";
    gameContainer.style.display = "block";
}

function showResultTwoPlayer() {
    resetBorders();
    
    let indexResult = (numberOfChoices + playerOneChoiceIndex - playerTwoChoiceIndex) % numberOfChoices;
    // If choice corresponds to value in win, then win is logged.
    // Similarly for lose and draw. +s to keep modulo values +ve
    if (win.includes(indexResult)) {
        document.getElementById(`player-1-choice-button-${playerOneChoiceIndex}`).classList.add("win-border");
        document.getElementById(`player-2-choice-button-${playerTwoChoiceIndex}`).classList.add("lose-border");
        gameResult = "player 1";
        outcome = "Player 1 wins! " + playerOneChoice + " beats " + playerTwoChoice;
    } else if (lose.includes(indexResult)) {
        document.getElementById(`player-1-choice-button-${playerOneChoiceIndex}`).classList.add("lose-border");
        document.getElementById(`player-2-choice-button-${playerTwoChoiceIndex}`).classList.add("win-border");
        gameResult = "player 2";
        outcome = "Player 2 wins! " + playerTwoChoice + " beats " + playerOneChoice;
    } else if (draw.includes(indexResult)) {
        document.getElementById(`player-1-choice-button-${playerOneChoiceIndex}`).classList.add("draw-border");
        document.getElementById(`player-2-choice-button-${playerTwoChoiceIndex}`).classList.add("draw-border");
        gameResult = "neither";
        outcome = "DRAW";
    } else outcome = "Oops, something went wrong!";
    console.log(outcome);
    let showResultSpan = document.getElementById("show-result");
    showResultSpan.innerHTML = outcome;
    adjustScore(gameResult);

}

function startFriendGame() {

    console.log("friends game underway")

    // Get the play game box, game container and game over elements
    const playGameBox = document.getElementById("play-game-box");
    const gameContainer = document.getElementById("game-container");
    const gameOverBox = document.getElementById("game-over-box");
    // Hide game container

    console.log("hiding game container")
    gameContainer.style.display = "none";
    console.log("game container hidden")

    // Show game over container
    gameOverBox.style.display = "none";
    // get the p text inside the game over box
    let gameOverText = document.getElementById("game-over-text");

    // Show the divs with id "results-area-2p" and "score-area-2p"
    const resultsArea2p = document.getElementById("results-area-2p");
    resultsArea2p.style.display = "none";

    const scoreArea2p = document.getElementById("score-area-2p");
    scoreArea2p.style.display = "none";

    const playerOneChoicePopup = document.getElementById("player-1-make-choice");
    playerOneChoicePopup.style.display = "block";

    const playerOneMakeChoiceButton = document.getElementById("player-1-make-choice-button");
    playerOneMakeChoiceButton.addEventListener("click", function () { showPlayerOneChoices(); });

    if (listenerFriendCheck == false) {    
        for (let i = 0; i < choices.length; i++) {
            const buttonOneId = `player-1-choice-button-${i}`;
            const buttonOne = document.getElementById(buttonOneId);
            buttonOne.addEventListener("mousedown", function () { setPlayerOneChoice(i); });
            buttonOne.addEventListener("mouseup", function () { showPlayerTwoPopup(); })
        };
        for (let j = 0; j < choices.length; j++) {
        const buttonTwoId = `player-2-choice-button-${j}`;
        const buttonTwo = document.getElementById(buttonTwoId);
        buttonTwo.addEventListener("mousedown", function () { setPlayerTwoChoice(j); });
        buttonTwo.addEventListener("mouseup", function () {showResultTwoPlayer()});
        };
        listenerFriendCheck == true;
    }
}


// Loading game setup after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the play game box, game container and game over elements
    const playGameBoxes = document.getElementsByClassName("play-game-box");
    const gameContainer = document.getElementById("game-container");
    const playAgainstComputerButtons = document.getElementsByClassName("play-against-computer");
    const playAgainstFriendButtons = document.getElementsByClassName("play-against-friend");
    

    // Click event listner for play-against-computer buttons (play and replay)
    for (let i = 0; i < playAgainstComputerButtons.length; i++) {
        playAgainstComputerButtons[i].addEventListener("click", function () {
            startComputerGame();
        });
    }

    // Click event listener for play against friend
    for (let i = 0; i < playAgainstFriendButtons.length; i++) {
        playAgainstFriendButtons[i].addEventListener("click", function () {
            startFriendGame();
            console.log("FRIENDS GAME STARTED")
        });
    }

    // Iterate through elements with class "play-game-box"
    for (let j = 0; j < playGameBoxes.length; j++) {
        playGameBoxes[j].addEventListener("click", function () {
            // Hide ALL elements with class "play-game-box"
            for (let i = 0; i < playGameBoxes.length; i++) {
                playGameBoxes[i].style.display = "none";
            }
        });
    }

});

