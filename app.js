// GAME FUNCTION:
// - Player must guess a number between max and min.
// - Player gets a certain amount of guesses. 
// - Notify the player of guesses remaining. 
// - Notify the player of the correct answer if loose. 
// - Let player choose to play again. 

// -------------------------------------------

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function (e) {
  if(e.target.className === 'play-again'){
    window.location.reload(true);
  }
});
// Listen for guess
guessBtn.addEventListener('click', guess);

// Functions

function guess(e) {
  let guess = parseInt(guessInput.value);

  // Validation
  if ( isNaN(guess) || guess < min || guess > max ) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  
  // Winning Case
  if ( guess === winningNum ) {
    // Game over - won

    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  }
  else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0){
      // Game over - lost
      gameOver(false, `game over, you lost. The correct number was ${winningNum}`);
    }
    else {
      // game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Tell user the important info
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');

      // Clear input
      guessInput.value = '';
    }
  }
}

function setMessage(msg , color){
  message.style.color = color;
  message.textContent = msg;
}

// Game Over
function gameOver(won , msg){
  let color;
  (won === true ? color = 'green' : color = 'red');

 // Disable input
 guessInput.disabled = true;
 // Change border color
 guessInput.style.borderColor = color;
 // Set message
 setMessage(msg, color);

 // Play again?
 guessBtn.value = 'Play Again';
 guessBtn.className += 'play-again'; 
}

// Random winning number function
function getRandomNum(min, max){
  console.log(Math.floor(Math.random() * (max - min + 1) + min));
  return Math.floor(Math.random() * (max - min + 1) + min);
}
