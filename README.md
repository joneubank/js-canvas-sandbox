# Sandbox: Canvas and JS

Project for experimental/test code for HTML5 Canvas drawing and JavaScript Controllers.

## Live Links
* [Canvas Sandbox Home](http://joneubank.com/things/canvas)
* [Colour Grids](http://joneubank.com/things/canvas/grids)

## Canvas.js
The Canvas is the central focus of this project. The canvas object should be included first and subsequent modules that intend to draw to it should attach themselves to it.

Important functionality provided:
* initializes 2d context in a canvas specified by id.
* provides a draw(context) method that can be overwritten by another module. When an Canvas.draw() is called the attached module will be passed the context of the canvas to draw
* sets up a window resize listener, will call the resize() method which updates the canvas dom element dimensions and redraws the canvas content

#### Methods
* resize()
Updates the Dimensions of the canvas element to take up the entire dimensions of its parent element

#### Sample
An example for setting up a fullscreen canvas using this module, then attaching the Grids module that will draw to it:
```
<canvas id="canvas"></canvas>

<script src="js/canvas.js" type="text/javascript"></script>
<script type="text/javascript">
    document.addEventListener(
        'DOMContentLoaded', 
        function() {
            //Initialize our canvas code
            Canvas.init('canvas');

            //Call a JS module that will run on the canvas, using Grids as an example
            Grids.attach(Canvas);
            Grids.init(250);
            
            //Call resize to force resize, consequently drawing the module just attached
            Canvas.resize();            
        }, 
        false
    );
</script>
```

## Grids.js
Simple drawing and tileset generation exercise. Generates a grid (2d-array) of colors and then displays them across the full canvas.

The current setup generates completely random colours and only allows control over tile size. Future improvements will introduce generating grids within a pallette of selected colors, rotating angles and generating plaids.

The sample code for Canvas.js shows a demo initialiation of the Grids module.

#### Methods
* init(tileSize, gridSize)

tileSize - size in pixels of each grid square to be drawn
gridSize - if left blank, this will be calculated based on the canvas size.

* regenerate(gridWidth, gridHeight)

Geneartes a completely new Grid. Does not immediately redraw - consider calling Canvas.resize()
If either parameter is left blank it will be calculated based on the canvas current dimensions

* setTileSize(size)

Sets the size that tiles will be drawn at. Does not immediately redraw - consider calling Canvas.resize()

## HUD
Styles are in place to draw a semi transparent fixed position layer over the canvas. 

To include HUD panels, add the following HTML above the canvas code:
```
<div id="hud">
	<div class="top-left">
		Content in Top Left. There is a maximum size of 40% screen height/width. Overflow will generate scroll bars.
	</div>
    <div class="bottom-right nomax">
    	Content in bottom-right. This panel can expand as large as required (no max size).
    </div>
</div>
```
`top-right` and `bottom-left` panels are also defined through css classes.
