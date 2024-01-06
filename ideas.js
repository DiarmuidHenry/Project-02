// Set size must be odd, i.e. 2n+1 for some int n. ORDER IS IMPORTANT. Element x defeats the following r elements in the set, where r is as defined further down. x loses to the preceeding r elements.
// As long as the list is written correctly in this manner, then the game functions for any set of choices sized 2n+1

// Set start timer to show total run time
let startTime = new Date();

// Create set of choices. ORDER IS IMPORTANT. 

Standard 5-choice game
let choices = [
    "Scissors",
    "Lizard",
    "Paper",
    "Spock",
    "Rock"
]

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

// Insert code here that takes input from the Create Your Own Game section to give a new choices array.

// Only begin the game if the game conditions are met
if (choices.length < 3) {
    console.log("Invalid game. Number of choices must be at least 3.");
} else if (choices.length % 2 == 0) {
    console.log("Invalid game. Number of choices must be odd.");
} else {
    // Declare a constant s, which is the number of choices
    const s = choices.length;

    // Number of winning results (or losing results)
    const r = (Math.floor(s / 2));

    // Get indicies of elements in choices written into an array, c
    let c = Array.from({ length: s }, (_, i) => i);

    // Create arrays representing the possible results
    const draw = [0];
    const win = Array.from({ length: r }, (_, i) => i + 1);
    const lose = Array.from({ length: r }, (_, i) => r + i + 1);

    // Print these to the console to keep track
    console.log("win : \n" + win + "\n\nlose :\n" + lose + "\n")

    // Player chooses a from c. Here, let this be done randomly. Non-random example is commented out.
    //   let a = 3;
    // Computer randomly generates b: an integer from 0 - 4
    let a = Math.floor(Math.random() * s);
    let playerChoice = choices[a];
    let b = Math.floor(Math.random() * s);
    let computerChoice = choices[b];
    console.log("playerChoice :\n" + playerChoice + "\n\ncomputerChoice :\n" + computerChoice + "\n")

    // If choice corresponds to value in win, then win is logged.
    // Similarly for lose and draw. +s to keep modulo values +ve
    if (win.includes((s + b - a) % s)) {
        console.log("You win! " + choices[a] + " beats " + choices[b]);
    } else if (lose.includes((s + b - a) % s)) {
        console.log("You lose! " + choices[b] + " beats " + choices[a]);
    } else if (draw.includes((s + b - a) % s)) {
        console.log("DRAW")
    } else console.log("Oops, something went wrong!")
}
let endTime = new Date();
let timeElapsed = endTime - startTime;
console.log("\nTotal time taken :\n" + timeElapsed + "ms");