let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

const rockElement = document.querySelector('.js-rock');
const paperElement = document.querySelector('.js-paper');
const scissorsElement = document.querySelector('.js-scissors');
const resetElement = document.querySelector('.js-reset-button');

rockElement.addEventListener('click', function() {
  playGame('rock');
});
paperElement.addEventListener('click', function() {
  playGame('paper');
});
scissorsElement.addEventListener('click', function() {
  playGame('scissors');
});
resetElement.addEventListener('click', function() {  
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
});


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  const resultElement = document.querySelector('.js-result');
  resultElement.innerHTML = result;
  if(resultElement.innerHTML === 'You lose.'){
    document.querySelector('.js-result').style.color = 'red';
    resultElement.style.fontWeight = 'bold';
    resultElement.style.fontSize = '4rem';
    resultElement.innerHTML = 'You Lose!!!! HAHAHAHA';
  }
  else if(resultElement.innerHTML === 'You win.'){
    resultElement.style.color = 'green';
    resultElement.style.fontSize = '1rem';
  }
  else {
    resultElement.style.color = 'white';
    resultElement.style.fontSize = '2rem';
  }

  const movesElement = document.querySelector('.js-moves');
  movesElement.innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

