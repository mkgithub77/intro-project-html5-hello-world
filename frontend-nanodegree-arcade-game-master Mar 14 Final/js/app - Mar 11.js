// Enemies our player must avoid
var Enemy = function(init_x,x,y,speedRate,id) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.initx = init_x;
    this.x = x;
    this.y = y;
    this.speed = speedRate;
    this.id = id;
    this.width = 101;
    this.height = 171;
   // allEnemies.push(this);
}

/*function Enemy(init_x,x,y,speedRate) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.initx = init_x;
    this.x = x;
    this.y = y;
    this.speed = speedRate;
}
*/

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    if (this.x > 605){
       this.x = this.initx;
   }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 205;
    this.y = 425;
    this.speed = -20;
    this.h_step = 30;
    this.v_step = 20;
    this.width = 101;
    this.height = 171;

}

Player.prototype.update = function() {
    if (this.y <= 0){
        console.log('You Win!');
       // this.x = 205;
        this.y = 0;//425;
        ctx.font = "30px Arial";
        ctx.fillText("You Win!",10,50);
     }

    if (this.y > 425){
        this.y = 425;
    }

    if (this.x < 0){
        this.x = 0;
    }

    if (this.x > 404){
        this.x = 404;
    }
    testPlayerEnemyCollision(this, enemy1);
//       console.log('hello');
//    }
}



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(a) {

    if (a === "up"){
        this.y -= this.v_step;
    }
    else if (a === "down"){
        this.y += this.v_step;
    }
    else if (a === "left"){
        this.x -= this.h_step;
    }
    else {
        this.x += this.h_step;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-60, -60, 65, 40, 'E1');
var enemy2 = new Enemy(0, 0, 145, 100, 'E2');
var enemy3 = new Enemy(-300, -300, 230, 60, 'E3');

var allEnemies = []; //mk added
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

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

testPlayerEnemyCollision = function(player, enemy1){
    /*console.log(enemy1.x);
    return player.x <= enemy1.x + enemy1.width
        && enemy1.x <= player.x + player.width
        && player.y <= enemy1.y + enemy1.height
        && enemy1.x <= player.x + player.width;
        */
        console.log(player.width);
}