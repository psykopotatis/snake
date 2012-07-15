var Fruit = function(scene) {
    var that = {};
	
	/*
	* Creates random sized, colored sphere
	*/	
	var createSphere = function() {
		var radius = Math.random() * 20 + 5;  // Mininum radius = 5
		var position = getRandomPosition(radius);
		var segments = 30;
		var rings = 30;
		var color24 = Math.random()*255 << 16 | Math.random()*255 << 8 | Math.random()*255;
		
		var sphereMaterial =
			new THREE.MeshLambertMaterial({
				color: color24,
				wireframe: (Math.random() > 0.50 ? true : false)  // 50 % get wire frame
			});
				
		var sphere = new THREE.Mesh(
			new THREE.SphereGeometry(
				radius,
				segments,
				rings),
			sphereMaterial);
			
		sphere.position.x = position.x;
		sphere.position.y = position.y;
		sphere.radius = radius;
		
		scene.add(sphere);
		
		return sphere;
	};
	
	/*
	* Returns random (x, y) position minus fruit radius
	*/
	var getRandomPosition = function(radius) {
		var x = Math.floor(Math.random() * ((SNAKE.DISPLAY_WIDTH-radius)/2)) * (Math.random() > 0.5 ? -1 : 1);
		var y = Math.floor(Math.random() * ((SNAKE.DISPLAY_HEIGHT-radius)/2)) * (Math.random() > 0.5 ? -1 : 1);

		return {x:x, y:y};
	};
	
	/*
	* Moves fruit to random (x, y) position
	*/	
	var moveFruit = function() {
		var pos = getRandomPosition(fruit.radius);
		
		fruit.position.x = pos.x;
		fruit.position.y = pos.y;
	};
	
	/*
	* Creates a new fresh fruit
	*/	
	that.refresh = function() {
		fruit = createSphere();
	};
			
	/*
	* Update
	*/	
    that.update = function() {
		fruit.rotation.y += 0.01;
    };
	
	that.getPosition = function() { return fruit.position; }
	that.getRadius = function() { return fruit.radius; }
	that.getMesh = function() { return fruit; }
	
	var fruit = createSphere();
	
    return that;
};