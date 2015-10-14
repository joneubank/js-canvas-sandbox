/*************************************
 How to Use

canvas = Grids(canvas);
canvas.draw = canvas.grids.draw;
*************************************/
var Grids = function(canvas) {
    var grids = {};

	grids._data = [];
    grids._tileSize = 100;

	grids.draw = function(context, canvas) {
        if(grids._data) {
		  grids.drawQuadGrid(context, grids._data, grids._tileSize, grids._tileSize);
        }
	}

	grids.drawQuad = function (context, left, top, width, height, color) {
        color = typeof color !== undefined ? color : "#ffffff";
        context.fillStyle=color;
        context.fillRect(left, top, width, height);
    }

	grids.drawQuadGrid = function(context, grid, width, height) {
        for (xindex = 0; xindex < grid.length; xindex++) {
            var col = grid[xindex];
            for(yindex = 0; yindex < col.length; yindex++){
                grids.drawQuad(context, width*xindex, height*yindex, width, height, col[yindex]);
            }
        }
    }

    grids.regenerate = function(gridWidth, gridHeight) {
        gridWidth = typeof gridWidth !== 'undefined' ? gridWidth : grids.calculateGridWidth();
        gridHeight = typeof gridHeight !== 'undefined' ? gridHeight : grids.calculateGridHeight();

        grids._data = grids.randomColorGrid(gridWidth, gridHeight);
    }

    grids.calculateGridWidth = function() {
        return ((canvas._elem.width / grids._tileSize)|0)+1;
    }

    grids.calculateGridHeight = function() {
        return ((canvas._elem.height / grids._tileSize)|0)+1;
    }
    
    grids.randomColorGrid = function(width, height) {
        var grid = [];

        for (xindex = 0; xindex < width; xindex++) {
            var col = [];
            for(yindex = 0; yindex < height; yindex++){
                if(Color) 
                {
                    col[yindex] = Color.random();
                } else {
                    col[yindex] = "#fff";
                }
            }
            grid[xindex] = col;
        }

        return grid;
    }

    /***************
        Init Code 
     **************/
    grids.regenerate();
    canvas.grids = grids;
    return canvas;
};
