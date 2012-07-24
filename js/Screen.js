/*
* Screen
*/
var screen = function(game, scene) {
    var that = {};

    var X_MIN, X_MAX, Y_MIN, Y_MAX;
    var xPositions = [];
    var yPositions = [];
    
    /*
    * Sets level size and valid fruit positions
    */
    that.setSize = function(size) {
        X_MIN = size.x_min;
        X_MAX = size.x_max;
        Y_MIN = size.y_min;
        Y_MAX = size.y_max;

        xPositions = [];
        yPositions = [];
        
        for (var x=X_MIN+SNAKE.TILE_SIZE; x<X_MAX; x=x+SNAKE.TILE_SIZE) {
            xPositions.push(x);
        }
        
        for (var y=Y_MIN+SNAKE.TILE_SIZE; y<Y_MAX; y=y+SNAKE.TILE_SIZE) {
            yPositions.push(y);
        }
    }
    
    /*
    * Creates a random colored bit of wall at position (x, y)
    */
    var createWall = function(position) {
        var color24 = Math.random()*255 << 16 | Math.random()*255 << 8 | Math.random()*255;
        var geometry = new THREE.CubeGeometry(SNAKE.TILE_SIZE, SNAKE.TILE_SIZE, Math.random() * SNAKE.TILE_SIZE + 2);
        var material = new THREE.MeshLambertMaterial({color: color24});
        var wallBit = new THREE.Mesh(geometry, material);
        wallBit.position.x = position.x;
        wallBit.position.y = position.y;
        scene.add(wallBit);
    };
    
    /*
    * Creates a random colored square
    */
    that.createWalls = function() {
        // Top, bottom wall
        for (var x=X_MIN; x<X_MAX; x=x+SNAKE.TILE_SIZE) {
            createWall({x:x, y:Y_MAX});
            createWall({x:x, y:Y_MIN});
        }
        // Left, right wall
        for (var y=Y_MIN; y<Y_MAX; y=y+SNAKE.TILE_SIZE) {
            createWall({x:X_MIN, y:y});
            createWall({x:X_MAX, y:y});
        }    
    };
    
    that.createPlayer = function() {
        return Player(scene, {x:40, y:20});  // % 4 == 0
    };
    
    var getRandomPosition = function() {
        var x = xPositions[Math.round(Math.random() * (xPositions.length-1))];
        var y = yPositions[Math.round(Math.random() * (yPositions.length-1))];

        return {x:x, y:y};            
    };
    
    that.createFruit = function() {
        return smallSphere(scene, getRandomPosition());
    };
    
    that.createPlanet = function() {
        return planet(scene);
    }
    
    that.checkBounds = function(player) {
        var pos = player.getPosition();
        
        if (pos.x < (X_MIN+SNAKE.TILE_SIZE) || pos.x > (X_MAX-SNAKE.TILE_SIZE) || 
            pos.y < (Y_MIN+SNAKE.TILE_SIZE) || pos.y > Y_MAX) {
            player.die();
        }
    };
    
    /*
    * Pad zeros. (1123, 9) Returns 000001123
    */
    var zeroPad = function(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    };
    
    that.updateScore = function(points) {
        $('.score').html(zeroPad(points, 9));
    };

    /*
    * Removes all Mesh objects from scene
    */    
     that.clearLevel = function() {
        var length = scene.children.length;
        var removeMe = [];
        for (var i=0; i<length; i++) {
            var child = scene.children[i];
            if (child instanceof THREE.Mesh) {
                removeMe.push(child);
            }
        }
        for (var i=0; i<removeMe.length; i++) {
            scene.remove(removeMe[i]);
        }
    };   
    
    that.getName = function() {
        return 'Screen';
    };
    
    return that;
};

/*
* Enable super method calls.
*/
/*
Object.method('superior', function(name) {
    var that = this;
    var method = that[name];
    return function() {
        method.apply(that, argruments);
    };
});
*/