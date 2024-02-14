
const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailSpan = document.querySelector('#gmail_result');

const validateEmail = (email) => {
    const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regExp.test(email);
};

const updateValidationResult = (isValid) => {
    gmailSpan.innerHTML = isValid ? 'OK' : 'Not OK';
    gmailSpan.style.color = isValid ? 'green' : 'red';
};

gmailButton.addEventListener('click', () => {
    const email = gmailInput.value;
    const isValidEmail = validateEmail(email);
    updateValidationResult(isValidEmail);
});



const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');
let currentPositionX = 0, currentPositionY = 0, isMoving = false, direction = 0;

const moveBlock = () => {
    const step = 5, maxX = parentBlock.offsetWidth - childBlock.offsetWidth, maxY = parentBlock.offsetHeight - childBlock.offsetHeight;
    if (!isMoving) {
        isMoving = true;
        switch (direction) {
            case 0: currentPositionX += step; if (currentPositionX >= maxX) { currentPositionX = maxX; direction = 1; } break;
            case 1: currentPositionY += step; if (currentPositionY >= maxY) { currentPositionY = maxY; direction = 2; } break;
            case 2: currentPositionX -= step; if (currentPositionX <= 0) { currentPositionX = 0; direction = 3; } break;
            case 3: currentPositionY -= step; if (currentPositionY <= 0) { currentPositionY = 0; direction = 0; } break;
        }
        childBlock.style.left = currentPositionX + 'px';
        childBlock.style.top = currentPositionY + 'px';
        setTimeout(() => { isMoving = false; moveBlock(); }, 10);
    }
};

document.addEventListener('DOMContentLoaded', () => moveBlock());

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const minutesDisplay = document.getElementById('minutesS');
const secondsDisplay = document.getElementById('secondsS');
const millisecondsDisplay = document.getElementById('ml-secondsS');
let timerInterval, minutes = 0, seconds = 0, milliseconds = 0;

function updateDisplay() {
    minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
    millisecondsDisplay.textContent = milliseconds < 10 ? '0' + milliseconds : milliseconds;
}

startButton.addEventListener('click', () => {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            milliseconds++;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
                if (seconds === 60) {
                    seconds = 0;
                    minutes++;
                }
            }
            updateDisplay();
        }, 10);
    }
});

stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = undefined;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = undefined;
    minutes = seconds = milliseconds = 0;
    updateDisplay();
});

updateDisplay();