var Shapes = function(canvas) {
    var shape = {};

    shape.circle = function (radius, posx, posy, fill) {
        var circle = {};
        circle.radius = radius;
        circle.x = posx;
        circle.y = posy;
        circle.fill = fill;
        circle.draw = function (context, offx, offy, zoom) 
        {
            offx = offx !== undefined ? offx : 0;
            offy = offy !== undefined ? offy : 0;
            zoom = zoom !== undefined ? zoom : 1;

            context.beginPath();
            context.arc(circle.x+offx, circle.y + offy, circle.radius*zoom, 0, 2 * Math.PI, false);
            context.fillStyle = circle.fill;
            context.fill();
        }
        return circle;
    };

    canvas.shapes = shape;

    return canvas;
}

var Canvas = function(canvasId, resizeListenerOn) {
    resizeListenerOn = resizeListenerOn !== undefined ? resizeListenerOn : true;

    var canvas = {};

    canvas.data = {};
    canvas._elem  = null;
    canvas._context = null;

    canvas._resizeListener = resizeListenerOn;

    canvas.draw = function(context, canvas) { }

    canvas.redraw = function() 
    {
        canvas._context.clearRect(0,0,canvas._elem.width,canvas._elem.height);
        canvas.draw(canvas._context, canvas);
    }

    canvas.resize = function() 
    {
        canvas._elem.width = canvas._elem.parentElement.offsetWidth;
        canvas._elem.height = canvas._elem.parentElement.offsetHeight;
        canvas.redraw();
    }


    //TODO: hud interactions (keystrokes to show/hide, make collapsable)
    canvas._setupHud = function() {
        // document.getElementById("hud").getElementsByClass("");
    }

    Shapes(canvas);

    /***************
        Init Code 
     **************/
    canvas._elem = document.getElementById(canvasId);
    canvas._context = canvas._elem.getContext('2d');

    //Register resize event listener
    window.addEventListener('resize', function() 
    {
        if(canvas._resizeListener) 
        {
            canvas.resize();
        }
    },
    false);
    canvas.resize();
    
    // _setupHud();
    
    return canvas;
};



// document.addEventListener(
//         'DOMContentLoaded', 
//         function() {
//             Canvas.init('canvas');
//         }, 
//         false
//     );