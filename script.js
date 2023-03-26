// define canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// define the game grid and it's dimensions
var gridSize = 20;
var girdWidth = canvas.width / gridSize;
var gridHeight = canvas.height / gridSize;

// define the initial snake and it's position

var snake = [{ x: 10, y: 10 }];
var direction = "right";

// define the initial food position

var food = {
	x: Math.floor(Math.random() * girdWidth),
	y: Math.floor(Math.random() * gridHeight),
};

// define the main game loop

function gameLoop() {
	// move the snake
	var head = { x: snake[0].x, y: snake[0].y };
	if (direction == "right") {
		head.x++;
	} else if (direction == "left") {
		head.x--;
	} else if (direction == "up") {
		head.y--;
	} else if (direction == "down") {
		head.y++;
	}
	snake.unshift(head);

	// check for collision with food
	if (head.x == food.x && head.y == food.y) {
		food = {
			x: Math.floor(Math.random() * girdWidth),
			y: Math.floor(Math.floor(Math.random() * gridHeight)),
		};
	} else {
		snake.pop();
	}
	// check for collision with walls or with itself
	if (head.x < 0 || head.x >= girdWidth || head.y < 0 || head.y >= gridHeight) {
		alert("Game Over!");
		clearInterval(interval);
	}
	for (var i = 1; i < snake.length; i++) {
		if (head.x == snake[i].x && head.y == snake[i].y) {
			alert("Game Over!");
			clearInterval(interval);
		}
	}
	// draw the game
	ctx.clearRect(0, 0, canvas.with, canvas.height);
	ctx.fillStyle = "red";
	ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
	ctx.fillStyle = "green";
	for (var i = 0; i < snake.length; i++) {
		ctx.fillRect(
			snake[i].x * gridSize,
			snake[i].y * gridSize,
			gridSize,
			gridSize
		);
	}
}

document.addEventListener("keydown", function (event) {
	if (event.keyCode == 37 && direction != "right") {
		direction = "left";
	} else if (event.keyCode == 38 && direction != "down") {
		direction = "up";
	} else if (event.keyCode == 39 && direction != "left") {
		direction = "right";
	} else if (event.keyCode == 40 && direction != "up") {
		direction = "down";
	}
});

var interval = setInterval(gameLoop, 100);
