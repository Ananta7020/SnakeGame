document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const scoreElement = document.getElementById('score');
    const scoreBoard = document.getElementById('score-board');
    const cellSize = 20;
    let gameInterval;
    let score;
    let snake;
    let direction;
    let food;

    const createDiv = (className) => {
        const div = document.createElement('div');
        div.className = className;
        return div;
    };

    const placeFood = () => {
        food = {
            x: Math.floor(Math.random() * (board.clientWidth / cellSize)) * cellSize,
            y: Math.floor(Math.random() * (board.clientHeight / cellSize)) * cellSize
        };
    };

    const drawFood = () => {
        const foodDiv = createDiv('food');
        foodDiv.style.left = `${food.x}px`;
        foodDiv.style.top = `${food.y}px`;
        board.appendChild(foodDiv);
    };

    const drawSnake = () => {
        snake.forEach(segment => {
            const segmentDiv = createDiv('snake');
            segmentDiv.style.left = `${segment.x}px`;
            segmentDiv.style.top = `${segment.y}px`;
            board.appendChild(segmentDiv);
        });
    };

    const updateSnake = () => {
        const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreElement.textContent = score;
            placeFood();
        } else {
            snake.pop();
        }
    };

    const checkCollision = () => {
        const head = snake[0];
        if (head.x < 0 || head.x >= board.clientWidth || head.y < 0 || head.y >= board.clientHeight) {
            return true;
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }

        return false;
    };

    const gameLoop = () => {
        if (checkCollision()) {
            clearInterval(gameInterval);
            scoreBoard.style.display = 'block'; // Show the score and restart button
            return;
        }

        updateSnake();
        board.innerHTML = '';
        drawSnake();
        drawFood();
    };

    const changeDirection = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (direction.y === 0) direction = {x: 0, y: -cellSize};
                break;
            case 'ArrowDown':
                if (direction.y === 0) direction = {x: 0, y: cellSize};
                break;
            case 'ArrowLeft':
                if (direction.x === 0) direction = {x: -cellSize, y: 0};
                break;
            case 'ArrowRight':
                if (direction.x === 0) direction = {x: cellSize, y: 0};
                break;
        }
    };

    const startGame = () => {
        clearInterval(gameInterval);
        board.innerHTML = '';
        score = 0;
        scoreElement.textContent = score;
        scoreBoard.style.display = 'none'; // Hide the score and restart button
        snake = [{x: 200, y: 200}];
        direction = {x: 0, y: 0};
        placeFood();
        drawSnake();
        drawFood();
        gameInterval = setInterval(gameLoop, 100);
    };

    document.addEventListener('keydown', changeDirection);
    document.getElementById('restart-button').addEventListener('click', startGame);

    startGame();
});
