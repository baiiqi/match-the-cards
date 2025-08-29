// Manly card icons - weapons, animals, gears, tools
const cardIcons = [
  '🦁', // lion
  '⚙️', // gear
  '🪓', // axe
  '🦅', // eagle
  '🛡️', // shield
  '🔥', // fire
  '🏹', // bow and arrow
  '🗡️'  // dagger
];

// Game variables
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let rounds = 0;
let level = 1;
const maxRounds = 20;
const maxLevels = 3;
const totalCards = 16; // 8 pairs
const gameContainer = document.getElementById('game');
const roundsInfo = document.getElementById('rounds-info');
const levelInfo = document.getElementById('level-info');
const restartBtn = document.getElementById('restart');

// Sound effects
const sounds = {
  flip: new Audio('https://actions.google.com/sounds/v1/impacts/wood_plank_flicks.ogg'),
  match: new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg'),
  shuffle: new Audio('https://actions.google.com/sounds/v1/alarms/phone_alerts_and_rings.ogg'),
  win: new Audio('https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg')
};

function playSound(name) {
  if (sounds[name]) {
    sounds[name].currentTime = 0;
    sounds[name].play();
  }
}

// Shuffle function
function shuffleArray(arr) {
  let array = arr.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create the deck
function createDeck() {
  let deck = cardIcons.slice(0, totalCards / 2);
  deck = deck.concat(deck);
  deck = shuffleArray(deck);
  return deck;
}

// Render cards
function renderCards() {
  gameContainer.innerHTML = '';
  cards.forEach((icon, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.dataset.index = index;

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-face', 'card-front');
    const designText = document.createElement('div');
    designText.className = 'design-text';
    designText.textContent = 'b';  // Card front text as 'b'
    cardFront.appendChild(designText);

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-face', 'card-back');
    cardBack.textContent = icon;

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    card.addEventListener('click', onCardClick);

    gameContainer.appendChild(card);
  });
}

function onCardClick(e) {
  const card = e.currentTarget;
  if (
    flippedCards.length === 2 ||
    card.classList.contains('flipped') ||
    card.classList.contains('matched')
  ) {
    return;
  }

  flipCard(card);
}

function flipCard(card) {
  card.classList.add('flipped');
  playSound('flip');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    rounds++;
    updateRounds();

    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.icon === card2.dataset.icon) {
    matchedPairs++;
    card1.classList.add('matched');
    card2.classList.add('matched');
    playSound('match');
    flippedCards = [];

    if (matchedPairs === totalCards / 2) {
      setTimeout(() => {
        playSound('win');
        alert(`✅ Level ${level} Complete! ✅`);
        if (level < maxLevels) {
          level++;
          startLevel(level);
        } else {
          alert('🏆 You conquered all levels! 🏆');
          resetGame();
        }
      }, 600);
    }
  } else {
    setTimeout(() => {
      unflipCards();
    }, 1300);
  }

  if (rounds >= maxRounds && matchedPairs < totalCards / 2) {
    setTimeout(() => {
      shuffleCards();
      alert('🔀 Cards reshuffled after 20 rounds!');
    }, 1500);
  }
}

function unflipCards() {
  flippedCards.forEach(card => card.classList.remove('flipped'));
  flippedCards = [];
}

function shuffleCards() {
  cards = shuffleArray(cards);
  matchedPairs = 0;
  rounds = 0;
  flippedCards = [];
  updateRounds();
  renderCards();
  playSound('shuffle');
}

function updateRounds() {
  roundsInfo.textContent = `Rounds: ${rounds} / ${maxRounds}`;
  levelInfo.textContent = `Level: ${level} / ${maxLevels}`;
}

function startLevel(lvl) {
  level = lvl;
  rounds = 0;
  matchedPairs = 0;
  cards = createDeck();
  updateRounds();
  renderCards();
}

function resetGame() {
  level = 1;
  rounds = 0;
  matchedPairs = 0;
  cards = createDeck();
  updateRounds();
  renderCards();
}

restartBtn.addEventListener('click', () => {
  if (confirm('Restart the game?')) {
    resetGame();
  }
});

// Initialize game
resetGame();






