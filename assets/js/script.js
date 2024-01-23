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
        changeDisplayById("next-round-button", "none")
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

    if (win.includes(indexResult)) {
        setOutcome(playerChoiceIndex, computerChoiceIndex, "win", "lose", "Player")
    } else if (lose.includes(indexResult)) {
        setOutcome(computerChoiceIndex, playerChoiceIndex, "lose", "win", "Computer")
    } else if (draw.includes(indexResult)) {
        setOutcome(playerChoiceIndex, computerChoiceIndex, "draw", "draw")
    }

}

function setOutcome(winnerChoiceIndex, loserChoiceIndex, result, antiResult, winner) {
    let playerChoiceButton = document.getElementById(`player-choice-button-${playerChoiceIndex}`)
    let computerChoiceButton = document.getElementById(`computer-choice-button`)
    playerChoiceButton.classList.add(`${result}-border`)
    computerChoiceButton.classList.add(`${antiResult}-border`)
    gameResult = winner;
    console.log("1")
    if (result === "draw") {
        outcome = "<p>DRAW<br><br>NO SCORE</p>";
        console.log("DRaw")
    } else {
        console.log(result + "reached this point")
        outcome = `<p>You ${result}!<br><br> ${choices[winnerChoiceIndex]} beats ${choices[loserChoiceIndex]}<br></p>`;
    }
    console.log("2")
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
        let buttons = document.getElementById(`player-${number}-choices`).children;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
            buttons[i].style.width = "25%"
        }
    } else {
        let playerChoiceButtons = document.getElementsByClassName("player-choices-buttons");
        for (let i = 0; i < playerChoiceButtons.length; i++) {
            playerChoiceButtons[i].disabled = false;
        }
    }
}

function disableAndResize(number, choiceIndex) {
    let buttons = document.getElementById(`player-${number}-choices`).children;
    for (let i = 0; i < buttons.length; i++) {
        if (i !== choiceIndex) {
            buttons[i].style.display = 'none';
        } else {
            buttons[i].disabled = true;
            buttons[i].style.width = "150%";
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

window.addEventListener('load', function() {
    applyStylesBasedOnWidth();
});

// Check the screen width on window resize
window.addEventListener('resize', function() {
    applyStylesBasedOnWidth();
});

function applyStylesBasedOnWidth() {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // Get the target element
    let computerArea = document.querySelector('#computer-area');

    // Apply styles based on screen width
    if (screenWidth < 768) {
        computerArea.style.display = 'grid';
    } else {
        computerArea.style.display = 'flex';
    }
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
        setOutcomeTwoPlayer(playerOneChoiceIndex, playerTwoChoiceIndex, "win", "lose", "Player 1")
    } else if (lose.includes(indexResult)) {
        setOutcomeTwoPlayer(playerTwoChoiceIndex, playerOneChoiceIndex, "lose", "win", "Player 2")
    } else if (draw.includes(indexResult)) {
        setOutcomeTwoPlayer(playerOneChoiceIndex, playerTwoChoiceIndex, "draw", "draw", "draw")
    }

    disableAndResize(1, playerOneChoiceIndex)
    disableAndResize(2, playerTwoChoiceIndex)
    adjustScore(gameResult);
}

function setOutcomeTwoPlayer(winnerChoiceIndex, loserChoiceIndex, result, antiResult, winner) {
    let playerOneChoiceButton = document.getElementById(`player-1-choice-button-${playerOneChoiceIndex}`)
    let playerTwoChoiceButton = document.getElementById(`player-2-choice-button-${playerTwoChoiceIndex}`)
    playerOneChoiceButton.classList.add(`${result}-border`)
    playerTwoChoiceButton.classList.add(`${antiResult}-border`)
    gameResult = winner;
    if (result === "draw") {
        outcome = "<p>DRAW<br><br>NO SCORE</p>";
    } else {
        outcome = `<p>${gameResult} wins!<br><br> ${choices[winnerChoiceIndex]} beats ${choices[loserChoiceIndex]}<br></p>`;
    }
    let resultTwoSpan = document.getElementById("result-2p");
    resultTwoSpan.innerHTML = outcome;
}

function startFriendGame() {
    changeDisplayById("instructions", "none")
    changeDisplayById("game-container", "none")
    changeDisplayById("game-over-box", "none")
    changeDisplayById("score-area-2p", "none")
    changeDisplayById("player-1-make-choice", "flex")

    resetPlayerButtons(playerOneChoiceIndex, "player-1-choices", true, false);
    resetPlayerButtons(playerTwoChoiceIndex, "player-2-choices", true, false);
}

function resetPlayerButtons(choiceIndex, containerId, width, block) {
    let buttons = document.getElementById(containerId).children;
    if (block === true) {
        for (let i = 0; i < buttons.length; i++) {
            if (i !== choiceIndex) {
                buttons[i].style.display = 'block';
            } else {
                buttons[i].disabled = false;
                if (width === true) {
                    buttons[i].style.width = "25%";
                }
            }
        }
    } else {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
            buttons[i].style.width = "25%"
        }
    }
}

function resetTwoPlayer() {
    resetBorders()

    resetPlayerButtons(playerOneChoiceIndex, "player-1-choices", true, true);
    resetPlayerButtons(playerTwoChoiceIndex, "player-2-choices", true, true);

    changeDisplayById("player-2-area", "none")

    startFriendGame()
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

function runGame() {
    // Loading game setup after DOM content is loaded
    document.addEventListener("DOMContentLoaded", function () {
        // Get the play game box, game container and game over elements
        const playAgainstComputerButtons = document.getElementsByClassName("play-against-computer");
        const playAgainstFriendButtons = document.getElementsByClassName("play-against-friend");
        const nextRoundButton = document.getElementById("next-round-button")
        let instructionsButton = document.getElementById("instructions-button")
        const playerOneMakeChoiceButton = document.getElementById("player-1-make-choice-button");
        const playerTwoMakeChoiceButton = document.getElementById("player-2-make-choice-button");
        const clickToShowButton = document.getElementById("click-to-show-button")

        clickToShowButton.addEventListener("click", function () { showResultTwoPlayer(); });
        instructionsButton.addEventListener("click", function () { toggleInstructions(); })
        playerOneMakeChoiceButton.addEventListener("click", function () { showPlayerOneChoices(); });
        playerTwoMakeChoiceButton.addEventListener("click", function () { showPlayerTwoChoices(); });
        nextRoundButton.addEventListener("click", function () { resetTwoPlayer() })

        for (let i = 0; i < choices.length; i++) {
            const buttonId = `player-choice-button-${i}`;
            const button = document.getElementById(buttonId);
            button.addEventListener("click", function () { setPlayerChoice(i); });
        }

        for (let i = 0; i < choices.length; i++) {
            const buttonOneId = `player-1-choice-button-${i}`;
            const buttonOne = document.getElementById(buttonOneId);
            buttonOne.addEventListener("mousedown", function () { setPlayerNChoice(1, i); });
            buttonOne.addEventListener("mouseup", function () { showPlayerTwoPopup(); })
        }

        for (let i = 0; i < choices.length; i++) {
            const buttonTwoId = `player-2-choice-button-${i}`;
            const buttonTwo = document.getElementById(buttonTwoId);
            buttonTwo.addEventListener("mousedown", function () { setPlayerNChoice(2, i); });
            buttonTwo.addEventListener("mouseup", function () { clickToShowResult() });
        };
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
}

runGame();
