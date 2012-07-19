var introScreen = function(game, scene) {
    var that = screen(game, scene);
    
    that.update = function() {
        
    }
    
    $('#intro a').click(function() {
        $('#intro').hide('slow');
        game.setScreen(level1Screen(game, scene));    
    });
    
    return that;
};