/* Reset */
* {
  box-sizing: border-box;
  user-select: none;
}
body {
  background: linear-gradient(135deg, #f0f4ff, #d9e6ff);
  font-family: 'Oswald', sans-serif;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  color: #1a2a6c;
  text-shadow: 0 0 2px #b0c9ff;
}

h1 {
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: 4px;
  font-size: 2.8rem;
  text-transform: uppercase;
  color: #4a90e2;
  text-shadow:
    1px 1px 1px #a0bfff,
    2px 2px 6px #2f5bb7;
}

#level-info {
  margin-bottom: 1rem;
  font-weight: 600;
  color: #4a90e2;
  letter-spacing: 2px;
  text-transform: uppercase;
}
#game {
  width: 440px;
  max-width: 95vw;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  perspective: 1200px;
}

.card {
  width: 100%;
  padding-top: 140%; /* 4:5 ratio */
  position: relative;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 6px;
  box-shadow:
    inset 0 0 12px #c0d8ff,
    0 5px 15px rgba(74, 144, 226, 0.3);
  background: linear-gradient(145deg, #ffffff, #dbe9ff);
  border: 2px solid #4a90e2;
}

.card.flipped {
  transform: rotateY(180deg);
  cursor: default;
}

/* Front & back faces */
.card-face {
  position: absolute;
  inset: 0;
  border-radius: 6px;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  box-shadow: inset 0 0 10px #a0c4ff;
  user-select: none;
}

/* Card front: white with light blue ridges */
.card-front {
  background: linear-gradient(135deg, #e7f0ff 0%, #c8dbff 100%);
  border: 1.5px solid #4a90e2;
  box-shadow:
    inset 0 6px 10px #a3bbf2,
    inset 0 -6px 10px #6699ff88;
  position: relative;
  overflow: hidden;
  flex-direction: column;
  font-size: 1.1rem;
  color: #4a90e2;
  text-transform: uppercase;
  letter-spacing: 3px;
  justify-content: flex-end;
  padding-bottom: 10px;
}

/* Ridged effect using repeating linear gradient */
.card-front::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(
      45deg,
      rgba(74, 144, 226, 0.12),
      rgba(74, 144, 226, 0.12) 5px,
      rgba(74, 144, 226, 0.2) 7px,
      rgba(74, 144, 226, 0.2) 11px
    );
  border-radius: 6px;
  z-index: 1;
}

/* Strong text on front */
.card-front .design-text {
  font-family: 'Oswald', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #4a90e2;
  text-shadow:
    1px 1px 1px #e2f0ff,
    2px 2px 5px #2f5bb7aa;
  user-select: none;
  position: relative;
  z-index: 2;
  margin: 0 auto;
}

/* Card back: light blue background with icon */
.card-back {
  background: #4a90e2;
  color: #e7f0ff;
  transform: rotateY(180deg);
  font-size: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-shadow:
    0 5px 15px #2f5bb7cc;
  text-shadow: 1px 1px 0 #153d7d99;
}

/* Game info */
#rounds-info {
  margin-top: 15px;
  font-weight: 600;
  color: #4a90e2;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* Button styles */
button {
  margin-top: 20px;
  background: #4a90e2;
  border: none;
  padding: 12px 26px;
  color: #e7f0ff;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(74, 144, 226, 0.7);
  transition: background 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-family: 'Oswald', sans-serif;
}
button:hover {
  background: #2f5bb7;
}




