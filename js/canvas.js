var Color = 
{
    "random" : function() 
    {
        return "#"+("000000" + ((1<<24)*Math.random()|0).toString(16)).substr(-6);
    },

    /*
    * Invert takes an input of the form '#xxx' or '#xxxxxx' where x is a hex digit
    * Returns the inverted color from the value entered in the same format, 
    *   or '#fff' if the input format was wrong or an error occurs
    */
    "invert" : function(color) {
        var output = "#fff";

        if(color.length == 7) {
            var temp = color.substr(-6);
            var r = parseInt(temp.substr(0,2), 16);
            var g = parseInt(temp.substr(2,2), 16);
            var b = parseInt(temp.substr(4,2), 16);

            var invR = 255-r;
            var invG = 255-g;
            var invB = 255-b;

            output = "#" + ("00"+invR.toString(16)).substr(-2) + ("00"+invG.toString(16)).substr(-2) + ("00"+invB.toString(16)).substr(-2);
        } else if (color.length == 4) {
            var temp = color.substr(-3);
            var r = parseInt(temp.substr(0,1), 16);
            var g = parseInt(temp.substr(1,1), 16);
            var b = parseInt(temp.substr(2,1), 16);

            var invR = 15-r;
            var invG = 15-g;
            var invB = 15-b;

            output = "#" + invR.toString(16) + invG.toString(16) + invB.toString(16);
        }

        return output;
    }
}

var Shapes = {

    "circle" : function (radius, posx, posy, fill) {
        var circle = {};
        circle.radius = radius;
        circle.x = posx;
        circle.y = posy;
        circle.fill = fill;
        circle.draw = function (context, canvas, offx, offy, zoom) 
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
    }
}

var Util = {
    "circToCart" : function (radians, radius) {
        return {
            "x" : radius * Math.cos(radians),
            "y" : radius * Math.sin(radians)
        };
    }
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