var levelXScreen = function(game, scene) {
    var that = screen(game, scene);
    
    var X_MIN = SNAKE.X_MIN - (SNAKE.X_MIN % 4);
    var X_MAX = SNAKE.X_MAX - 8;
    var Y_MIN = SNAKE.Y_MIN - (SNAKE.Y_MIN % 4);
    var Y_MAX = SNAKE.Y_MAX - SNAKE.TILE_SIZE;
        
    that.setSize({x_min:X_MIN, x_max:X_MAX, y_min:Y_MIN, y_max:Y_MAX});
    var player;
    var fruit;
    var points;

    var initializeLevel = function() {
        // Show score board in upper left corner
        $('#info').show();
        // Remove all Mesh objects and create new
        that.clearLevel();  
        that.createWalls();
        player = that.createPlayer();
        fruit = that.createPlanet();
        // Reset score and fruits eaten
        points = 0;
        that.updateScore(points);
        updateLevelGoal();
        $('#info .level').html('Level 3');        
    };
    
    var updateLevelGoal = function() {
        $('#goal').html('Infinity and beyond! :D');
    };
    
    that.update = function() {
        fruit.update();
        player.update();
        
        that.checkBounds(player);
        if (player.collidesWith(fruit)) {
            player.addBody(4);
            points += Math.round(fruit.getRadius() * 1000);
            that.updateScore(points);
            scene.remove(fruit.getMesh());
            fruit = that.createPlanet();
            
        }
    };

    initializeLevel();
    
    return that;
};