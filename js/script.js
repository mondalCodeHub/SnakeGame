
// scripts starts here //
// variable and const
let inputDirection = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music1.mp3');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

// main()
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    snakeGameEngine();
}

// if the snake collides with itself or the wall (isCollide)
function isCollide(snake_movement) {
    // carsh itself
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake_movement[i].x === snake_movement[0].x && snake_movement[i].y === snake_movement[0].y) {
            return true;
        }
    }
    // crash with wall
    if (snake_movement[0].x >= 18 || snake_movement[0].x <= 0 || snake_movement[0].y >= 18 || snake_movement[0].y <= 0) {
        return true;
    }
    return false;
}

//* Game Engine (snakeGameEngine()) starts here 
function snakeGameEngine() {
    musicSound.play()

    // if snake collide 
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        alert("GAME OVER - Press ENTER to continue");
        inputDirection = { x: 0, y: 0 };
        snakeArray = [{ x: 13, y: 15 }]
        musicSound.play();
        score = 0;
        scoreBox.innerHTML = "SCORE - 0"
    }

    // increase the snake's body size and generate food in a random location (with grid)
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "SCORE - " + score
        // get highscore (highScore) value from local storage then update
        if (score > highScoreValue) {
            highScoreValue = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreValue))
            highScoreBox.innerHTML = "HIGHSCORE - " + highScoreValue;
        }
        // after eating food 
        snakeArray.unshift({ x: snakeArray[0].x + inputDirection.x, y: snakeArray[0].y + inputDirection.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };
    }
    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;


    // Generate snake & food (snakeElement ,foodElement )
    board.innerHTML = " ";
    // snake(snakeElement)
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // food(foodElement)
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// main logic - highScore from local storage , key eveents
musicSound.play()
let highScore = localStorage.getItem("highScore");
if (highScore === null) {
    highScoreValue = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreValue))
} else {
    highScoreValue = JSON.parse(highScore);
    highScoreBox.innerHTML = "HIGHSCORE - " + highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case "ArrowDown":
            // console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case "ArrowRight":
            // console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
        default:
            break;
    }
});
// scripts ends here //
//* @mondalCodeHub (October 2022) *//