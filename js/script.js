// Get HTML elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const startButton = document.getElementById('start-button');
const initialMessage = document.getElementById('initial-message');
const jankenMessage = document.getElementById('janken-message');
const choices = document.querySelectorAll('.choice img');
const result = document.getElementById('result');
const resultMessage = document.getElementById('result-message');
const resultImage = document.getElementById('result-image');
const bgm = document.getElementById('bgm');
const startAudio = document.getElementById('start-audio');
const jankenAudio = document.getElementById('janken-audio');
const rockAudio = document.getElementById('rock-audio');
const scissorsAudio = document.getElementById('scissors-audio');
const paperAudio = document.getElementById('paper-audio');
const playerComputerChoice = document.getElementById('player-computer-choice');
const playerChoiceName = document.getElementById('player-choice-name');
const computerChoiceName = document.getElementById('computer-choice-name');
const playerChoiceImg = document.getElementById('player-choice-img');
const computerChoiceImg = document.getElementById('computer-choice-img');

// Start button event listener
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    bgm.pause();
    startAudio.play();
    
    setTimeout(() => {
        initialMessage.style.display = 'none';
        jankenMessage.style.display = 'block';

        setTimeout(() => {
            jankenAudio.play();
        }, 0); // Delay for "じゃんけんぽん"
    }, 2000); // Show "最初はグー！" for 2 seconds
});

// Choices event listeners
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        playGame(choice.id);
    });
});

// Game logic
const playGame = (playerChoice) => {
    const choices = ['rock', 'scissors', 'paper'];
    const choiceNames = { rock: 'グー', scissors: 'チョキ', paper: 'パー' };
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let resultText = '';
    let resultImgUrl = '';

    if (playerChoice === computerChoice) {
        resultText = 'あいこだ！もう１回';
        resultImgUrl = 'https://th.bing.com/th/id/OIP.AoqbwC6vpsxtGb93qwlFcwHaF5?rs=1&pid=ImgDetMain';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
        resultText = '勝った！やったね！';
        resultImgUrl = 'https://th.bing.com/th/id/OIP.Ue2CTe6XiRGrmutkssq_oAAAAA?rs=1&pid=ImgDetMain';
    } else {
        resultText = '負けちゃった・・・';
        resultImgUrl = 'https://img.cpcdn.com/blog_blog_image_photo/1238740/650s/138ccb430e3e989e0a2f5e1fa507630d.jpg';
    }

    jankenMessage.style.display = 'none';
    result.style.display = 'block';
    resultMessage.textContent = resultText;
    resultImage.src = resultImgUrl;

    // Show player's choice and computer's choice
    playerChoiceName.textContent = choiceNames[playerChoice];
    playerChoiceImg.src = document.getElementById(playerChoice).src;
    computerChoiceName.textContent = choiceNames[computerChoice];
    computerChoiceImg.src = document.getElementById(computerChoice).src;

    // Play sound based on player's choice
    switch (playerChoice) {
        case 'rock':
            rockAudio.play();
            break;
        case 'scissors':
            scissorsAudio.play();
            break;
        case 'paper':
            paperAudio.play();
            break;
    }

    // Show result for 3 seconds, then reset to janken message
    setTimeout(() => {
        result.style.display = 'none';
        initialMessage.style.display = 'none';
        jankenMessage.style.display = 'block';
        jankenAudio.play();  // Re-play jankenpon sound
    }, 3000);
};

// ESC key event listener for reset
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        resetGame();
    }
});

const resetGame = () => {
    startScreen.style.display = 'flex';
    gameScreen.style.display = 'none';
    result.style.display = 'none';
    initialMessage.style.display = 'block';
    jankenMessage.style.display = 'none';
    // Restart BGM
    bgm.play();
};

// Start BGM on page load
window.onload = () => {
    bgm.play();
};
