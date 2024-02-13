var world = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 1, 3, 1, 1, 1, 1, 3, 1, 2],
    [2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
    [2, 1, 1, 1, 3, 1, 1, 2, 1, 2],
    [2, 1, 2, 2, 2, 2, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 2, 1, 2],
    [2, 1, 2, 2, 2, 1, 2, 2, 1, 2],
    [2, 1, 1, 1, 3, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

var lives = 3;
var score = 0;
var level = 1;

var pacman = {
    x: 1,
    y: 1,
    direction: "down"
};

var pacman2 = {
    x: 8,
    y: 1,
    direction: "up"
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
        level = 1;
        resetGame();
    } else {
        resetGame();
    }
}

function resetGame() {
    lives = 3;
    score = 0;
    level = 1;

    pacman = {
        x: 1,
        y: 1,
        direction: "down"
    };

    pacman2 = {
        x: 8,
        y: 1,
        direction: "up"
    };

    ghost = {
        x: 5,
        y: 5,
        direction: "left"
    };

    displayPacman();
    displayWorld();
    displayScore();
}

function displayWorld() {
    var output = '';
    var coinsRemaining = 0;
    var cherriesRemaining = 0;

    for (var i = 0; i < world.length; i++) {
        output += "<div class='row'>";
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] == 2)
                output += "<div class='brick'></div>";
            else if (world[i][j] == 1) {
                output += "<div class='coin'></div>";
                coinsRemaining++;
            } else if (world[i][j] == 3) {
                output += "<div class='cherry'></div>";
                cherriesRemaining++;
            } else if (world[i][j] == 4)
                output += "<div class='ghost'></div>";
            else if (world[i][j] == 0)
                output += "<div class='empty'></div>";
        }
        output += "</div>";
    }

    document.getElementById("world").innerHTML = output;

    if (coinsRemaining === 0 && cherriesRemaining === 0) {
        alert("Level Completed!");
        level++;
        lives = 3;
        resetGame();
    }
}

function displayPacman() {
    document.getElementById("pacman1").style.top = pacman.y * 20 + "px";
    document.getElementById("pacman1").style.left = pacman.x * 20 + "px";

    document.getElementById("pacman1").style.transform = "rotate(0deg)";
    if (pacman.direction === "left") {
        document.getElementById("pacman1").style.transform = "rotate(-90deg)";
    } else if (pacman.direction === "right") {
        document.getElementById("pacman1").style.transform = "rotate(90deg)";
    } else if (pacman.direction === "up") {
        document.getElementById("pacman1").style.transform = "rotate(180deg)";
    } else if (pacman.direction === "down") {
        document.getElementById("pacman1").style.transform = "rotate(0deg)";
    }

    document.getElementById("pacman2").style.top = pacman2.y * 20 + "px";
    document.getElementById("pacman2").style.left = pacman2.x * 20 + "px";

    document.getElementById("pacman2").style.transform = "rotate(0deg)";
    if (pacman2.direction === "left") {
        document.getElementById("pacman2").style.transform = "rotate(-90deg)";
    } else if (pacman2.direction === "right") {
        document.getElementById("pacman2").style.transform = "rotate(90deg)";
    } else if (pacman2.direction === "up") {
        document.getElementById("pacman2").style.transform = "rotate(180deg)";
    } else if (pacman2.direction === "down") {
        document.getElementById("pacman2").style.transform = "rotate(0deg)";
    }
}

function displayGhost() {
    document.getElementById("ghost").style.top = ghost.y * 20 + "px";
    document.getElementById("ghost").style.left = ghost.x * 20 + "px";
}

function displayScore() {
    document.getElementById("score").innerHTML = "Level: " + level + " Score: " + score + " Lives: " + lives;
}

displayWorld();
displayPacman();
displayScore();

setInterval(moveGhost, 300);

document.onkeydown = function (e) {
    if (e.keyCode === 37 && world[pacman.y][pacman.x - 1] !== 2) {
        pacman.x--;
        pacman.direction = "up";
    } else if (e.keyCode === 39 && world[pacman.y][pacman.x + 1] !== 2) {
        pacman.x++;
        pacman.direction = "down";
    } else if (e.keyCode === 38 && world[pacman.y - 1][pacman.x] !== 2) {
        pacman.y--;
        pacman.direction = "left";
    } else if (e.keyCode === 40 && world[pacman.y + 1][pacman.x] !== 2) {
        pacman.y++;
        pacman.direction = "right";
    }

    if (world[pacman.y][pacman.x] === 1) {
        world[pacman.y][pacman.x] = 0;
        score += 10;
        displayWorld();
        displayScore();
    } else if (world[pacman.y][pacman.x] === 3) {
        world[pacman.y][pacman.x] = 0;
        score += 50;
        displayWorld();
        displayScore();
    }

    if (e.key === "w" && world[pacman2.y - 1][pacman2.x] !== 2) {
        pacman2.y--;
        pacman2.direction = "left";
    } else if (e.key === "s" && world[pacman2.y + 1][pacman2.x] !== 2) {
        pacman2.y++;
        pacman2.direction = "right";
    } else if (e.key === "a" && world[pacman2.y][pacman2.x - 1] !== 2) {
        pacman2.x--;
        pacman2.direction = "up";
    } else if (e.key === "d" && world[pacman2.y][pacman2.x + 1] !== 2) {
        pacman2.x++;
        pacman2.direction = "down";
    }

    if (world[pacman2.y][pacman2.x] === 1) {
        world[pacman2.y][pacman2.x] = 0;
        score += 10;
        displayWorld();
        displayScore();
    } else if (world[pacman2.y][pacman2.x] === 3) {
        world[pacman2.y][pacman2.x] = 0;
        score += 50;
        displayWorld();
        displayScore();
    }

    displayPacman();
};

function handleGameOver() {
    alert("Game Over");
    resetGame();
}

function handleLevelCompleted() {
    alert("Level Completed!");
    level++;
    resetGame();
}

function resetGame() {
    lives = 3;
    score = 0;
    level = 1;

    pacman = {
        x: 1,
        y: 1,
        direction: "down"
    };

    pacman2 = {
        x: 8,
        y: 1,
        direction: "up"
    };

    ghost = {
        x: 5,
        y: 5,
        direction: "left"
    };

    displayPacman();
    displayWorld();
    displayScore();
}