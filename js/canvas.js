var Canvas = (function() {
    var _canvas  = null;
    var context = null;

    var resize = function() {
        _canvas.width = window.innerWidth;
        _canvas.height = window.innerHeight;
        draw(context);
    }

    var draw = function(context) {

    }

    /* Init Code */
    var init = function(id) {
        _canvas = document.getElementById(id);
        this.context = _canvas.getContext('2d');

        //Register resize event listener
        window.addEventListener('resize', resize, false);
        resize();
    }
    
    return {
        "init"          : init,
        "resize"        : resize,
        "draw"          : draw,

        "context"       : context
    }

})();



document.addEventListener(
        'DOMContentLoaded', 
        function() {
            Canvas.init('canvas');
        }, 
        false
    );