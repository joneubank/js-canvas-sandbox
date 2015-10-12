var Canvas = function(canvasId, resizeListenerOn) {
    resizeListenerOn = resizeListenerOn !== undefined ? resizeListenerOn : true;

    var canvas = {};

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

    //TODO: Remove this since the draw method will be publicly accessible now
    canvas.setDrawer = function(drawMethod) {
        canvas.draw = drawMethod;
    }

    //TODO: hud interactions (keystrokes to show/hide, make collapsable)
    canvas._setupHud = function() {
        // document.getElementById("hud").getElementsByClass("");
    }


    //TODO: Remove this since the canvas member will be publicly accessible now
    canvas.getElement = function() {
        return canvas._elem;
    }

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