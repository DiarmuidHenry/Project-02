// Set start timer to show total run time
let startTime = new Date();

// Create set of choices. ORDER IS IMPORTANT. 
// Standard 5-choice game
// let choices = [
//     "Scissors",
//     "Lizard",
//     "Paper",
//     "Spock",
//     "Rock"
// ]

// Example with extended 9-choices game
let choices = [
    "Scissors",
    "Spiderman",
    "Wizard",
    "Lizard",
    "Paper",
    "Glock",
    "Batman",
    "Spock",
    "Rock"
]

// Old fashioned 3-choice game
// let choices = [
//     "Scissors",
//     "Paper",
//     "Rock"
// ]

// Only begin the game if the game conditions are met
if (choices.length < 3) {
    console.log("Invalid game. Number of choices must be at least 3.");
} else if (choices.length % 2 == 0) {
    console.log("Invalid game. Number of choices must be odd.");
} else {

    // Declare a constant s, which is the number of
    const s = choices.length;

    // Number of winning or losing results
    const r = (Math.floor(s / 2));

    // Get indicies of elements in choices written into an array, c
    let c = Array.from({ length: s }, (_, i) => i);

    // Create arrays representing the possible results
    const draw = [0];
    const win = Array.from({ length: r }, (_, i) => i + 1);
    const lose = Array.from({ length: r }, (_, i) => r + i + 1);

    // Print these to the console to keep track
    console.log("win : \n" + win + "\n\nlose :\n" + lose + "\n")

    // Run through all possibilites of (a,b)
    let a = 0, b = 0;
    while (a < s) {
        while (b < s) {
            console.log("\n____________NEW GAME____________\n");

            let playerChoice = choices[a];
            let computerChoice = choices[b];

            console.log("playerChoice :\n" + playerChoice + "\n\ncomputerChoice :\n" + computerChoice + "\n")

            // If choice corresponds to value in win, then win is logged. Similarly for lose and draw. +s to keep modulo values +ve

            if (win.includes((s + b - a) % s)) {
                console.log("You win! " + choices[a] + " beats " + choices[b]);
            } else if (lose.includes((s + b - a) % s)) {
                console.log("You lose! " + choices[b] + " beats " + choices[a]);
            } else if (draw.includes((s + b - a) % s)) {
                console.log("DRAW")
            } else console.log("Oops, something went wrong!");

            b++;
        }
        b = 0;
        a++;
    }
}

let endTime = new Date();
let timeElapsed = endTime - startTime;
console.log("\nTotal time taken :\n" + timeElapsed + "ms");