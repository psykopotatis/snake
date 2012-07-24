/*
* EndScreen
*/
var EndScreen = Class.extend({
    init: function(game, scene, camera) {
        this.stars = starField({
            scene: scene,
            stars: 50000,
            size:3
        });
        this.planet = sphere({
            scene: scene,
            radius: 40,
            mesh: true,
            x: -40,
            y: -5,
        });
        
        $('#intro a').click(function() {
            $('#intro').hide('slow');
            game.setScreen(new GameScreen(game, scene, camera));    
        });
    },
    
    update: function() {
        this.stars.update();
        this.planet.update();
    }
});