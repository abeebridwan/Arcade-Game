var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime,
        id;
    var modal = document.getElementById('myModal'),
        span = document.getElementsByClassName("close")[0],
        replay = document.getElementById('btnreplay');

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    replay.addEventListener("click", function(){
           modal.style.display = "none";
            player.winner = false;
           id = win.requestAnimationFrame(main);
       });

    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

    
        update(dt);
        render();

        lastTime = now;


         if (player.winner === true ){
           win.cancelAnimationFrame(id);
           modal.style.display = "block";
         }else{
           id = win.requestAnimationFrame(main);
         };
    }

  
    span.addEventListener("click", function(){
           modal.style.display = "none";
       });

 
    window.addEventListener("click", function(){
      if (event.target == modal) {
          modal.style.display = "none";
      }
  });




    
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

   
    function update(dt) {
        updateEntities(dt);
      
    }

    
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

   
    function render() {
        
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

       
        ctx.clearRect(0,0,canvas.width,canvas.height)

       
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
        
    }


    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
