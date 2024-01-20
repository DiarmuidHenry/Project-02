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
let playerOne;
let playerTwo;
let playerScore = 0;
let computerScore = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let firstScore = 0;
let secondScore = 0;
let finalResult;
let gameResult;
let victory;
let defeat;
let opponent;
let listenerComputerCheck = false;
let listenerFriendCheck = false;
let instructionsShowing = false;


// Declare a constant s, which is the number of choices
const numberOfChoices = choices.length;
// Number of winning results (or losing results)
const numberOfWinningResults = (Math.floor(numberOfChoices / 2));

// Create arrays representing the possible results
const draw = [0];
const win = Array.from({ length: numberOfWinningResults }, (_, i) => i + 1);
const lose = Array.from({ length: numberOfWinningResults }, (_, i) => numberOfWinningResults + i + 1);

function disableButtons() {
    let playerChoiceButtons = document.getElementsByClassName("player-choices-buttons");
    for (let i = 0; i < playerChoiceButtons.length; i++) {
        playerChoiceButtons[i].disabled = true;
    }
}


function adjustScore(gameResult) {
    let playerOneName = document.getElementById("player-1-name");
    let playerTwoName = document.getElementById("player-2-name");
    let playerScoreSpan = document.getElementById('player-score');
    let computerScoreSpan = document.getElementById('computer-score');
    let playerOneScoreSpan = document.getElementById("player-1-score-2p");
    let playerTwoScoreSpan = document.getElementById("player-2-score-2p");
    let nextRoundButton = document.getElementById("next-round-button")

    if (gameResult === "Player") {
        firstScore += 1;
        playerScoreSpan.innerHTML = firstScore;
    } else if (gameResult === "Computer") {
        secondScore += 1;
        computerScoreSpan.innerHTML = secondScore;
    } else if (gameResult === "Player 1") {
        firstScore += 1;
        playerOneScoreSpan.innerHTML = firstScore;
        playerOneName.style.color = "lime";
        playerTwoName.style.color = "red";
    } else if (gameResult === "Player 2") {
        secondScore += 1;
        playerTwoScoreSpan.innerHTML = secondScore;
        playerOneName.style.color = "red";
        playerTwoName.style.color = "lime";
    }

    if ((firstScore === 10 || secondScore === 10) && (gameResult === "Player" || gameResult === "Computer")) {
        disableButtons()
        gameOverAfterDelay()
    }
    if ((firstScore === 3 || secondScore === 3) && (gameResult === "Player 1" || gameResult === "Player 2")) {
        nextRoundButton.style.display = "none"
        gameOverAfterDelay()
    }

}

function gameOverAfterDelay() {
    setTimeout(function () { gameOver(gameResult, firstScore, secondScore); }, 1500)
}

function resetComputerChoice() {
    let computerChoiceImage = document.getElementById("computer-choice-image")
    computerChoiceImage.src = "assets/images/question-mark.png"
    computerChoiceImage.alt = "Computer choice. Not yet decided."

    let resultSpan = document.getElementById('result');
    resultSpan.innerHTML = "";
}

function colourWinnerText(firstScore, secondScore) {
    firstScorePlace = document.getElementById("first-score")
    secondScorePlace = document.getElementById("second-score")
    if (firstScore < secondScore) {
        firstScorePlace.style.color = "red";
        secondScorePlace.style.color = "lime";
    } else {
        firstScorePlace.style.color = "lime";
        secondScorePlace.style.color = "red";
    }

}

function gameOver(finalResult, firstScore, secondScore) {
    let gameOverText = document.getElementById("game-over-text");
    let firstPlayer;
    let secondPlayer;

    changeDisplayById("instructions", "flex")
    changeDisplayById("game-container", "none");
    changeDisplayById("game-over-box", "flex");
    changeDisplayById("player-2-area", "none");

    if (finalResult === "Player" || finalResult === "Computer") {
        firstPlayer = "Player"
        secondPlayer = "Computer"
    } else {
        firstPlayer = "Player 1"
        secondPlayer = "Player 2"
    }

    gameOverText.innerHTML = `
    ${finalResult} wins!<br><br>
    FINAL SCORE:<br>
    <p id="first-score">${firstPlayer} : ${firstScore}<\p>
    <p id="second-score">${secondPlayer} : ${secondScore}<\p>
    Play again?`;

    colourWinnerText(firstScore, secondScore)

    resetScores();

    resetBorders();

    resetComputerChoice();

    let playerOneButtons = document.getElementById('player-1-choices').children;
    for (let i = 0; i < playerOneButtons.length; i++) {
        if (i !== playerOneChoiceIndex) {
            playerOneButtons[i].style.display = 'block';
        } else {
            playerOneButtons[i].disabled = false;
        }
    }

    // Hide buttons in player-2-choices based on index
    let playerTwoButtons = document.getElementById('player-2-choices').children;
    for (let i = 0; i < playerTwoButtons.length; i++) {
        if (i !== playerTwoChoiceIndex) {
            playerTwoButtons[i].style.display = 'block';
        } else {
            playerTwoButtons[i].disabled = false;
        }
    }
}

function setPlayerNChoice(playerIndex, clicked) {
    if (playerIndex === 1) {
        playerOneChoiceIndex = clicked;
        playerOneChoice = choices[clicked]
    } else {
        playerTwoChoiceIndex = clicked;
        playerTwoChoice = choices[clicked]
    }
    document.getElementById(`player-${playerIndex}-choice-button-${clicked}`).classList.add("chosen-border");
}


function setPlayerChoice(clicked) {
    playerChoiceIndex = clicked;
    playerChoice = choices[clicked];
    let computerChoiceIndex = Math.floor(Math.random() * numberOfChoices);
    let computerChoice = choices[computerChoiceIndex];
    let computerChoiceImage = document.getElementById("computer-choice-image");
    let newImagePath = `assets/images/${computerChoice.toLowerCase()}.png`;
    computerChoiceImage.src = newImagePath;
    computerChoiceImage.alt = `Computer chooses ${computerChoice}`

    resetBorders();

    let outcome;

    let indexResult = (numberOfChoices + computerChoiceIndex - playerChoiceIndex) % numberOfChoices;
    // If choice corresponds to value in win, then win is logged.
    // Similarly for lose and draw. +s to keep modulo values +ve
    if (win.includes(indexResult)) {
        document.getElementById(`player-choice-button-${clicked}`).classList.add("win-border");
        document.getElementById("computer-choice-button").classList.add("lose-border");
        gameResult = "Player";
        outcome = "<p>You win!<br><br>" + playerChoice + " beats " + computerChoice + "<br></p>";
    } else if (lose.includes(indexResult)) {
        document.getElementById(`player-choice-button-${clicked}`).classList.add("lose-border");
        document.getElementById("computer-choice-button").classList.add("win-border");
        gameResult = "Computer";
        outcome = "<p>You lose!<br><br>" + computerChoice + " beats " + playerChoice + "<br></p>";
    } else if (draw.includes(indexResult)) {
        document.getElementById(`player-choice-button-${clicked}`).classList.add("draw-border");
        document.getElementById("computer-choice-button").classList.add("draw-border");
        gameResult = "draw";
        outcome = "<p>DRAW<br><br>NO SCORE</p>";
    } else outcome = "Oops, something went wrong!";
    let resultSpan = document.getElementById('result');
    resultSpan.innerHTML = outcome;

    adjustScore(gameResult);
}

function enable() {
    console.log("start enable")
    enableAndResize(1)
    enableAndResize(2)
    enableAndResize(0)
}

function enableAndResize(number) {
    if (number === 1 || number === 2) {
        console.log("enable number")
        let buttons = document.getElementById(`player-${number}-choices`).children;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
            buttons[i].style.width = "25%"
        }
    } else {
        console.log("enable player")
        let playerChoiceButtons = document.getElementsByClassName("player-choices-buttons");
        for (let i = 0; i < playerChoiceButtons.length; i++) {
            playerChoiceButtons[i].disabled = false;
        }
    }
}

// Iterate through buttons and attach corresponding event listeners to each 1
function startComputerGame() {
    changeDisplayById("game-container", "block");
    changeDisplayById("score-area-2p", "none");
    changeDisplayById("player-1-area", "none");
    changeDisplayById("player-2-area", "none");
    changeDisplayById("player-area", "flex");
    changeDisplayById("computer-area", "flex");
    changeDisplayById("instructions", "none");

    enable();
}

function resetScores() {
    let playerScoreSpan = document.getElementById('player-score');
    let computerScoreSpan = document.getElementById('computer-score');
    let playerOneScoreSpan = document.getElementById('player-1-score-2p');
    let playerTwoScoreSpan = document.getElementById('player-2-score-2p');

    playerScore = 0;
    computerScore = 0;
    firstScore = 0;
    secondScore = 0;
    playerOneScore = 0;
    playerTwoScore = 0;

    playerScoreSpan.innerHTML = playerScore;
    computerScoreSpan.innerHTML = computerScore;
    playerOneScoreSpan.innerHTML = playerOneScore;
    playerTwoScoreSpan.innerHTML = playerTwoScore;

}

function resetBorders() {
    let playerChoiceButtons = document.getElementsByClassName("player-choices-buttons");
    for (let i = 0; i < playerChoiceButtons.length; i++) {
        playerChoiceButtons[i].classList.remove("win-border", "lose-border", "draw-border", "chosen-border");
    }
}

function changeDisplayById(Id, changed) {
    let object = document.getElementById(Id);
    object.style.display = changed;
}

function showPlayerOneChoices() {
    changeDisplayById("player-1-make-choice", "none");
    changeDisplayById("player-area", "none");
    changeDisplayById("computer-area", "none");
    changeDisplayById("player-1-area", "flex");
    changeDisplayById("game-area", "flex");
    changeDisplayById("game-container", "block");
}

function showPlayerTwoPopup() {
    changeDisplayById("game-container", "none")
    changeDisplayById("player-2-make-choice", "flex")
}

function showPlayerTwoChoices() {
    changeDisplayById("player-2-make-choice", "none");
    changeDisplayById("player-2-area", "flex");
    changeDisplayById("player-1-area", "none");
    changeDisplayById("game-area", "flex");
    changeDisplayById("game-container", "block");
}

function twoPlayerResultPopup() {
    changeDisplayById("game-container", "none");
    changeDisplayById("game-over-box-two", "flex");
}

function clickToShowResult() {
    changeDisplayById("game-container", "none");
    changeDisplayById("click-to-show", "flex");
}

function showResultTwoPlayer() {
    resetBorders();

    changeDisplayById("click-to-show", "none");
    changeDisplayById("game-container", "block");
    changeDisplayById("player-1-area", "flex");
    changeDisplayById("player-2-area", "flex");
    changeDisplayById("score-area-2p", "flex");
    changeDisplayById("next-round-button", "block");


    let indexResult = (numberOfChoices + playerTwoChoiceIndex - playerOneChoiceIndex) % numberOfChoices;
    if (win.includes(indexResult)) {
        document.getElementById(`player-1-choice-button-${playerOneChoiceIndex}`).classList.add("win-border");
        document.getElementById(`player-2-choice-button-${playerTwoChoiceIndex}`).classList.add("lose-border");
        gameResult = "Player 1";
        outcome = "<p>Player 1 wins!<br><br>" + playerOneChoice + " beats " + playerTwoChoice + "<br></p>";
    } else if (lose.includes(indexResult)) {
        document.getElementById(`player-1-choice-button-${playerOneChoiceIndex}`).classList.add("lose-border");
        document.getElementById(`player-2-choice-button-${playerTwoChoiceIndex}`).classList.add("win-border");
        gameResult = "Player 2";
        outcome = "<p>Player 2 wins!<br><br>" + playerTwoChoice + " beats " + playerOneChoice + "<br></p>";
    } else if (draw.includes(indexResult)) {
        document.getElementById(`player-1-choice-button-${playerOneChoiceIndex}`).classList.add("draw-border");
        document.getElementById(`player-2-choice-button-${playerTwoChoiceIndex}`).classList.add("draw-border");
        gameResult = "draw";
        outcome = "<p>DRAW<br><br>NO SCORE</p>";
    } else outcome = "Oops, something went wrong! Please press the page title to rest the game";
    console.log(outcome);
    let resultTwoSpan = document.getElementById("result-2p");
    resultTwoSpan.innerHTML = outcome;


    let playerOneButtons = document.getElementById('player-1-choices').children;
    for (let i = 0; i < playerOneButtons.length; i++) {
        if (i !== playerOneChoiceIndex) {
            playerOneButtons[i].style.display = 'none';
        } else {
            playerOneButtons[i].disabled = true;
            playerOneButtons[i].style.width = "150%";
        }
    }

    // Hide buttons in player-2-choices based on index
    let playerTwoButtons = document.getElementById('player-2-choices').children;
    for (let i = 0; i < playerTwoButtons.length; i++) {
        if (i !== playerTwoChoiceIndex) {
            playerTwoButtons[i].style.display = 'none';
        } else {
            playerTwoButtons[i].disabled = true;
            playerTwoButtons[i].style.width = "150%";
        }
    }
    adjustScore(gameResult);
}

function startFriendGame() {

    let instructionsBox = document.getElementById("instructions");
    instructionsBox.style.display = "none"

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


    const scoreArea2p = document.getElementById("score-area-2p");
    scoreArea2p.style.display = "none";

    const playerOneChoicePopup = document.getElementById("player-1-make-choice");
    playerOneChoicePopup.style.display = "flex";

    let playerOneButtons = document.getElementById('player-1-choices').children;
    for (let i = 0; i < playerOneButtons.length; i++) {
        playerOneButtons[i].disabled = false;
        playerOneButtons[i].style.width = "25%"
    }

    let playerTwoButtons = document.getElementById('player-2-choices').children;
    for (let i = 0; i < playerTwoButtons.length; i++) {
        playerTwoButtons[i].disabled = false;
        playerTwoButtons[i].style.width = "25%"
    }

}

function resetTwoPlayer() {
    resetBorders()

    resetPlayerButtons(playerOneChoiceIndex, "player-1-choices");
    resetPlayerButtons(playerTwoChoiceIndex, "player-2-choices")

    changeDisplayById("player-2-area", "none")

    startFriendGame()
}

function resetPlayerButtons(choiceIndex, containerId) {
    let playerButtons = document.getElementById(containerId).children;
    for (let i = 0; i < playerButtons.length; i++) {
        if (i !== choiceIndex) {
            playerButtons[i].style.display = 'block';
        } else {
            playerButtons[i].disabled = false;
            playerButtons[i].style.width = "25%";
        }
    }
}

function instructionsBoxText(instructionsShowing) {
    let instructionsButton = document.getElementById("instructions-button");
    if (instructionsShowing) {
        instructionsButton.innerHTML = "Return to Game";
    } else {
        instructionsButton.innerHTML = "Instructions";
    }
}


function toggleInstructions() {
    
    if (instructionsShowing) {
        changeDisplayById("start-game-box", "flex");
        changeDisplayById("instructions-explained", "none");
    } else {
        changeDisplayById("start-game-box", "none");
        changeDisplayById("instructions-explained", "flex");
        changeDisplayById("game-over-box", "none")
        let instructionsButton = document.getElementById("instructions-button");
        instructionsButton.addEventListener("click", function () {
            window.location.href = "index.html"
        });
    }
    instructionsShowing = !instructionsShowing
    instructionsBoxText(instructionsShowing);
}



// Loading game setup after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the play game box, game container and game over elements
    const playGameBoxes = document.getElementsByClassName("play-game-box");
    const gameContainer = document.getElementById("game-container");
    const playAgainstComputerButtons = document.getElementsByClassName("play-against-computer");
    const playAgainstFriendButtons = document.getElementsByClassName("play-against-friend");
    const nextRoundButton = document.getElementById("next-round-button")
    let instructionsButton = document.getElementById("instructions-button")
    let returnToGame = document.getElementById("return-to-game")


    // instructionsButton.addEventListener("click", function () {showInstructions();})
    instructionsButton.addEventListener("click", function () { toggleInstructions(); })



    const playerOneMakeChoiceButton = document.getElementById("player-1-make-choice-button");
    playerOneMakeChoiceButton.addEventListener("click", function () { showPlayerOneChoices(); });

    if (listenerComputerCheck == false) {
        for (let i = 0; i < choices.length; i++) {
            const buttonId = `player-choice-button-${i}`;
            const button = document.getElementById(buttonId);
            button.addEventListener("click", function () { setPlayerChoice(i); });
        }

        listenerComputerCheck = true;
    }


    for (let i = 0; i < choices.length; i++) {
        const buttonOneId = `player-1-choice-button-${i}`;
        const buttonOne = document.getElementById(buttonOneId);
        buttonOne.addEventListener("mousedown", function () { setPlayerNChoice(1,i); });
        buttonOne.addEventListener("mouseup", function () { showPlayerTwoPopup(); })
    };

    for (let j = 0; j < choices.length; j++) {
        const buttonTwoId = `player-2-choice-button-${j}`;
        const buttonTwo = document.getElementById(buttonTwoId);
        buttonTwo.addEventListener("mousedown", function () { setPlayerNChoice(2,j); });
        buttonTwo.addEventListener("mouseup", function () { clickToShowResult() });
    };

    const playerTwoMakeChoiceButton = document.getElementById("player-2-make-choice-button");
    playerTwoMakeChoiceButton.addEventListener("click", function () { showPlayerTwoChoices(); });



    nextRoundButton.addEventListener("click", function () { resetTwoPlayer() })

    const clickToShowButton = document.getElementById("click-to-show-button")
    clickToShowButton.addEventListener("click", function () { showResultTwoPlayer(); });

    // Click event listener for play-against-computer buttons (play and replay)
    for (let i = 0; i < playAgainstComputerButtons.length; i++) {
        playAgainstComputerButtons[i].addEventListener("click", function () {
            startComputerGame();
            this.closest('.play-game-box').style.display = "none";
        });
    }

    // Click event listener for play against friend
    for (let i = 0; i < playAgainstFriendButtons.length; i++) {
        playAgainstFriendButtons[i].addEventListener("click", function () {
            startFriendGame();
            this.closest('.play-game-box').style.display = "none";
        });
    }
});

