// Global variable for the ghost movement interval
var ghostMovementInterval;

// Function to initialize or resume the game
function initializeOrResumeGame() {
    displayWorld();
    displayPacman();
    displayScore();

    // Clear any existing interval to avoid duplicates
    clearInterval(ghostMovementInterval);

    // Start or resume the ghost movement
    ghostMovementInterval = setInterval(moveGhost, 300);

    // Enable keyboard controls
    document.onkeydown = function(e) {
        movePacman(e);
    };
}

// Function to pause the game
function pauseGame() {
    clearInterval(ghostMovementInterval); // Stop the ghost movement
    document.onkeydown = null; // Disable keyboard controls
}

// Get the game container element
var gameContainer = document.getElementById('pacmanGameContainer');

// Add hover event listener to start or resume the game
gameContainer.addEventListener('mouseenter', initializeOrResumeGame);

// Add event listener to pause the game when the mouse leaves the game area
gameContainer.addEventListener('mouseleave', pauseGame);

// Rest of your game code (world array, moveGhost, movePacman, etc.)


var world = [
    [2,2,2,2,2,2,2,2,2,2],
    [2,1,3,1,1,1,1,3,1,2],
    [2,1,2,1,2,2,1,2,1,2],
    [2,1,1,1,3,1,1,2,1,2],
    [2,1,2,2,2,2,1,1,1,2],
    [2,1,1,1,1,1,1,2,1,2],
    [2,1,2,2,2,1,2,2,1,2],
    [2,1,1,1,3,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2]
];

var lives = 3;
var score = 0;
var totalCoins = countCoins(world);

var pacman = {
    x: 1,
    y: 1,
    direction: "right"
};

var ghost = {
    x: 5,
    y: 5,
    direction: "left"
};

function moveGhost() {
    var possibleDirections = ["left", "right", "up", "down"];
    var newDirection;

    do {
        newDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
    } while (
        (newDirection === "left" && (ghost.x === 1 || world[ghost.y][ghost.x - 1] === 2)) ||
        (newDirection === "right" && (ghost.x === world[0].length - 2 || world[ghost.y][ghost.x + 1] === 2)) ||
        (newDirection === "up" && (ghost.y === 1 || world[ghost.y - 1][ghost.x] === 2)) ||
        (newDirection === "down" && (ghost.y === world.length - 2 || world[ghost.y + 1][ghost.x] === 2))
    );

    ghost.direction = newDirection;

    if (ghost.direction === "left") {
        ghost.x--;
    } else if (ghost.direction === "right") {
        ghost.x++;
    } else if (ghost.direction === "up") {
        ghost.y--;
    } else if (ghost.direction === "down") {
        ghost.y++;
    }

    displayGhost();

    if (pacman.x === ghost.x && pacman.y === ghost.y) {
        handlePacmanGhostCollision();
    }
}

function handlePacmanGhostCollision() {
    lives--;

    if (lives <= 0) {
        alert("Game Over");
        resetGame();
    } else {
        resetPacman();
    }
}

function resetGame() {
    score = 0;
    lives = 3;
    resetPacman();
    displayScore();
    displayWorld();
}

function resetPacman() {
    pacman.x = 1;
    pacman.y = 1;
    pacman.direction = "right";
    displayPacman();
}

function displayWorld() {
    var output = '';
    for(var i = 0; i < world.length; i++) {
        output += "<div class='row'>";
        for(var j = 0; j < world[i].length; j++) {
            if (world[i][j] == 2)
                output +="<div class='brick'></div>";
            else if (world[i][j] == 1)
                output +="<div class='coin'></div>";
            else if (world[i][j] == 3)
                output += "<div class='cherry'></div>";
            else if (world[i][j] == 0)
                output +="<div class='empty'></div>";
        }
        output += "</div>";
    }
    document.getElementById("world").innerHTML = output;
}

function displayPacman() {
    var pacmanElement = document.getElementById("pacman1");
    pacmanElement.style.top = pacman.y * 20 + "px";
    pacmanElement.style.left = pacman.x * 20 + "px";

    switch(pacman.direction) {
        case "left":
            pacmanElement.style.transform = "rotate(180deg)";
            break;
        case "up":
            pacmanElement.style.transform = "rotate(270deg)";
            break;
        case "down":
            pacmanElement.style.transform = "rotate(90deg)";
            break;
        default:
            pacmanElement.style.transform = "rotate(0deg)";
    }
}

function displayGhost() {
    var ghostElement = document.getElementById("ghost");
    ghostElement.style.top = ghost.y * 20 + "px";
    ghostElement.style.left = ghost.x * 20 + "px";
}

function displayScore() {
    document.getElementById("score").innerHTML = "Score: " + score + " Lives: " + lives;
}

function movePacman(e) {
    if (e.keyCode === 37 && world[pacman.y][pacman.x - 1] !== 2) {
        pacman.x--;
        pacman.direction = "left";
    } else if (e.keyCode === 39 && world[pacman.y][pacman.x + 1] !== 2) {
        pacman.x++;
        pacman.direction = "right";
    } else if (e.keyCode === 38 && world[pacman.y - 1][pacman.x] !== 2) {
        pacman.y--;
        pacman.direction = "up";
        e.preventDefault();
    } else if (e.keyCode === 40 && world[pacman.y + 1][pacman.x] !== 2) {
        pacman.y++;
        pacman.direction = "down";
        e.preventDefault();
    }

    if (world[pacman.y][pacman.x] === 1) {
        world[pacman.y][pacman.x] = 0;
        score += 10;
        checkLevelCompletion();
    } else if (world[pacman.y][pacman.x] === 3) {
        world[pacman.y][pacman.x] = 0;
        score += 50;
        checkLevelCompletion();
    }

    displayWorld();
    displayPacman();
    displayScore();
}

function countCoins(worldArray) {
    return worldArray.flat().filter(cell => cell === 1).length;
}

function checkLevelCompletion() {
    var remainingCoins = countCoins(world);
    if (remainingCoins === 0) {
        alert("Level Completed!");
        resetGame();
    }
}

function resetGame() {
    // Reset score and lives
    score = 0;
    lives = 3;

    // Reset the world to its initial state
    world = [
        [2,2,2,2,2,2,2,2,2,2],
        [2,1,3,1,1,1,1,3,1,2],
        [2,1,2,1,2,2,1,2,1,2],
        [2,1,1,1,3,1,1,2,1,2],
        [2,1,2,2,2,2,1,1,1,2],
        [2,1,1,1,1,1,1,2,1,2],
        [2,1,2,2,2,1,2,2,1,2],
        [2,1,1,1,3,1,1,1,1,2],
        [2,2,2,2,2,2,2,2,2,2]
    ];

    // Reset Pacman and Ghost positions
    resetPacman();
    resetGhost();

    // Update the display
    displayWorld();
    displayPacman();
    displayGhost();
    displayScore();
}

function resetPacman() {
    pacman.x = 1;
    pacman.y = 1;
    pacman.direction = "right";
    displayPacman();
}

function resetGhost() {
    ghost.x = 5;
    ghost.y = 5;
    ghost.direction = "left";
    displayGhost();
}

