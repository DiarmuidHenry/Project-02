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
let firstScore = 0;
let secondScore = 0;
let gameResult;
let instructionsShowing = false;
let smallScreen = window.matchMedia("(max-width: 767px)");

// Declare a letant, which is the number of choices
let numberOfChoices = choices.length;
// Number of winning results (or losing results)
let numberOfWinningResults = (Math.floor(numberOfChoices / 2));

// Create arrays representing the possible results
let draw = [0];
let win = Array.from({ length: numberOfWinningResults }, (_, i) => i + 1);
let lose = Array.from({ length: numberOfWinningResults }, (_, i) => numberOfWinningResults + i + 1);

// Disable buttons not currently in use, but that can be displayed
function disableButtons() {
    let playerChoiceButtons = document.getElementsByClassName("player-choices-buttons");
    for (let i = 0; i < playerChoiceButtons.length; i++) {
        playerChoiceButtons[i].disabled = true;
    }
}

// Adjust score based on choices in both PvP and PvC
function adjustScore(gameResult) {
    let playerOneName = document.getElementById("player-1-name");
    let playerTwoName = document.getElementById("player-2-name");
    let playerScoreSpan = document.getElementById('player-score');
    let computerScoreSpan = document.getElementById('computer-score');
    let playerOneScoreSpan = document.getElementById("player-1-score-2p");
    let playerTwoScoreSpan = document.getElementById("player-2-score-2p");

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
        disableButtons();
        gameOverAfterDelay();
    }
    if ((firstScore === 3 || secondScore === 3) && (gameResult === "Player 1" || gameResult === "Player 2")) {
        changeDisplayById("next-round-button", "none");
        gameOverAfterDelay();
    }

}

// Slight pause to show result, then go to game over page
function gameOverAfterDelay() {
    setTimeout(function () { gameOver(gameResult, firstScore, secondScore); }, 1500);
}

// Reset computers randomly chosen icon
function resetComputerChoice() {
    let computerChoiceImage = document.getElementById("computer-choice-image");
    computerChoiceImage.src = "assets/images/question-mark.png";
    computerChoiceImage.alt = "Computer choice. Not yet decided.";

    let resultSpan = document.getElementById('result');
    resultSpan.innerHTML = "";
}

// Style winner's text to lime green; loser's to red
function colourWinnerText(firstScore, secondScore) {
    let firstScorePlace = document.getElementById("first-score");
    let secondScorePlace = document.getElementById("second-score");
    if (firstScore < secondScore) {
        firstScorePlace.style.color = "red";
        secondScorePlace.style.color = "lime";
    } else {
        firstScorePlace.style.color = "lime";
        secondScorePlace.style.color = "red";
    }

}

// Game over screen showing styled results, scores and new game buttons
function gameOver(finalResult, firstScore, secondScore) {
    let gameOverText = document.getElementById("game-over-text");
    let firstPlayer;
    let secondPlayer;

    changeDisplayById("instructions", "flex");
    changeDisplayById("game-container", "none");
    changeDisplayById("game-over-box", "flex");
    changeDisplayById("player-2-area", "none");

    // Assigning winning and losing players to correct variables
    if (finalResult === "Player" || finalResult === "Computer") {
        firstPlayer = "Player";
        secondPlayer = "Computer";
    } else {
        firstPlayer = "Player 1";
        secondPlayer = "Player 2";
    }

    // Updating the final scoreboardd
    gameOverText.innerHTML = `
    ${finalResult} wins!<br><br>
    FINAL SCORE:<br>
    <p id="first-score">${firstPlayer} : ${firstScore}<\p>
    <p id="second-score">${secondPlayer} : ${secondScore}<\p>
    Play again?`;

    colourWinnerText(firstScore, secondScore);

    resetScores();

    resetBorders();

    resetComputerChoice();

    // Hide buttons in player-1-choices based on index
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

// Adding border to chosen icon for PvP game 
function setPlayerNChoice(playerIndex, clicked) {
    if (playerIndex === 1) {
        playerOneChoiceIndex = clicked;
        playerOneChoice = choices[clicked];
    } else {
        playerTwoChoiceIndex = clicked;
        playerTwoChoice = choices[clicked];
    }
    document.getElementById(`player-${playerIndex}-choice-button-${clicked}`).classList.add("chosen-border");
}

// Randomly select and display computer's choice in PvC; calculating lose/win/draw
function setPlayerChoice(clicked) {
    playerChoiceIndex = clicked;
    playerChoice = choices[clicked];
    let computerChoiceIndex = Math.floor(Math.random() * numberOfChoices);
    let computerChoice = choices[computerChoiceIndex];
    let computerChoiceImage = document.getElementById("computer-choice-image");
    let newImagePath = `assets/images/${computerChoice.toLowerCase()}.png`;
    // Assigning correct image to computers choice
    computerChoiceImage.src = newImagePath;
    computerChoiceImage.alt = `Computer chooses ${computerChoice}`;

    resetBorders();

    let indexResult = (numberOfChoices + computerChoiceIndex - playerChoiceIndex) % numberOfChoices;

    // Using indexResult to decide winner
    if (win.includes(indexResult)) {
        setOutcome(playerChoiceIndex, computerChoiceIndex, "win", "lose", "Player");
    } else if (lose.includes(indexResult)) {
        setOutcome(computerChoiceIndex, playerChoiceIndex, "lose", "win", "Computer");
    } else if (draw.includes(indexResult)) {
        setOutcome(playerChoiceIndex, computerChoiceIndex, "draw", "draw");
    }
}

// Showing result text of round in PvC
function setOutcome(winnerChoiceIndex, loserChoiceIndex, result, antiResult, winner) {
    let playerChoiceButton = document.getElementById(`player-choice-button-${playerChoiceIndex}`);
    let computerChoiceButton = document.getElementById(`computer-choice-button`);
    let outcome;
    playerChoiceButton.classList.add(`${result}-border`);
    computerChoiceButton.classList.add(`${antiResult}-border`);
    gameResult = winner;
    if (result === "draw") {
        outcome = "<p>DRAW<br><br>NO SCORE</p>";
    } else {
        outcome = `<p>You ${result}!<br><br>${choices[winnerChoiceIndex]} beats ${choices[loserChoiceIndex]}<br></p>`;
    }
    let resultSpan = document.getElementById('result');
    resultSpan.innerHTML = outcome;
    adjustScore(gameResult);
}

// Running enableAndResize() multiple times
function enable() {
    enableAndResize(1);
    enableAndResize(2);
    enableAndResize(0);
}

// Re-enabling and resizing any disabled buttons
function enableAndResize(number) {
    if (number === 1 || number === 2) {
        let buttons = document.getElementById(`player-${number}-choices`).children;
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
            buttons[i].style.width = "25%";
        }
    } else {
        let playerChoiceButtons = document.getElementsByClassName("player-choices-buttons");
        for (let i = 0; i < playerChoiceButtons.length; i++) {
            playerChoiceButtons[i].disabled = false;
        }
    }
}

// Disabling and resizing relevant buttons
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

// Setup PvC game by hiding/displaying correct divs/containers
function startComputerGame() {
    changeDisplayById("game-container", "block");
    changeDisplayById("score-area-2p", "none");
    changeDisplayById("player-1-area", "none");
    changeDisplayById("player-2-area", "none");
    changeDisplayById("player-area", "flex");
    changeDisplayById("computer-area", "flex", "grid");
    changeDisplayById("instructions", "none");
    changeDisplayById("game-area", "flex");
    enable();
}

// Reset scores before a new game starts
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

// Reset borders of those that were previously chosen/won/lost
function resetBorders() {
    let playerChoiceButtons = document.getElementsByClassName("player-choices-buttons");
    for (let i = 0; i < playerChoiceButtons.length; i++) {
        playerChoiceButtons[i].classList.remove("win-border", "lose-border", "draw-border", "chosen-border");
    }
}

// Decides if display = grid or flex, depending stage in game
function gridOrFlex() {
    let playerArea = document.getElementById("player-area");
    let computerArea = document.getElementById("computer-area");
    let playerOneArea = document.getElementById("player-2-area");
    let playerTwoArea = document.getElementById("player-1-area");
    let scoreAreaTwo = document.getElementById("score-area-2p");
    // Check if all conditios are met
    if (
        getComputedStyle(playerArea).display === "none" &&
        getComputedStyle(computerArea).display === "none" &&
        getComputedStyle(playerOneArea).display === "flex" &&
        getComputedStyle(playerTwoArea).display === "flex" &&
        getComputedStyle(scoreAreaTwo).display === "flex"
    ) {
        return "grid";
    } else {
        return "flex";
    }
}

// Hides/shows relevant divs/containers/buttons
function changeDisplayById(Id, changed, changedIfMobile) {
    let object = document.getElementById(Id);
    if (changedIfMobile && smallScreen.matches) {
        object.style.display = changedIfMobile || changed;
    } else {
        object.style.display = changed;
    }
}

// Shows either Player 1 or Player 2 choices in PvP game
function showPvPPlayerChoice(player) {
    changeDisplayById("game-area", "flex");
    changeDisplayById("game-container", "block");
    if (player == 1) {
        changeDisplayById("player-1-make-choice", "none");
        changeDisplayById("player-area", "none");
        changeDisplayById("computer-area", "none");
        changeDisplayById("player-1-area", "flex");
    } else {
        changeDisplayById("player-2-make-choice", "none");
        changeDisplayById("player-2-area", "flex");
        changeDisplayById("player-1-area", "none");
    }
}

// Popup message during PvP game
function showPlayerTwoPopup() {
    changeDisplayById("game-container", "none");
    changeDisplayById("player-2-make-choice", "flex");
}

// Last click button before showing result in PvP
function clickToShowResult() {
    changeDisplayById("game-container", "none");
    changeDisplayById("click-to-show", "flex");
}

// Shows result in PvP
function showResultTwoPlayer() {
    resetBorders();

    changeDisplayById("click-to-show", "none");
    changeDisplayById("game-container", "block");
    changeDisplayById("player-1-area", "flex");
    changeDisplayById("player-2-area", "flex");
    changeDisplayById("score-area-2p", "flex");
    changeDisplayById("next-round-button", "block");
    changeDisplayById("game-area", "flex", gridOrFlex());

    let indexResult = (numberOfChoices + playerTwoChoiceIndex - playerOneChoiceIndex) % numberOfChoices;

    // Using indexResult to decide winner
    if (win.includes(indexResult)) {
        setOutcomeTwoPlayer(playerOneChoiceIndex, playerTwoChoiceIndex, "win", "lose", "Player 1");
    } else if (lose.includes(indexResult)) {
        setOutcomeTwoPlayer(playerTwoChoiceIndex, playerOneChoiceIndex, "lose", "win", "Player 2");
    } else if (draw.includes(indexResult)) {
        setOutcomeTwoPlayer(playerOneChoiceIndex, playerTwoChoiceIndex, "draw", "draw", "draw");
    }

    disableAndResize(1, playerOneChoiceIndex);
    disableAndResize(2, playerTwoChoiceIndex);
    adjustScore(gameResult);
}

// Shows win/draw/lose message in PvP game
function setOutcomeTwoPlayer(winnerChoiceIndex, loserChoiceIndex, result, antiResult, winner) {
    let playerOneChoiceButton = document.getElementById(`player-1-choice-button-${playerOneChoiceIndex}`);
    let playerTwoChoiceButton = document.getElementById(`player-2-choice-button-${playerTwoChoiceIndex}`);
    let outcome;
    playerOneChoiceButton.classList.add(`${result}-border`);
    playerTwoChoiceButton.classList.add(`${antiResult}-border`);
    gameResult = winner;
    if (result === "draw") {
        outcome = "<p>DRAW<br><br>NO SCORE</p>";
    } else {
        outcome = `<p>${gameResult} wins!<br><br>${choices[winnerChoiceIndex]} beats ${choices[loserChoiceIndex]}<br></p>`;
    }
    let resultTwoSpan = document.getElementById("result-2p");
    resultTwoSpan.innerHTML = outcome;
}

// Starts PvP game
function startFriendGame() {
    changeDisplayById("instructions", "none");
    changeDisplayById("game-container", "none");
    changeDisplayById("game-over-box", "none");
    changeDisplayById("score-area-2p", "none");
    changeDisplayById("player-1-make-choice", "flex");

    resetPlayerButtons(playerOneChoiceIndex, "player-1-choices", true, false);
    resetPlayerButtons(playerTwoChoiceIndex, "player-2-choices", true, false);
}

// Re-enables and resizes buttons in PvC game
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
            buttons[i].style.width = "25%";
        }
    }
}

// Resets and starts PvP game
function resetTwoPlayer() {
    resetBorders();

    resetPlayerButtons(playerOneChoiceIndex, "player-1-choices", true, true);
    resetPlayerButtons(playerTwoChoiceIndex, "player-2-choices", true, true);

    changeDisplayById("player-2-area", "none");

    startFriendGame();
}

// Toggles Instructions button text
function instructionsBoxText(instructionsShowing) {
    let instructionsButton = document.getElementById("instructions-button");
    if (instructionsShowing) {
        instructionsButton.innerHTML = "Return to Game";
    } else {
        instructionsButton.innerHTML = "Instructions";
    }
}

// Shows/hides Instructions text
function toggleInstructions() {

    if (instructionsShowing) {
        changeDisplayById("start-game-box", "flex");
        changeDisplayById("instructions-explained", "none");
    } else {
        changeDisplayById("start-game-box", "none");
        changeDisplayById("instructions-explained", "flex");
        changeDisplayById("game-over-box", "none");
        let instructionsButton = document.getElementById("instructions-button");
        instructionsButton.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
    instructionsShowing = !instructionsShowing;
    instructionsBoxText(instructionsShowing);
}

// Adds event listeners and initial setup upon DOM loading
function runGame() {
    // Loading game setup after DOM content is loaded
    document.addEventListener("DOMContentLoaded", function () {
        // Get all needed document elements
        let playAgainstComputerButtons = document.getElementsByClassName("play-against-computer");
        let playAgainstFriendButtons = document.getElementsByClassName("play-against-friend");
        let nextRoundButton = document.getElementById("next-round-button");
        let instructionsButton = document.getElementById("instructions-button");
        let playerOneMakeChoiceButton = document.getElementById("player-1-make-choice-button");
        let playerTwoMakeChoiceButton = document.getElementById("player-2-make-choice-button");
        let clickToShowButton = document.getElementById("click-to-show-button");

        // Attach relevant eventListeners to elements
        clickToShowButton.addEventListener("click", function () { showResultTwoPlayer(); });
        instructionsButton.addEventListener("click", function () { toggleInstructions(); });
        playerOneMakeChoiceButton.addEventListener("click", function () { showPvPPlayerChoice(1); });
        playerTwoMakeChoiceButton.addEventListener("click", function () { showPvPPlayerChoice(2); });
        nextRoundButton.addEventListener("click", function () { resetTwoPlayer(); });

        // Event listeners to set choices of Player
        for (let i = 0; i < choices.length; i++) {
            let buttonId = `player-choice-button-${i}`;
            let button = document.getElementById(buttonId);
            button.addEventListener("click", function () { setPlayerChoice(i); });
        }

        // Event listeners to set choices of Player 1
        for (let i = 0; i < choices.length; i++) {
            let buttonOneId = `player-1-choice-button-${i}`;
            let buttonOne = document.getElementById(buttonOneId);
            buttonOne.addEventListener("mousedown", function () { setPlayerNChoice(1, i); });
            buttonOne.addEventListener("mouseup", function () { showPlayerTwoPopup(); });
        }

        // Event listeners to set choices of Player 2
        for (let i = 0; i < choices.length; i++) {
            let buttonTwoId = `player-2-choice-button-${i}`;
            let buttonTwo = document.getElementById(buttonTwoId);
            buttonTwo.addEventListener("mousedown", function () { setPlayerNChoice(2, i); });
            buttonTwo.addEventListener("mouseup", function () { clickToShowResult(); });
        }

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

// Starts the game
runGame();
