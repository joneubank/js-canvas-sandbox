var Canvas = (function() {
    var _canvas  = null;
    var _context = null;

    var _this = null;

    var draw = function(context) {

    }

    var redraw = function() {
        _this.draw(_context);
    }

    var resize = function() {
        _canvas.width = _canvas.parentElement.offsetWidth;
        _canvas.height = _canvas.parentElement.offsetHeight;
        _this.redraw();
    }

    var setDrawer = function(drawMethod) {
        _this.draw = drawMethod;
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
        "redraw"        : redraw,

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