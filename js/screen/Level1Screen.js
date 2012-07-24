var Level1Screen = Screen.extend({
    size: {x_min:-100, x_max:100, y_min:-40, y_max:40},
    
    init: function() {
        var nextLevel = new Level2Screen();
        this._super(this.size, nextLevel);
    },

    update: function() {
        this._super();
    }
});