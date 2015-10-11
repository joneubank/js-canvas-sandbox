# Sandbox: Canvas and JS

Project for experimental/test code for HTML5 Canvas drawing and JavaScript Controllers.

## Live Links
* [Canvas Sandbox Home](http://joneubank.com/things/canvas)
* [Colour Grids](http://joneubank.com/things/canvas/grids)

## Example Canvas Library Use
```
<canvas id="canvas" class="fullscreen"></canvas>

<script src="js/canvas.js" type="text/javascript"></script>
<script type="text/javascript">
    document.addEventListener(
        'DOMContentLoaded', 
        function() {
            //Initialize our canvas code
            Canvas.init('canvas');

            //Call a JS module that will run on the canvas, using Grids as an example
            Grids.init(250);
            Grids.attach(Canvas);
            
            //Call resize to force resize, consequently drawing the module just attached
            Canvas.resize();            
        }, 
        false
    );
</script>
```