
var Enemy = function() {
    this.xRange = [-300, 750];
    this.possibleY = [60, 140, 220, 300];
    this.speedRange = [150, 600];

    this.sprite = 'images/enemy-bug.png';

    this.reset();
}

Enemy.prototype.reset = function() {
    var startPos = this.xRange[0];

    this.x = startPos;
    this.y = this.getRandomY();
    this.speed = this.getRandomSpeed();
}

Enemy.prototype.update = function(dt) {
    var maxPos = this.xRange[1];
    this.x += this.speed * dt;

    if (this.x > maxPos) {
        this.reset();
    }
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.getRandomY = function() {
    return this.possibleY[Math.floor(Math.random() * this.possibleY.length)];
}

Enemy.prototype.getRandomSpeed = function() {
    var minSpeed = this.speedRange[0],
        maxSpeed = this.speedRange[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
}



var Player = function() {
    this.xRange = [-2, 402];
    this.yRange = [-20, 380];
    // handles the player sprite selection varried by the number 
	if (playersprite ===0){
		this.sprite = 'images/char-boy.png';
		}else if (playersprite===1){
			this.sprite = 'images/char-cat-girl.png';
			} else if(playersprite===2){
				this.sprite = 'images/char-horn-girl.png';
				}else if(playersprite===3){
					this.sprite = 'images/char-pink-girl.png';
						}else {this.sprite = 'images/char-princess-girl.png';}
	
    this.reset();
}

Player.prototype.update = function() {
    this.checkCollisions();
}

Player.prototype.checkCollisions = function() {
    if (this.y == -20) {
        // player is on water, reset
        //the player is reset and the score is incremented
		//window.location="Game Over Win.html";
		score++;
		document.getElementById("printscore").innerHTML = "Score: " +score;
		document.getElementById("finalScore").innerHTML = "You scored " +score + "!";
		//console.log(score);
		if (incremental===1){
			//adds an enemy if the stages are incremental
			newEnemy(); 
		}
		this.reset();
                
    } else if (this.y >= 60 && this.y <= 220) {
        var self = this;
        // player is on road rows, check collisions
        // loop through each bug
        allEnemies.forEach(function(enemy) {
            // is the bug on the same row as the player?
            if (enemy.y == self.y) {
                // is the bug on the player?
                if (enemy.x >= player.x - 30 && enemy.x <= player.x + 30) {
                    self.reset();
					livesleft--;
					document.getElementById("lives").innerHTML = "Lives: " +livesleft;//reduce lives counter
					//ends the games if no lives are remaining
					if (livesleft<=0){
					stopit();//hides the engines out put and opens the loosing screen
					document.getElementById('loss').style.display = "block";
					document.getElementById('scoring').style.display = "none";
				//window.location="Game Over Loss.html";
				}
                }
            }
        });
    }
}

Player.prototype.reset = function() {
    this.x = 300;
    this.y = 460;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= (this.x - 101 < this.xRange[0]) ? 0 : 101;
    } else if (key === 'right') {
        this.x += (this.x + 101 > this.xRange[1]) ? 0 : 101;
    } else if (key === 'up') {
        this.y -= (this.y - 80 < this.yRange[0]) ? 0 : 80;
    } else if (key === 'down') {
        this.y += (this.y + 80 > this.yRange[1]) ? 0 : 80;
    }
}

document.addEventListener('keyup', function(e) {
// added support for wasd keys
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
		87: 'up',
		65: 'left',
		83: 'down',
		68: 'right'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// creates a new enemy to add to the current enemies
var newEnemy = function(){
	var baby = new Enemy();
	allEnemies.push(baby);
}


//initialize variables 
var playersprite=0;
var EnemyCount =1;
var gamestarted=0;
var incremental = 0;
var player =null;
var allEnemies = null;
var score = 0; 
var livesleft=3;

//sets the sprite to the one selected by the player
var spritechoice= function(){
playersprite = document.getElementById("selecter").selectedIndex;
 //console.log(playersprite);

}

// official begining the game and switching off the settings 
var beginGame=function(){

//creates the player and the enemies
allEnemies = new Array();
 player=new Player ();	

//resets the scores and lives	
score =0; 
livesleft=document.getElementById("life").value;
document.getElementById("printscore").innerHTML = "Score: " +score;
document.getElementById("finalScore").innerHTML = "You scored " +score + " points!";
document.getElementById("lives").innerHTML = "Lives: " +livesleft;

//Changes over from vieing the settings to viewing the score and the game
document.getElementById('settingspage').style.display = "none";
document.getElementById('game').style.display = "block";
document.getElementById('scoring').style.display = "block";


//retrieves the enemy count and populates the array for the enemies
EnemyCount = document.getElementById("EnemyNum").value;
for (i=0; i<EnemyCount; i++){
newEnemy();}


// engine start
var NewScript=document.createElement('script')
NewScript.src="engine.js"
document.body.appendChild(NewScript);

}

//adds one bug each turn
var IncrementMode = function(){
	incremental=1;
	beginGame();
}


//restarts the game with changing what is displayed
var restart= function(){
	document.getElementById('loss').style.display = "none";
	document.getElementById('settingspage').style.display = "block";
	document.getElementById('game').style.display = "none";
	document.getElementById('scoring').style.display = "none";
	location.reload();
}
