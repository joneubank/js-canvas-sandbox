var Grids = (function() {

	var _canvas = null;
	var _context = null;

	var _grid = null;

	var _draw = function(context) {
		drawQuadGrid(_grid, 50, 50);
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


    var randColor = function () {
        return "#"+((1<<24)*Math.random()|0).toString(16);
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


    var init = function(canvas) {
    	_canvas = canvas;
    	_context = _canvas.context;

    	_grid = randomColorGrid(100,100);
    	_canvas.draw = _draw(_context);
    }

 	return {
        "init"			: init,

        "drawQuad"      : drawQuad,
        "drawQuadGrid"  : drawQuadGrid
    }

})();

document.addEventListener(
	    'DOMContentLoaded', 
	    function() {
	        Grids.init(Canvas);
	    }, 
	    false
	);