const cardEmojis = ['🐱', '🐶', '🦊', '🐵', '🐯', '🐮'];

let flippedCards = [];
let matchedPairs = 0;
let totalPairs = cardEmojis.length;


function initGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    const cardsToShuffle = [...cardEmojis, ...cardEmojis];
    const shuffledCards = shuffleArray(cardsToShuffle);

    shuffledCards.forEach(emoji => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <div class="card-front">?</div>
        <div class="card-back">${emoji}</div>
        `;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
}

function shuffleArray(array) {
    const newArray = [...array];
    for(let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function flipCard(card) {
    if (card.classList.contains('flipped') || flippedCards.length >= 2) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.querySelector('.card-back').textContent;
    const emoji2 = card2.querySelector('.card-back').textContent;

    if (emoji1 === emoji2) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                alert('You won!');
                initGame();
            }, 300);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 500);
    }
}

function restartGame() {
    flippedCards = [];
    matchedPairs = 0;

    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped');
    });

    setTimeout(initGame, 300);
}

window.addEventListener('DOMContentLoaded', () => {
    initGame();
    document.getElementById('restartButton').addEventListener('click', restartGame);
});