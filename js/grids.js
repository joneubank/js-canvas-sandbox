var Grids = (function() {

    var _canvas = null;

	var _grid = null;
    var _tileSize = 10;

	var draw = function(context) {
		drawQuadGrid(context, _grid, _tileSize, _tileSize);
	}

	var drawQuad = function (context, left, top, width, height, color) {
        color = typeof color !== 'undefined' ? color : "#ffffff";
        context.fillStyle=color;
        context.fillRect(left, top, width, height);
    }

	var drawQuadGrid = function(context, grid, width, height) {
        for (xindex = 0; xindex < grid.length; xindex++) {
            var col = grid[xindex];
            for(yindex = 0; yindex < col.length; yindex++){
                drawQuad(context, width*xindex, height*yindex, width, height, col[yindex]);
            }
        }
    }

    var regenerate = function(gridWidth, gridHeight) {
        gridWidth = typeof gridWidth !== 'undefined' ? gridWidth : calculateGridWidth();
        gridHeight = typeof gridHeight !== 'undefined' ? gridHeight : calculateGridHeight();

        _grid = randomColorGrid(gridWidth, gridHeight);
    }

    var calculateGridWidth = function() {
        if (_canvas) {
            return ((_canvas.get().width / _tileSize)|0)+1;
        } else {
            return 100;
        }
    }

    var calculateGridHeight = function() {
        if(_canvas) {
            return ((_canvas.get().height / _tileSize)|0)+1;
        } else {
            return 100;
        }
    }
    
    var setTileSize = function(size) {
        if(size) {
            _tileSize = size;
        }
    }


    var randColor = function () {
        return "#"+("000000" + ((1<<24)*Math.random()|0).toString(16)).substr(-6);
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


    var init = function(tileSize, gridSize) {
        this.setTileSize(tileSize);
    	this.regenerate(gridSize);
    }


    var attach = function(canvas) {
    	canvas.draw = draw;
        _canvas = canvas;
    }


 	return {
        "init"			: init,
        "attach"		: attach,

        "draw"			: draw,
        "drawQuad"      : drawQuad,
        "drawQuadGrid"  : drawQuadGrid,

        "regenerate"    : regenerate,
        "setTileSize"   : setTileSize
    }

})();

// document.addEventListener(
// 	    'DOMContentLoaded', 
// 	    function() {
// 	        Grids.init(125);
// 	        Grids.attach(Canvas);
// 	    }, 
// 	    false
// 	);