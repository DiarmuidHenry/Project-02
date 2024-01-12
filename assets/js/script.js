// Set size must be odd, i.e. 2n+1 for some int n. ORDER IS IMPORTANT. Element x defeats the following r elements in the set, where r is as defined further down. x loses to the preceeding r elements.
// As long as the list is written correctly in this manner, then the game functions for any set of choices sized 2n+1

// // Only begin the game if the game conditions are met
// if (choices.length < 3) {
//     console.log("Invalid game. Number of choices must be at least 3.");
// } else if (choices.length % 2 == 0) {
//     console.log("Invalid game. Number of choices must be odd.");
// } else {

// Create set of choices. ORDER IS IMPORTANT. 

// Example with extended 9-choices game
// let choices = [
//     "Scissors",
//     "Spiderman",
//     "Wizard",
//     "Lizard",
//     "Paper",
//     "Glock",
//     "Batman",
//     "Spock",
//     "Rock"
// ]

// Old fashioned 3-choice game
// let choices = [
//     "Scissors",
//     "Paper",
//     "Rock"
// ]

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

function adjustScore(gameResult) {
    if (gameResult === "win") {
        playerScore +=1;
        let playerScoreSpan = document.getElementById('player-1-score');
        playerScoreSpan.innerHTML = playerScore;
            if (playerScore === 10) {
                gameOver("victory");
            }
    } else if (gameResult === "lose") {
        computerScore +=1;
        let computerScoreSpan = document.getElementById('computer-score');
        computerScoreSpan.innerHTML = computerScore;
            if (computerScore === 10) {
                gameOver("defeat");
            } 
    }
    console.log(`Player : ${playerScore} \nComputer : ${computerScore}`);
}
 
function gameOver(finalResult) {
    if (finalResult === "victory") {
        console.log("YOU WIN THE GAME");
    } else {
        console.log("YOU LOSE THE GAME");
    }
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
        gameResult = "lose"
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
function startGame() {
for (let i = 0; i < choices.length; i++) {
    const buttonId = `player-1-choice-button-${i}`;
    const button = document.getElementById(buttonId);
    // Add click event listener to each button
    button.addEventListener("click", function() {setPlayerChoice(i)});
}
}

startGame();
// let endTime = new Date();
// let timeElapsed = endTime - startTime;
// console.log("\nTotal time taken :\n" + timeElapsed + "ms");