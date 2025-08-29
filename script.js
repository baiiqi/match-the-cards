// ... existing code ...

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
    shuffleCards();
  }
}

// ... rest of code unchanged ...




