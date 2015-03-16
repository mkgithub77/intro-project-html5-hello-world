// Global variables for player
var PLAYER_InitX = 219;
var PLAYER_InitY = 468;
var ENEMY_TopY = 140;
var ENEMY_MiddleY = 222;
var ENEMY_BottomY = 305;
var allEnemies = [];

// Enemies our player must avoid
var Enemy = function(init_x,y,speedRate) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.initx = init_x;
    this.x = init_x;
    this.y = y;
    this.speed = speedRate;
    this.width = 101;
    this.height = 67;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    if (this.x > 605) {
        this.x = this.initx;
    }

    if (this.testEnemyPlayerCollision()) {
        player.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Test if player collide with enemy
Enemy.prototype.testEnemyPlayerCollision = function() {
    return ((this.x) <= player.x + player.width &&
            (this.x) + (this.width) >= player.x &&
            (this.y) <= (player.y) + (player.height) &&
            (this.height) + (this.y) >= (player.y)
    )
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = PLAYER_InitX;
    this.y = PLAYER_InitY;
    this.h_step = 15;
    this.v_step = 15;
    this.width = 68;
    this.height = 78;
};

Player.prototype.checkIfBoundaryIsReached = function() {

    if (this.y <= 55){  //check if player had reached the top
        this.y = 55;
        ctx.font = "24px Ariel";
        ctx.fillText("Congratulations!  Click Anywhere to Restart!", 35, 45);
        document.addEventListener('click', function(){
            player.reset();
            ctx.clearRect(0,0,500,500);
        })
    }    
    if (this.y > 503){  //check if player reached bottom boundary
        this.y = 503;
    }
    if (this.x < 0){  //check if player reached left boundary
        this.x = 0;
    }
    if (this.x > 437){  //check of player reached right boundary
        this.x = 437;
    }
}

Player.prototype.update = function() {
    player.checkIfBoundaryIsReached();
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(a) {
    if (a == "up"){
        this.y -= this.v_step;
    }
    else if (a == "down"){
        this.y += this.v_step;
    }
    else if (a == "left"){
        this.x -= this.h_step;
    }
    else {
        this.x += this.h_step;
    }
}

Player.prototype.reset = function() {
    player.x = PLAYER_InitX ;
    player.y = PLAYER_InitY;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
randomlyGeneratedInitX1 = function(){
    return(Math.random()*100 - 200);
}

randomlyGeneratedInitX2 = function(){
    return(Math.random()*200 - 150);
}

randomlyGeneratedInitX3 = function(){
    return(Math.random()*300 - 250);
}

instantiateEnemy = function(){
    for (i=0; i<6; i++){
        switch(i){                           //parameters : x, y, speed
            case 0: allEnemies[i] = new Enemy(randomlyGeneratedInitX1(), ENEMY_TopY, 90);
            break;
            case 1: allEnemies[i] = new Enemy(randomlyGeneratedInitX2(), ENEMY_MiddleY, 80);
            break;
            case 2: allEnemies[i] = new Enemy(randomlyGeneratedInitX3(), ENEMY_BottomY, 70);
            break;
            case 3: allEnemies[i] = new Enemy(randomlyGeneratedInitX1(), ENEMY_TopY, 60);
            break;
            case 4: allEnemies[i] = new Enemy(randomlyGeneratedInitX2(), ENEMY_MiddleY, 50);
            break;
            case 5: allEnemies[i] = new Enemy(randomlyGeneratedInitX3(), ENEMY_BottomY, 40);
            break;
        }
    }
}

instantiateEnemy();

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}
);
