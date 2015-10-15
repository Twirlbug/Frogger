
var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        patterns = {},
        lastTime;

    canvas.width = 705;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
		
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
		console.log(playing);
        if (playing===1){render();}

        lastTime = now;
        win.requestAnimationFrame(main);
    };

    function init() {

        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
				'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 7,
            numCols = 7,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    function reset() {
        // noop
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
		'images/char-cat-girl.png',
		'images/char-horn-girl.png',
		'images/char-pink-girl.png',
		'images/char-princess-girl.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);

var playing = 1;

//stops the engine showing
var stopit = function(){
	playing=0;
	ctx.clearRect(0, 0, 1200, 1000);
	console.log("clear");
	//return;
}

//turns the engine rendering on
var startit = function(){
	playing=1;
	console.log("On");
}





