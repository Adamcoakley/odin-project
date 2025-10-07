const DEFAULT_COLOUR = '#FFC342'; // default button color
const DEFAULT_SIZE = 16; // default grid size
const DEFAULT_BUTTON = 'colour-btn'; // default active button id

let currentColour = DEFAULT_COLOUR;
let currentSize = DEFAULT_SIZE;

// track mouse state
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// variables for all of the ids 
const colourWheelContainer = document.getElementById('colour-wheel-container');
const colourWheel = document.getElementById('colour-wheel');
const colourBtn = document.getElementById('colour-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const eraserBtn = document.getElementById('eraser-btn');
const resetBtn = document.getElementById('reset-btn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');

// trigger colour picker when clicking on the colour wheel container
colourWheelContainer.addEventListener('click', () => {
    colourWheel.click();
});

// update current colour and colour wheel container when a new colour is selected
colourWheel.addEventListener('input', (e) => {
    currentColour = e.target.value;
    colourWheelContainer.style.backgroundColor = currentColour;
});

// update grid size and regenerate it when the slider changes
sizeSlider.addEventListener('input', (event) => {
    currentSize = event.target.value;
    sizeValue.textContent = `${currentSize} x ${currentSize}`;
    createGrid(currentSize);
});

// generate the grid with given size
function createGrid(size) {
    grid.innerHTML = ''; // clear existing grid
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.addEventListener('mousedown', changeColour);
        cell.addEventListener('mouseover', changeColour);
        grid.appendChild(cell);
    }
}

// change cell colour when drawing
function changeColour(e) {
    if (e.type === 'mouseover' && !mouseDown) return;

    // if we're in rainbow mode, pick a random color each time
    if (currentColour === 'rainbow') {
        e.target.style.backgroundColor = getRandomColor(); // apply a random color
    } else {
        e.target.style.backgroundColor = currentColour; // otherwise, use the current color
    }
}

// generate a random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // random value for red (0-255)
    const g = Math.floor(Math.random() * 256); // random value for green (0-255)
    const b = Math.floor(Math.random() * 256); // random value for blue (0-255)
    return `rgb(${r}, ${g}, ${b})`; // return the color in rgb format
}

// handle colour mode button
colourBtn.addEventListener('click', () => {
    currentColour = colourWheel.value;
    setActiveButton(colourBtn);
});

// handle rainbow mode button
rainbowBtn.addEventListener('click', () => {
    currentColour = 'rainbow'; // set to rainbow mode
    setActiveButton(rainbowBtn);
});

// handle eraser button
eraserBtn.addEventListener('click', () => {
    currentColour = '#ffffff';
    setActiveButton(eraserBtn);
});

// reset grid cells to white
resetBtn.addEventListener('click', () => {
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach((cell) => (cell.style.backgroundColor = '#ffffff'));
});

// highlight the active button
function setActiveButton(button) {
    [colourBtn, rainbowBtn, eraserBtn].forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
}

// initialise the grid and default button
function initialise() {
    // set the default colour button as active
    const defaultButton = document.getElementById(DEFAULT_BUTTON);
    setActiveButton(defaultButton);

    // set the default colour wheel background
    colourWheelContainer.style.backgroundColor = DEFAULT_COLOUR;

    // set the currentColour to the default colour
    currentColour = DEFAULT_COLOUR;

    // create the default grid
    createGrid(DEFAULT_SIZE);
}

// call the initialise function on page load
initialise();
