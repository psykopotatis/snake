var startGame = function() {
    var that = {};
    
    // Add Stats.js - https://github.com/mrdoob/stats.js
    var stats = new Stats();
    stats.domElement.style.position	= 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.right = '5px';
    document.body.appendChild(stats.domElement);
    
    var WIDTH = window.innerWidth - 5;
    var HEIGHT = window.innerHeight - 5;
    
    // Create a WebGL renderer
    var renderer = new THREE.WebGLRenderer({
        antialias: true	// to get smoother output?
    });
    renderer.setSize(WIDTH, HEIGHT);
    $('#container').append(renderer.domElement);
    
    // Set camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;
    var CAMERA_POSITION = 250;
    var TILE_SIZE = 4;
    // Camera yo
    var camera =
      new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR);
    // the camera starts at 0,0,0 so pull it back
    camera.position.z = CAMERA_POSITION;		
    camera.position.x = 15;	
    camera.position.y = 10;
        
    // Height is 2 x since (0, 0) is in the middle of the screen
    var DISPLAY_HEIGHT = 2 * CAMERA_POSITION * Math.tan(VIEW_ANGLE / 2 * (Math.PI / 180));
    var DISPLAY_WIDTH = DISPLAY_HEIGHT * (WIDTH / HEIGHT);
    
    var X_MAX = DISPLAY_WIDTH / 2;
    var X_MIN = 0 - (DISPLAY_WIDTH / 2);
    var Y_MAX = DISPLAY_HEIGHT / 2;
    var Y_MIN = 0 - (DISPLAY_HEIGHT / 2);
    
    // Global vars
    SNAKE = {};
    SNAKE.DISPLAY_WIDTH = DISPLAY_WIDTH;
    SNAKE.DISPLAY_HEIGHT = DISPLAY_HEIGHT;
    SNAKE.X_MAX = X_MAX;
    SNAKE.X_MIN = X_MIN;
    SNAKE.Y_MAX = Y_MAX;
    SNAKE.Y_MIN = Y_MIN;
    SNAKE.TILE_SIZE = 4;

    // Create foggy scene
    var scene = new THREE.Scene();
    camera.lookAt(scene.position);  // Look at scene bit from side
    scene.fog = new THREE.FogExp2( 0x000000, 0.0011);
    
    // Add the camera to the scene
    scene.add(camera);

    // Create point light
    var pointLight = new THREE.PointLight(0xFFFFFF);
    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;
    // add to the scene
    scene.add(pointLight);
    
    // Moar lights!
    var light = new THREE.DirectionalLight(Math.random() * 0xffffff);
    light.position.set(Math.random(), Math.random(), Math.random()).normalize();
    scene.add(light);
    var light = new THREE.DirectionalLight(Math.random() * 0xffffff);
    light.position.set(Math.random(), Math.random(), Math.random()).normalize();
    scene.add(light);
    
    // Draw a partial white grid
    var gridMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.2
    });
    // Horizontal lines
    var x_geometry = new THREE.Geometry();
    x_geometry.vertices.push(new THREE.Vector3(X_MIN, 0, 0));
    x_geometry.vertices.push(new THREE.Vector3(X_MAX, 0, 0));
    for (var y=2; y<Y_MAX; y=y+TILE_SIZE) {
        var line = new THREE.Line(x_geometry, gridMaterial);
        line.position.y = y;
        scene.add(line);
    }
    // Vertical lines
    var y_geometry = new THREE.Geometry();
    y_geometry.vertices.push(new THREE.Vector3(0, Y_MAX, 0));
    y_geometry.vertices.push(new THREE.Vector3(0, Y_MIN, 0));
    for (var x=2; x<X_MAX; x=x+TILE_SIZE) {
        var line = new THREE.Line(y_geometry, gridMaterial);
        line.position.x = x;
        scene.add(line);
    }
    
    $('#intro').show();
    
    /*
    // Camera movement <------------------------- Disabled! 
    var mouseX;
    var mouseY;
    var mouseWheel = 0;    
    var moveCamera = false;			

    $('canvas').mousemove(function() {
        mouseX = event.clientX - (WIDTH/2);
        mouseY = event.clientY - (HEIGHT/2);
    });

    $('canvas').mousedown(function() {
            document.body.style.cursor = "move";
            moveCamera = true;
            return false;  // Disable text selection on the canvas
        });

    $('canvas').mouseup(function() {
        document.body.style.cursor = "default";
        moveCamera = false;
    });

    $('canvas').mousewheel(function(objEvent, intDelta){
        mouseWheel += intDelta;
    });
    */
    
    var screen = new IntroScreen(that, scene, camera);
    
    that.setScreen = function(newScreen) {
        screen = newScreen;
    };
    
    var nextScreen = function() {
        $('#gameover').hide('slow');
        that.setScreen(new GameScreen(that, scene, camera));    
    };
    
    $('#gameover a').click(function() {
        nextScreen();
    }); 
    
    // Updates at 60 FPS
    var update = function() {							
        requestAnimationFrame(update);
        
        screen.update();

        /*
        // Move camera   <----------------------- disabled!
        if (moveCamera) {
            camera.position.x += (mouseX - camera.position.x) * 0.01;
            camera.position.y += (- mouseY - camera.position.y) * 0.01;
            camera.lookAt(scene.position);
        }
        
        // Zoom camera
        camera.position.z = CAMERA_POSITION + mouseWheel;
        */
        
        renderer.render(scene, camera);        
        stats.update();
    };
    
    requestAnimationFrame(update);
    
    return that;
};