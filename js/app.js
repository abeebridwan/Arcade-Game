// Enemies our player must avoid
var Enemy = function(speed, location) {
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.y = location - 20;
    this.x = -50;  // first start position
    this.end = 101 * 5;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x < this.end ){
      this.x += this.speed * dt;
    }else{
      this.x = -90;   // starting position after the first time
    }
};

// for rendering enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//  player class
var Myman = function() {
  this.sprite = 'images/char-boy.png';
  this.moveX = 101;
  this.moveY = 83;
  this.x  = this.moveX * 2;
  this.y = this.moveY * 5 ;
  this.winner = false;
};

Myman.prototype.update = function() {
for(enemy of allEnemies){
  if(this.y-20 == enemy.y && (enemy.x + enemy.speed/4 > this.x && enemy.x < this.x + this.moveX/2)){
    this.x = this.moveX * 2;
    this.y = this.moveY * 5;
    };

    if (this.y <= this.moveY-35 ){
      this.winner = true;
      this.x = this.moveX * 2;
      this.y = this.moveY * 5;
    };
  };
};


Myman.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Myman.prototype.handleInput = function(input) {
  switch (input) {
    case 'left':
        if(this.x <= (this.moveX/2)){
            // do nothing
        }else {
          this.x -= this.moveX;
        };
        break;
    case 'right':
        if(this.x >= (this.moveX*4)){
            // do nothing
        }else {
          this.x += this.moveX;
        };
        break;
    case 'up':
        if(this.y <= (this.moveY/5)){
            // do nothing
        }else {
          this.y -= this.moveY ;
        };
        break;
  case 'down':
        if(this.y >= (this.moveY*5)){
          // do nothing
        }else {
          this.y +=  this.moveY ;
        };
        break;
  };
};
// objects Instantiated
var player = new Myman();
var allEnemies = [];
allEnemies[0] = new Enemy(100, 83);
allEnemies[1] = new Enemy(750, 166);
allEnemies[2] = new Enemy(50, 249);
allEnemies[3] = new Enemy(300, 83);
allEnemies[4] = new Enemy(100, 166);
allEnemies[5] = new Enemy(30, 249);
allEnemies[6] = new Enemy(85, 166);
allEnemies[7] = new Enemy(500, 83);
allEnemies[8] = new Enemy(10, 249);


// This listens for key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
