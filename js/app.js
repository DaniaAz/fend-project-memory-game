let openCards = []; // only holds two values for the two current open cards
const gameOverList = [];// holds all the cards

const faces = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

// moves counter
let moves = 0;
let counter = document.querySelector(".moves");

let deckElement = document.querySelector('.deck');
let actualSixteenCardsList = Array.from(deckElement.children);

let restart = document.querySelector('.restart');

let congratulationsElement = document.createElement('span');

document.body.onload = startGame;

function initBoard() {
  congratulationsElement = document.createElement('span');
  congratulationsElement.textContent = 'CONGRATULATIONS';
  actualSixteenCardsList.forEach((item) => (item.className = 'card'));
  counter.textContent = moves = 0;
// Shuffle faces
  let shuffledFaces = shuffle(faces);
// change each card class name to the new shuffled ones
  actualSixteenCardsList.forEach((item, index) => (item.firstElementChild.className = `fa ${shuffledFaces[index]}`));
}


function reattachDeckToContainer() {
  setTimeout(function () {
    congratulationsElement.style.display = 'none';
  }, 500);
  deckElement.style.display = 'flex';
}

function restartGame() {
  reattachDeckToContainer();
  initBoard();
}

function startGame() {
  initBoard();
  restart.addEventListener('click', restartGame);
// Set one Listener to the deck element
  deckElement.addEventListener("click", openCard);

  function openCard(event) {
    let target = event.target;

    displayCardSymbol(target);
  }

  function displayCardSymbol(card) {

    card.classList.add('open', 'show');
    console.log('hi ' + card.classList);
    // first Increase Moves
    increaseMoves();
    addToOpenCardsList(card.firstElementChild);
  }

  function increaseMoves() {
    moves += 1;
    counter.textContent = moves;
  }

  function addToOpenCardsList(currentClickedCardFaceName) {
    openCards.push(currentClickedCardFaceName);
    console.log(openCards);
    checkForMatches(currentClickedCardFaceName);
  }

  function checkForMatches(currentClickedCardFaceName) {
    let length = openCards.length;
    let firstOpenedCard = openCards[0];
    if (length === 2) {
      if (firstOpenedCard.className === currentClickedCardFaceName.className)
        setTimeout(function () {
          match(currentClickedCardFaceName, firstOpenedCard)
        }, 500);
      else {
        unmatched(currentClickedCardFaceName, firstOpenedCard);
      }
    }
  }

  function match(currentClickedCardFaceName, firstOpenedCard) {
    lockCards(currentClickedCardFaceName, firstOpenedCard);
  }

  function lockCards(firstCard, secondCard) {
    firstCard.parentElement.className = 'card match'  //${CARD_DISABLED}`;
    secondCard.parentElement.className = 'card match' // ${CARD_DISABLED}`;
    gameOverList.push(firstCard);
    gameOverList.push(secondCard);
    clearOpenCardsList();

    // check for game over
    if (gameOverList.length === 16)
      won();

  }

  function won() {
    deckElement.style.display = 'none';
    deckElement.insertAdjacentHTML('beforebegin', congratulationsElement);
  }

  function unmatched(firstOpenedCard, currentClickedCardFaceName) {
    setTimeout(function () {
      hideSymbols(firstOpenedCard, currentClickedCardFaceName);
      clearOpenCardsList();
    }, 900);
  }


  function clearOpenCardsList() {
    openCards.pop();
    openCards.splice(0, 1);
    openCards = [];
    console.log(openCards);
  }

  function hideSymbols(firstCard, secondCard) {
    firstCard.parentElement.className = 'card mismatch';
    secondCard.parentElement.className = 'card mismatch';
    setTimeout(function () {
    firstCard.parentElement.className = 'card';
    secondCard.parentElement.className = 'card';
    }, 500);
  }

// Shuffle function from http://stackoverflow.com/a/2450976
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

}

window.onload = function init() {
  startGame();
};

