const CARD_DISABLED = 'disabled';
let openCards = []; // only holds two values for the two current open cards
// const gameOverList = [];// holds each two matched cards

const faces = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

// moves counter
let moves = 0;
let counter = document.querySelector(".moves");

let deckElement = document.querySelector('.deck');
let actualSixteenCardsList = Array.from(deckElement.children);

let restart = document.querySelector('.restart');

document.body.onload = startGame;


function initBoard() {
  actualSixteenCardsList.forEach((item) => (item.className = 'card'));
  counter.textContent = moves = 0;
// Shuffle faces
  let shuffledFaces = shuffle(faces);
// change each card class name to the new shuffled ones
  actualSixteenCardsList.forEach((item, index) => (item.firstElementChild.className = `fa ${shuffledFaces[index]}`));
}


function startGame() {
  restart.addEventListener('click', initBoard);
  initBoard();

// Set one Listener to the deck element
  deckElement.addEventListener("click", openCard);

  function openCard(event) {
    // check if gameOverList is full then => game is over
    // if (gameOverList.length === 16)
    //   deckElement.className = '';


    // check if card is not disabled first
    let target = event.target;
    if (target.className.includes(CARD_DISABLED)) {
      target.className.includes(CARD_DISABLED);
      return;
    }
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
        match(currentClickedCardFaceName, firstOpenedCard);
      else unmatched(currentClickedCardFaceName, firstOpenedCard);
    }
  }

  function match(currentClickedCardFaceName, firstOpenedCard) {
    lockCards(currentClickedCardFaceName, firstOpenedCard);
  }

  function lockCards(firstCard, secondCard) {
    firstCard.parentElement.className = `card match ${CARD_DISABLED}`;
    secondCard.parentElement.className = `card match ${CARD_DISABLED}`;
    clearOpenCardsList();
  }

  function unmatched(firstOpenedCard, currentClickedCardFaceName) {
    // disable cards while closing them
    firstOpenedCard.classList.add(CARD_DISABLED);
    currentClickedCardFaceName.classList.add(CARD_DISABLED);

    setTimeout(function () {
      hideSymbols(firstOpenedCard, currentClickedCardFaceName);
      clearOpenCardsList();

      //enable them again after closing
      firstOpenedCard.classList.remove(CARD_DISABLED);
      currentClickedCardFaceName.classList.remove(CARD_DISABLED);
    }, 900);
  }


  function clearOpenCardsList() {
    openCards.pop();
    openCards.splice(0, 1);
    openCards = [];
    console.log(openCards);
  }

  function hideSymbols(firstCard, secondCard) {
    // console.log(`firstCard.parentElement.className ${firstCard.parentElement.className}`);
    firstCard.parentElement.className = 'card';
    // console.log(`second.parentElement.className ${secondCard.parentElement.className}`);
    secondCard.parentElement.className = 'card';
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

