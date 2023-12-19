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
  
  if (choices.length < 3) {
    console.log("Invalid game. Number of choices must be at least 3.");
  } else if (choices.length % 2 == 0) {
    console.log("Invalid game. Number of choices must be odd.");
  } else {
  // Array same length as choices, but empty
  
  const s = choices.length;
  
  // let c = Array(s);
  
  // Complicated way to get indicies of elements in choices written in c
  let c = Array.from({ length: s }, (_, i) => i);
  
  // Number of winning or losing results
  const r = (Math.floor(s / 2));
  
  // Create arrays representing the possible results
  const draw = [0];
  
  // Integers in c from 1 to |c|/2
  const win = Array.from({ length: r }, (_, i) => i + 1);
  console.log("win :")
  console.log(win)
  console.log()
  
  //The remaining integers
  // const lose = [3, 4];
  const lose = Array.from({ length: r }, (_, i) => r + i + 1);
  console.log("lose :")
  console.log(lose)
  console.log()
  
  // Running through all possible pairs
  
  let a = 0, b = 0;
  while (a < s) {
    while (b < s) {
      let playerChoice = choices[a];
      console.log("playerChoice :")
      console.log(playerChoice)
      console.log()
  
      let computerChoice = choices[b];
      console.log("computerChoice :")
      console.log(computerChoice)
      console.log()
  
  // If choice corresponds to value in win, then win is logged. Similarly for lose and draw. +s to keep modulo values +ve
  
      if (win.includes((s + b - a) % s)) {
          console.log("You win! " + choices[a] + " beats " + choices[b]);
      } else if (lose.includes((s + b - a) % s)) {
          console.log("You lose! " + choices[b] + " beats " + choices[a]);
      } else if (draw.includes((s + b - a) % s)) {
          console.log("DRAW")
      } else console.log("Oops, something went wrong!")
      
      console.log()
      console.log("NEW GAME")
      console.log()
  
      b++;
      }
    a++;
    }
  }