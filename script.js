const gameBoard = document.getElementById('gameBoard');
const turnIndicator = document.getElementById('turnIndicator');
const scoreBoard = document.getElementById('scoreBoard');
const restartBtn = document.getElementById('restartBtn');

const totalPairs = 8; // total pairs of cards
let cards = [];
let flippedCards = [];
let matchedCardsCount = 0;
let currentPlayer = 1;
let scores = {1: 0, 2: 0};
let lockBoard = false;

// Card symbols (you can change or add emojis/icons)
const cardSymbols = ['🍎','🍌','🍇','🍉','🍓','🥝','🍒','🍍'];

// Create shuffled deck with pairs
function createDeck() {
  const deck = [];
  cardSymbols.forEach(symbol => {
    deck.push(symbol);
    deck.push(symbol);
  });
  return shuffle(deck);
}

// Fisher-Yates shuffle
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = 
      [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Build the game board
function buildBoard() {
  gameBoard.innerHTML = '';
  cards = createDeck();

  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;

    card.innerHTML = `
      <div class="cardInner">
        <div class="cardFront">${symbol}</div>
        <div class="cardBack"></div>
      </div>
    `;
    card.addEventListener('click', () => onCardClick(card));
    gameBoard.appendChild(card);
  });
}

// Handle card click
function onCardClick(card) {
  if(lockBoard) return;
  if(card.classList.contains('flipped') || card.classList.contains('removed')) return;
  if(flippedCards.length === 2) return;

  flipCard(card);
  flippedCards.push(card);

  if(flippedCards.length === 2) {
    lockBoard = true;
    checkMatch();
  }
}

// Flip card visually
function flipCard(card) {
  card.classList.add('flipped');
}

// Unflip cards visually
function unflipCards(cardsToUnflip) {
  cardsToUnflip.forEach(card => card.classList.remove('flipped'));
}

// Remove matched cards visually
function removeCards(cardsToRemove) {
  cardsToRemove.forEach(card => {
    card.classList.add('removed');
    // Remove event listener by cloning node (optional)
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
  });
}

// Check if flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;
  if(card1.dataset.symbol === card2.dataset.symbol) {
    // Match!
    removeCards(flippedCards);
    matchedCardsCount += 2;
    scores[currentPlayer]++;
    updateScoreBoard();
    flippedCards = [];
    lockBoard = false;

    if(matchedCardsCount === cards.length) {
      setTimeout(() => {
        alert(`Game Over! Player 1: ${scores[1]} | Player 2: ${scores[2]}`);
        resetGame();
      }, 500);
    }
  } else {
    // No match, flip back after short delay and switch player
    setTimeout(() => {
      unflipCards(flippedCards);
      flippedCards = [];
      lockBoard = false;
      switchPlayer();
    }, 1000);
  }
}

// Switch turns
function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnIndicator();
}

// Update turn display
function updateTurnIndicator() {
  turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
}

// Update score display
function updateScoreBoard() {
  scoreBoard.textContent = `Player 1: ${scores[1]} \u00A0\u00A0 Player 2: ${scores[2]}`;
}

// Reset game and reshuffle
function resetGame() {
  matchedCardsCount = 0;
  flippedCards = [];
  lockBoard = false;
  scores = {1: 0, 2: 0};
  currentPlayer = 1;
  updateTurnIndicator();
  updateScoreBoard();
  buildBoard();
}

// Restart button click handler
restartBtn.addEventListener('click', resetGame);
