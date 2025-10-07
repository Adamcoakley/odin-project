// Access the image elements
const choices = document.querySelectorAll(".images");

// Access the outcome elements
const playerOutcome = document.getElementById('player-choice');
const computerOutcome = document.getElementById('computer-choice');
const resultOutcome = document.getElementById('result');
const scoreOutcome = document.getElementById('score');
const resetBtn = document.getElementById('reset-btn');

// Store score variables
let playerScore = 0;
let computerScore = 0;

// Possible outcomes
const outcomeMap = {
    rock: { rock: "Tie", paper: "Computer wins!", scissors: "Player wins!" },
    paper: { rock: "Player wins!", paper: "Tie", scissors: "Computer wins!" },
    scissors: { rock: "Computer wins!", paper: "Player wins!", scissors: "Tie" }
};

// Add event listeners to images
choices.forEach(choice => {
    choice.addEventListener('click', () => playGame(choice.id));
});

// Reset button
resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    scoreOutcome.textContent = `Score: ${playerScore} - ${computerScore}`;
    resultOutcome.classList.add("hidden");
    scoreOutcome.classList.add("hidden");
});

function playGame(playerChoice) {
    // Random computer choice
    const computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];

    // Determine result
    const result = outcomeMap[playerChoice][computerChoice];

    // Update score
    if (result === "Player wins!") playerScore++;
    if (result === "Computer wins!") computerScore++;

    // Update outcome display
    playerOutcome.textContent = "Player: " + playerChoice;
    computerOutcome.textContent = "Computer: " + computerChoice;

    // Update result text
    const resultText = document.getElementById('result-text');
    resultText.textContent = result;
    resultText.classList.remove("result-player-wins", "result-computer-wins");

    if (result === "Player wins!") {
        resultText.classList.add("result-player-wins");
    } else if (result === "Computer wins!") {
        resultText.classList.add("result-computer-wins");
    }

    // Update score display
    scoreOutcome.textContent = `Score: ${playerScore} - ${computerScore}`;

    // Show result and score
    resultOutcome.classList.remove("hidden");
    scoreOutcome.classList.remove("hidden");
}