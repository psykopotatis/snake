/*
* Creates 30.000 random placed, rotating color-changing particles.
*/	
var starField = function(options) {
    var that = {};
    var scene = options.scene;
    var stars = options.stars;
    var size = options.size;
	
	var geometry = new THREE.Geometry();
			
	for (i=0; i<stars; i++) {
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * 2000 - 1000;
		vertex.y = Math.random() * 2000 - 1000;
		vertex.z = Math.random() * 2000 - 1000;
		geometry.vertices.push(vertex);
	}
	
	var material = new THREE.ParticleBasicMaterial({size: size});
	material.color.setHSV(1, 1, 1);

	var particles = new THREE.ParticleSystem(geometry, material);
	particles.rotation.x = Math.random() * 15;
	particles.rotation.y = Math.random() * 15;
	particles.rotation.z = Math.random() * 15;

	scene.add(particles);

	/*
	* Update
	*/	
    that.update = function() {		
		var time = Date.now() * 0.00001;
		particles.rotation.y = Date.now() * 0.00005;
		material.color.setHSV(time % 1, 1, 1);
    };
	
    return that;
};