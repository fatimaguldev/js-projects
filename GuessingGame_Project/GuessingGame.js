// // User enter a max number and then tries to guess a random generated number between 1 to MAX

//  const max = prompt("Enter maximum number!");
//  const random = Math.floor(Math.random() * max) + 1;
//  let guess = prompt("Guess the correct Number");
//  console.log(guess);

//  while (true) {
//      if (guess == "quit") {
//          console.log("user quit!");
//         break;
//     }
//      if (guess == random) {
//          console.log("you are right! congrats...!! random number was", random);
//          break;
//      }
//         else if (guess < random) {
//          guess = prompt("Hint: Your guess was too small.Plz try again!");
//      }

//      else  {
//          guess = prompt("Hint: Your guess was too large.Plz try again!");
//         }
// }

let max;
let random;

// Get HTML elements
const maxInput = document.querySelector("#max-number");
const startBtn = document.querySelector("#start-btn");

const guessInput = document.querySelector("#guess");
const guessBtn = document.querySelector("#guess-btn");

const message = document.querySelector("#message");

// Start Game
startBtn.addEventListener("click", function () {
  max = Number(maxInput.value);

  if (max <= 0) {
    message.innerText = "Please enter a number greater than 0.";
    return;
  }

  // Generate random number
  random = Math.floor(Math.random() * max) + 1;

  console.log("Random number:", random);

  message.innerText = `Game started! Guess between 1 and ${max}.`;

  guessInput.value = "";

  guessInput.focus();
});

// Guess button
guessBtn.addEventListener("click", function () {
  let guess = Number(guessInput.value);

  if (!max) {
    message.innerText = "Please start the game first!";
    return;
  }

  if (!guess) {
    message.innerText = "Please enter a guess!";
    return;
  }

  if (guess === random) {
    message.innerText = `You are right! Congrats! The random number was ${random}.`;
  } else if (guess < random) {
    message.innerText = "Hint: Your guess was too small. Please try again!";
  } else {
    message.innerText = "Hint: Your guess was too large. Please try again!";
  }

  guessInput.value = "";
  guessInput.focus();
});

