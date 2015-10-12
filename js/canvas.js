var Canvas = function(canvasId, resizeListenerOn) {
    resizeListenerOn = resizeListenerOn !== undefined ? resizeListenerOn : true;

    var ob = {};//ob is short for object

    ob._elem  = null;
    ob._context = null;

    ob._resizeListener = resizeListenerOn;

    ob.draw = function(context, canvas) { }

    ob.redraw = function() 
    {
        ob._context.clearRect(0,0,ob._elem.width,ob._elem.height);
        ob.draw(ob._context, ob);
    }

    ob.resize = function() 
    {
        ob._elem.width = ob._elem.parentElement.offsetWidth;
        ob._elem.height = ob._elem.parentElement.offsetHeight;
        ob.redraw();
    }

    //TODO: Remove this since the draw method will be publicly accessible now
    ob.setDrawer = function(drawMethod) {
        ob.draw = drawMethod;
    }

    //TODO: hud interactions (keystrokes to show/hide, make collapsable)
    ob._setupHud = function() {
        // document.getElementById("hud").getElementsByClass("");
    }


    //TODO: Remove this since the canvas member will be publicly accessible now
    ob.getElement = function() {
        return ob._elem;
    }

    /***************
        Init Code 
     **************/
    ob._elem = document.getElementById(canvasId);
    ob._context = ob._elem.getContext('2d');

    //Register resize event listener
    window.addEventListener('resize', function() 
    {
        if(ob._resizeListener) 
        {
            ob.resize();
        }
    },
    false);
    ob.resize();
    
    // _setupHud();
    
    return ob;
};



// document.addEventListener(
//         'DOMContentLoaded', 
//         function() {
//             Canvas.init('canvas');
//         }, 
//         false
//     );