var Grids = (function() {

	var _grid = null;

	var draw = function(context) {
		drawQuadGrid(context, _grid, 50, 50);
	}

	var drawQuad = function (context, left, top, width, height, color) {
        color = typeof color !== 'undefined' ? color : "#FFFFFF";
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
    	_grid = randomColorGrid(100,100);
    }


    var attach = function(canvas) {
    	canvas.draw = draw;
    }


 	return {
        "init"			: init,
        "attach"		: attach,

        "draw"			: draw,
        "drawQuad"      : drawQuad,
        "drawQuadGrid"  : drawQuadGrid
    }

})();

// document.addEventListener(
// 	    'DOMContentLoaded', 
// 	    function() {
// 	        Grids.init();
// 	        Grids.attach(Canvas);
// 	    }, 
// 	    false
// 	);