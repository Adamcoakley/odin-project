// Access the image elements
const choices = document.querySelectorAll(".images");

// Access the outcome elements
const playerOutcome = document.getElementById('player-choice');
const computerOutcome = document.getElementById('computer-choice');
const resultOutcome = document.getElementById('result');
const scoreOutcome = document.getElementById('score');

// Store score variables
let playerScore = 0;
let computerScore = 0;

// Possible outcomes table
const outcomeMap = {
    rock: { rock: "Tie", paper: "Computer wins!", scissors: "Player wins!" },
    paper: { rock: "Player wins!", paper: "Tie", scissors: "Computer wins!" },
    scissors: { rock: "Computer wins!", paper: "Player wins!", scissors: "Tie" }
};

// Add event listeners to images
choices.forEach(choice => {
    choice.addEventListener('click', () => playGame(choice.id));
});

function playGame(playerChoice) {
    // Randomize the computer's choice
    const computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];

    // Determine result from the outcome map
    const result = outcomeMap[playerChoice][computerChoice];

    // Update score based on the result
    if (result === "Player wins!") playerScore++;
    if (result === "Computer wins!") computerScore++;

    // Update the outcome elements
    playerOutcome.textContent = "Player: " + playerChoice;
    computerOutcome.textContent = "Computer: " + computerChoice;

    // Update the result-text span
    const resultText = document.getElementById('result-text');
    resultText.textContent = result; // Set dynamic result text

    // Remove any previous styling classes
    resultText.classList.remove("result-player-wins", "result-computer-wins");

    // Apply the correct styling based on the result
    if (result === "Player wins!") {
        resultText.classList.add("result-player-wins");
    } else if (result === "Computer wins!") {
        resultText.classList.add("result-computer-wins");
    }

    // Update the score display
    scoreOutcome.textContent = `Score: ${playerScore} - ${computerScore}`;

    // Make the result and score elements visible again
    resultOutcome.classList.remove("hidden");
    scoreOutcome.classList.remove("hidden");
}
