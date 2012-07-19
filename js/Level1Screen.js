var level1Screen = function(game, scene) {
    var that = screen(game, scene);
    
    var X_MIN = -100;
    var X_MAX = 100;
    var Y_MIN = -20;
    var Y_MAX = SNAKE.Y_MAX - 16;
    
    that.setSize({x_min:X_MIN, x_max:X_MAX, y_min:Y_MIN, y_max:Y_MAX});
    var player;
    var fruit;
    var points;
    var fruitsEaten;
    var fruitsToEat = 15;  // Level goal
    var levelFinished;

    var superGetName = that.superior('getName');
    
    var initializeLevel = function() {
        // Show score board in upper left corner
        $('#info').show();
        // Remove all Mesh objects and create new
        that.clearLevel();  
        that.createWalls();
        player = that.createPlayer()
        fruit = that.createFruit()        
        // Reset score and fruits eaten
        points = 0;
        that.updateScore(points);
        fruitsEaten = 0;
        updateLevelGoal();
        levelFinished = false;
        $('#info .level').html('Level 1');
        alert(superGetName() + " 1");
    };
    
    var updateLevelGoal = function() {
        var current = fruitsToEat-fruitsEaten;
        if (current == 0) {
            levelFinished = true;
            $('#goal').html('Woo! Done! :D');
            $('#done').html('Well done! Level cleared! <a href="javascript:;">Play next?</a>').show('slow');
            $('#done a').click(function() {
                $('#done').hide('slow');
                game.setScreen(level2Screen(game, scene)); 
            });
        } else {
            $('#goal').html('Eat ' + (fruitsToEat-fruitsEaten) + ' fruits!');
        }
    };
    
    that.update = function() {
        if (! levelFinished) {
            fruit.update();
            player.update();
            
            that.checkBounds(player);
            if (player.collidesWith(fruit)) {
                fruitsEaten++;
                player.addBody(3);
                points += Math.round(fruit.getRadius() * 1000);
                that.updateScore(points);
                updateLevelGoal();
                scene.remove(fruit.getMesh());
                if (! levelFinished) {
                    fruit = that.createFruit();
                }
            }
        }
    };

    initializeLevel();
    
    return that;
};