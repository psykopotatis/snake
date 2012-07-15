/*
* Creates 30.000 random placed, rotating color-changing particles.
*/	
var Particles = function(scene) {
    var that = {};
	
	var geometry = new THREE.Geometry();
			
	for (i=0; i<30000; i++) {
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * 2000 - 1000;
		vertex.y = Math.random() * 2000 - 1000;
		vertex.z = Math.random() * 2000 - 1000;
		geometry.vertices.push(vertex);
	}
	
	var material = new THREE.ParticleBasicMaterial({size: 2});
	material.color.setHSV(1, 1, 1);

	var particles = new THREE.ParticleSystem(geometry, material);
	particles.rotation.x = Math.random() * 6;
	particles.rotation.y = Math.random() * 6;
	particles.rotation.z = Math.random() * 6;

	scene.add(particles);

	/*
	* Update
	*/	
    that.update = function() {		
		var time = Date.now() * 0.00001;
		particles.rotation.y = time;
		material.color.setHSV(time % 1, 1, 1);
    };
	
    return that;
};