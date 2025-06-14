/*
    by Stephen Gatten, last update June 9, 2025
    From the 2D Breakout Game Using Pure JavaScript example at
    https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
*/

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ballRadius = 10;

// Brick variables
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let interval = 0;

let x = canvas.width / 2;
let y = canvas.height - 30;

let ballColor = getRandomColor();

let dx = 2;
let dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for(let r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0};
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
interval = setInterval(updateCanvas, 10);

// GET RANDOM INT returns a random integer between zero and the max.
function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

// GET RANDOM COLOR returns the string "rgb(R,G,B)", with R, G, and B being replaced
// by an integer value between 0 and 255, creating the CSS code for a random color.
function getRandomColor(){
    red = getRandomInt(255);
    grn = getRandomInt(255);
    blu = getRandomInt(255);
    return `rgb(${red}, ${grn}, ${blu})`;
}

// DRAW BALL handles drawing the ball on the screen.
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

// DRAW PADDLE handles drawing the paddle on the screen.
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// DRAW BRICKS handles drawing the field of bricks onto the screen.
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

// UPDATE CANVAS clears the canvas and then draws the game elements each frame.
function updateCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();

    // Bounce off right edge (> width) OR left edge (< 0)
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        ballColor = getRandomColor();
        dx = -dx;
    }

    // Bounce off top edge (< 0)...
    if(y + dy < ballRadius){
        ballColor = getRandomColor();
        dy = -dy;
    }
    // ...or handle hitting the bottom edge or the paddle
    else if(y + dy > canvas.height - ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }
        else{
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    /*if(rightPressed){ paddleX += 7; }
    if(leftPressed){ paddleX -= 7; }*/
    if(rightPressed){ paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth); }
    if(leftPressed){ paddleX = Math.max(paddleX - 7, 0); }

    x += dx;
    y += dy;
}

function keyDownHandler(e){
    if(e.key === "Right" || e.key === "ArrowRight"){
        rightPressed = true;
    }
    if(e.key === "Left" || e.key === "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key === "Right" || e.key === "ArrowRight"){
        rightPressed = false;
    }
    if(e.key === "Left" || e.key === "ArrowLeft"){
        leftPressed = false;
    }
}
