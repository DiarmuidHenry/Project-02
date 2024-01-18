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
            let playerChoiceButtons = document.getElementsByClassName("player-choices-buttons");
            for (let i = 0; i < playerChoiceButtons.length; i++) {
                playerChoiceButtons[i].disabled = true;}
            console.log(`Player : ${playerScore} \nComputer : ${computerScore}`);
            setTimeout(function () {gameOver(gameResult);}, 1500)
        }
    } else if (gameResult === "lose") {
        computerScore += 1;
        let computerScoreSpan = document.getElementById('computer-score');
        computerScoreSpan.innerHTML = computerScore;
        console.log(`Player : ${playerScore} \nComputer : ${computerScore}`);
        if (computerScore === 10) {
            let playerChoiceButtons = document.getElementsByClassName("player-choices-buttons");
            for (let i = 0; i < playerChoiceButtons.length; i++) {
                playerChoiceButtons[i].disabled = true;}
            console.log(`Player : ${playerScore} \nComputer : ${computerScore}`);
            setTimeout(function () {gameOver(gameResult);}, 1500)
        }
    } else if (gameResult === "Player 1") {
        playerOneScore += 1;
        let playerOneScoreSpan = document.getElementById("player-1-score-2p");
        playerOneScoreSpan.innerHTML = playerOneScore;
        if (playerOneScore === 3) {
            const nextRoundButton = document.getElementById("next-round-button")
            nextRoundButton.style.display = "none"
            console.log(`Player 1 : ${playerOneScore} \nPlayer 2 : ${playerTwoScore}`);
            setTimeout(function () {gameOver(gameResult);}, 1500)
        }
    } else if (gameResult === "Player 2") {
        playerTwoScore += 1;
        let playerTwoScoreSpan = document.getElementById("player-2-score-2p");
        playerTwoScoreSpan.innerHTML = playerTwoScore;
        if (playerTwoScore === 3) {
            const nextRoundButton = document.getElementById("next-round-button")
            nextRoundButton.style.display = "none"
            console.log(`Player 1 : ${playerOneScore} \nPlayer 2 : ${playerTwoScore}`);
            setTimeout(function () {gameOver(gameResult);}, 1500)
        }
    }
    
}

function resetComputerChoice() {
    let computerChoiceImage = document.getElementById("computer-choice-image")
    computerChoiceImage.src = "assets/images/question-mark.png"
    computerChoiceImage.alt = "Computer choice. Not yet decided."

    let resultSpan = document.getElementById('result');
    resultSpan.innerHTML = "";
}

function gameOver(finalResult) {
    // Get the play game box, game container and game over elements
    const playGameBox = document.getElementById("play-game-box");
    const gameContainer = document.getElementById("game-container");
    const gameOverBox = document.getElementById("game-over-box");
    let instructionsBox = document.getElementById("instructions");
    instructionsBox.style.display = "flex"
    // Hide game container
    gameContainer.style.display = "none";

    // Show game over container
    gameOverBox.style.display = "flex";
    // get the p text inside the game over box
    let gameOverText = document.getElementById("game-over-text");

    if (finalResult === "win") {
        gameOverText.innerHTML = `
        <br>You win!<br><br>
        FINAL SCORE:<br><br>
        Player : ${playerScore}<br>
        Computer : ${computerScore}<br><br> 
        Play again?`;
        console.log("YOU WIN THE GAME");
    } else if (finalResult === "lose") {
        gameOverText.innerHTML = `
        <br>You lose!<br><br>
        FINAL SCORE:<br><br>
        Player : ${playerScore}<br> 
        Computer : ${computerScore}<br><br>
        Play again?`;
        console.log("YOU LOSE THE GAME");
    } else if (finalResult === "Player 1") {
        gameOverText.innerHTML = `
        Player 1 wins!<br><br>
        FINAL SCORE:<br><br>
        Player 1 : ${playerOneScore}<br>
        Player 2 : ${playerTwoScore}<br><br>
        Play again?`;
        console.log("PLAYER 1 WINS THE GAME");
    } else if (finalResult === "Player 2") {
        gameOverText.innerHTML = `
        Player 2 wins!<br><br>
        FINAL SCORE:<br><br>
        Player 1 : ${playerOneScore}<br>
        Player 2 : ${playerTwoScore}<br><br>
        Play again?`;
        console.log("PLAYER 2 WINS THE GAME");
    }
    console.log("0")
    resetScores();

    console.log("1")
    resetBorders();

    console.log("2")
    resetComputerChoice();


    console.log("3")

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

    let playerTwoArea = document.getElementById("player-2-area");
    playerTwoArea.style.display = "none";
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
        document.getElementById("computer-choice-button").classList.add("lose-border");
        gameResult = "win";
        outcome = "<p>You win!<br><br>" + playerChoice + " beats " + computerChoice + "<br></p>";
    } else if (lose.includes(indexResult)) {
        document.getElementById(`player-choice-button-${clicked}`).classList.add("lose-border");
        document.getElementById("computer-choice-button").classList.add("win-border");
        gameResult = "lose";
        outcome = "<p>You lose!<br><br>" + computerChoice + " beats " + playerChoice + "<br></p>";
    } else if (draw.includes(indexResult)) {
        document.getElementById(`player-choice-button-${clicked}`).classList.add("draw-border");
        document.getElementById("computer-choice-button").classList.add("draw-border");
        gameResult = "draw";
        outcome = "<p>DRAW<br><br>NO SCORE</p>";
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
    const scoreAreaTwo = document.getElementById("score-area-2p");
    scoreAreaTwo.style.display = "none";
    const playerOneArea = document.getElementById("player-1-area");
    const playerTwoArea = document.getElementById("player-2-area");
    const playerArea = document.getElementById("player-area");
    const computerArea = document.getElementById("computer-area");
    let playerChoiceButtons = document.getElementsByClassName("player-choices-buttons");
    let instructionsBox = document.getElementById("instructions");
    instructionsBox.style.display = "none"
    playerOneArea.style.display = "none";
    playerTwoArea.style.display = "none";
    playerArea.style.display = "flex";
    computerArea.style.display = "flex";
    for (let i = 0; i < playerChoiceButtons.length; i++) {
        playerChoiceButtons[i].disabled = false;}
    
    let playerOneButtons = document.getElementById('player-1-choices').children;
    for (let i = 0; i < playerOneButtons.length; i++) {
        playerOneButtons[i].disabled = false;
        playerOneButtons[i].style.width = "25%"}

    let playerTwoButtons = document.getElementById('player-2-choices').children;
    for (let i = 0; i < playerTwoButtons.length; i++) {
        playerTwoButtons[i].disabled = false;
        playerTwoButtons[i].style.width = "25%"}
    // if (listenerComputerCheck == false) {
    //     for (let i = 0; i < choices.length; i++) {
    //         const buttonId = `player-choice-button-${i}`;
    //         const button = document.getElementById(buttonId);
    //         button.addEventListener("click", function () { setPlayerChoice(i); });
    //     }
        
    //     listenerComputerCheck = true;
    // }
}

function resetScores() {
    let playerScoreSpan = document.getElementById('player-score');
    let computerScoreSpan = document.getElementById('computer-score');
    let playerOneScoreSpan = document.getElementById('player-1-score-2p');
    let playerTwoScoreSpan = document.getElementById('player-2-score-2p');

    // Reset scores to 0
    playerScore = 0;
    computerScore = 0;
    playerOneScore = 0;
    playerTwoScore = 0;

    // Update the score display
    playerScoreSpan.innerHTML = playerScore;
    computerScoreSpan.innerHTML = computerScore;
    playerOneScoreSpan.innerHTML = playerOneScore;
    playerTwoScoreSpan.innerHTML = playerTwoScore;

}

function resetBorders() {
    console.log("BORDERS RESET")
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
    gameArea.style.display = "flex";
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
    playerTwoChoicePopup.style.display = "flex";

    // const playerTwoMakeChoiceButton = document.getElementById("player-2-make-choice-button");
    // playerTwoMakeChoiceButton.addEventListener("click", function () { showPlayerTwoChoices(); });


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
    gameArea.style.display = "flex";
    gameContainer.style.display = "block";
}

function twoPlayerResultPopup() {
    // Get the play game box, game container and game over elements
    const gameContainer = document.getElementById("game-container");
    // Hide game container

    console.log("hiding game container");
    gameContainer.style.display = "none";
    console.log("game container hidden");

    const twoPlayerGameOver = document.getElementById("game-over-box-two");
    twoPlayerGameOver.style.display = "flex";

}

function clickToShowResult() {
    // Get the play game box, game container and game over elements
    const gameContainer = document.getElementById("game-container");
    // Hide game container

    console.log("hiding game container");
    gameContainer.style.display = "none";
    console.log("game container hidden");

    const clickToShow = document.getElementById("click-to-show");
    clickToShow.style.display = "flex";

    // const clickToShowButton = document.getElementById("click-to-show-button")
    // clickToShowButton.addEventListener("click", function () { showResultTwoPlayer(); });

}

function showResultTwoPlayer() {

    resetBorders();

    console.log("showResultTwoPlayer started")

    const clickToShow = document.getElementById("click-to-show");
    clickToShow.style.display = "none";

    // Want to show player 1s div and player 2s div side by side, with appropriate win/lose borders
    const gameContainer = document.getElementById("game-container");
    let playerOneArea = document.getElementById("player-1-area");
    let playerTwoArea = document.getElementById("player-2-area");
    let scoreAreaTwo = document.getElementById("score-area-2p")
    const nextRoundButton = document.getElementById("next-round-button")
    gameContainer.style.display = "block";
    playerOneArea.style.display = "flex";
    playerTwoArea.style.display = "flex";
    scoreAreaTwo.style.display = "flex";
    nextRoundButton.style.display = "block";

    
    let indexResult = (numberOfChoices + playerTwoChoiceIndex - playerOneChoiceIndex) % numberOfChoices;
    // If choice corresponds to value in win, then win is logged.
    // Similarly for lose and draw. +s to keep modulo values +ve
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
    } else outcome = "Oops, something went wrong!";
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

    // // Show the divs with id "results-area-2p" and "score-area-2p"
    // const resultsArea2p = document.getElementById("results-area-2p");
    // resultsArea2p.style.display = "none";

    const scoreArea2p = document.getElementById("score-area-2p");
    scoreArea2p.style.display = "none";

    const playerOneChoicePopup = document.getElementById("player-1-make-choice");
    playerOneChoicePopup.style.display = "flex";

    let playerOneButtons = document.getElementById('player-1-choices').children;
    for (let i = 0; i < playerOneButtons.length; i++) {
        playerOneButtons[i].disabled = false;
        playerOneButtons[i].style.width = "25%"}

    let playerTwoButtons = document.getElementById('player-2-choices').children;
    for (let i = 0; i < playerTwoButtons.length; i++) {
        playerTwoButtons[i].disabled = false;
        playerTwoButtons[i].style.width = "25%"}

    // const playerOneMakeChoiceButton = document.getElementById("player-1-make-choice-button");
    // playerOneMakeChoiceButton.addEventListener("click", function () { showPlayerOneChoices(); });

    // if (listenerFriendCheck == false) {    
    //     for (let i = 0; i < choices.length; i++) {
    //         const buttonOneId = `player-1-choice-button-${i}`;
    //         const buttonOne = document.getElementById(buttonOneId);
    //         buttonOne.addEventListener("mousedown", function () { setPlayerOneChoice(i); });
    //         buttonOne.addEventListener("mouseup", function () { showPlayerTwoPopup(); })
    //     };
    //     for (let j = 0; j < choices.length; j++) {
    //     const buttonTwoId = `player-2-choice-button-${j}`;
    //     const buttonTwo = document.getElementById(buttonTwoId);
    //     buttonTwo.addEventListener("mousedown", function () { setPlayerTwoChoice(j); });
    //     buttonTwo.addEventListener("mouseup", function () {clickToShowResult()});
    //     };
    //     listenerFriendCheck == true;
    // }
}

function resetTwoPlayer() {
    resetBorders()

    let playerOneButtons = document.getElementById('player-1-choices').children;
    for (let i = 0; i < playerOneButtons.length; i++) {
        if (i !== playerOneChoiceIndex) {
            playerOneButtons[i].style.display = 'block';
        } else {
            playerOneButtons[i].disabled = false;
            playerOneButtons[i].style.width = "25%";
        }
    }

    // Hide buttons in player-2-choices based on index
    let playerTwoButtons = document.getElementById('player-2-choices').children;
    for (let i = 0; i < playerTwoButtons.length; i++) {
        if (i !== playerTwoChoiceIndex) {
            playerTwoButtons[i].style.display = 'block';
        } else {
            playerTwoButtons[i].disabled = false;
            playerTwoButtons[i].style.width = "25%";
        }
    }

    let playerTwoArea = document.getElementById("player-2-area");
    playerTwoArea.style.display = "none";


    startFriendGame()
}

function showInstructions() {
    let instructionsExplained = document.getElementById("instructions-explained");
    let startGameBox = document.getElementById("start-game-box");
    let gameOverBox = document.getElementById("game-over-box");

    startGameBox.style.display = "none";
    gameOverBox.style.display = "none";
    instructionsExplained.style.display = "flex";
}

function hideInstructions() {
    let instructionsExplained = document.getElementById("instructions-explained");
    let startGameBox = document.getElementById("start-game-box");

    startGameBox.style.display = "flex";
    instructionsExplained.style.display = "none";
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

    instructionsButton.addEventListener("click", function () {showInstructions();})
    returnToGame.addEventListener("click", function () {hideInstructions()})

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
        buttonTwo.addEventListener("mouseup", function () {clickToShowResult()});
        };
        listenerFriendCheck == true;
    }

    const playerTwoMakeChoiceButton = document.getElementById("player-2-make-choice-button");
    playerTwoMakeChoiceButton.addEventListener("click", function () { showPlayerTwoChoices(); });

    nextRoundButton.addEventListener("click", function () {resetTwoPlayer()})

    const clickToShowButton = document.getElementById("click-to-show-button")
    clickToShowButton.addEventListener("click", function () { showResultTwoPlayer(); });
    
        // Click event listener for play-against-computer buttons (play and replay)
    for (let i = 0; i < playAgainstComputerButtons.length; i++) {
        playAgainstComputerButtons[i].addEventListener("click", function () {
            startComputerGame();
            // Hide the parent play-game-box
            this.closest('.play-game-box').style.display = "none";
        });
    }

    // Click event listener for play against friend
    for (let i = 0; i < playAgainstFriendButtons.length; i++) {
        playAgainstFriendButtons[i].addEventListener("click", function () {
            startFriendGame();
            // Hide the parent play-game-box
            this.closest('.play-game-box').style.display = "none";
        });
    }

});

