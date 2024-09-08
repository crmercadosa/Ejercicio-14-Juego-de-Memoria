const images = [
    '⭐', '⭐', '❤️', '❤️',
    '🌟', '🌟', '💎', '💎',
    '🔔', '🔔', '🔑', '🔑'
];

let board = document.getElementById('game-board');
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createBoard() {
    let shuffledImages = shuffle(images);

    shuffledImages.forEach((image, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);

        let cardImage = document.createElement('img');
        cardImage.setAttribute('src', `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="40">${image}</text></svg>`);

        card.appendChild(cardImage);
        board.appendChild(card);

        card.addEventListener('click', flipCard);
        cards.push(card);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.querySelector('img').getAttribute('src') === secondCard.querySelector('img').getAttribute('src');

    if (isMatch) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

document.getElementById('restart-button').addEventListener('click', () => {
    board.innerHTML = '';
    cards = [];
    createBoard();
});

createBoard();
