var Canvas = (function() {
    var _canvas  = null;
    var _context = null;

    var _this = null;

    var draw = function(context) {

    }

    var resize = function() {
        _canvas.width = window.innerWidth;
        _canvas.height = window.innerHeight;
        _this.draw(_context);
    }

    var _setupHud = function() {
        document.getElementById("hud").getElementsByClass("")
    }

    var getElement = function() {
        return _canvas;
    }

    /* Init Code */
    var init = function(id) {
        _this = this;

        _canvas = document.getElementById(id);
        _context = _canvas.getContext('2d');

        //Register resize event listener
        window.addEventListener('resize', function(){
            resize();
        }, false);
        _this.resize();

        // _setupHud();
    }
    
    return {
        "init"          : init,
        "resize"        : resize,
        "draw"          : draw,

        "get"           : getElement
    }

})();



// document.addEventListener(
//         'DOMContentLoaded', 
//         function() {
//             Canvas.init('canvas');
//         }, 
//         false
//     );