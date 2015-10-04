var Canvas = (function() {
    var _canvas  = null;
    var _context = null;

    var _grid = null;

    var startingDraw = function() {
        drawQuadGrid(_grid,25, 25);
    }


    var resize = function() {
        _canvas.width = window.innerWidth;
        _canvas.height = window.innerHeight;
        startingDraw();
    }


    var randColor = function () {
        return "#"+((1<<24)*Math.random()|0).toString(16);
    }


    var drawQuad = function (left, top, width, height, color) {
        color = typeof color !== 'undefined' ? color : "#FFFFFF";
        _context.fillStyle=color;
        _context.fillRect(left, top, width, height);
    }


    var drawQuadGrid = function(grid, width, height) {
        for (xindex = 0; xindex < grid.length; xindex++) {
            var col = grid[xindex];
            for(yindex = 0; yindex < col.length; yindex++){
                drawQuad(width*xindex, height*yindex, width, height, col[yindex]);
            }
        }
    }


    var randomColorGrid = function(width, height) {
        var grid = [];

        for (xindex = 0; xindex < width; xindex++) {
            var col = [];
            for(yindex = 0; yindex < height; yindex++){
                col[yindex] = randColor();
            }
            grid[xindex] = col;
        }

        return grid;
    }

    /* Init Code */
    var init = function(id) {
        _canvas = document.getElementById(id);
        _context = _canvas.getContext('2d');

        _grid = randomColorGrid(100,100);

        //Register resize event listener
        window.addEventListener('resize', resize, false);
        resize();
    }
    
    return {
        "init"      : init,
        "resize"    : resize,

        "drawQuad"      : drawQuad,
        "drawQuadGrid"  : drawQuadGrid
    }

})();



document.addEventListener(
        'DOMContentLoaded', 
        function() {
            Canvas.init('canvas')
        }, 
        false
    );