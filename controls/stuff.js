var Stuff = function(canvas, control) {
    var stuff = {};

    canvas.stuff = stuff;
    
    /*
    * Circle Properties
    */
    stuff.speed = 1000;
    
    stuff.circle = Shapes.circle(50, canvas._elem.width/2, canvas._elem.height/2, Color.random());
    stuff.centerCircle = function()
    {
    	stuff.circle.x = canvas._elem.width/2;
    	stuff.circle.y = canvas._elem.height/2;
    }
    
    stuff.move = function(x, y) 
    {
    	stuff.circle.x = stuff.circle.x + x;
    	stuff.circle.y = stuff.circle.y + y;
    }


    /*
    * Setup Inputs
    * - First Draft Input code, will be useful for keydown events
    */
	var KEY = control.KEY; //For typing and reading convenience

    stuff.inputs = {};
    stuff.inputs.reset = function() {
    	stuff.inputs.left 	= 0;
	    stuff.inputs.right 	= 0;
	    stuff.inputs.up 	= 0;
	    stuff.inputs.down 	= 0;
    	stuff.inputs.center = false;
    }
    stuff.inputs.reset();

    stuff.inputs.update = function()
    {
    	stuff.inputs.left 	= control.pressed(KEY.LEFT)		? 1 : 0;
    	stuff.inputs.right  = control.pressed(KEY.RIGHT)	? 1 : 0;
    	stuff.inputs.up		= control.pressed(KEY.UP)		? 1 : 0;
    	stuff.inputs.down	= control.pressed(KEY.DOWN)		? 1 : 0;
    }

    stuff.inputs.apply = function(time) {
    	//check for reset requested, if found, center circle
    	if(stuff.inputs.center) {stuff.centerCircle();}

    	//move based on keys pressed
    	var x = stuff.speed * time / 1000 * (-1 * stuff.inputs.left + stuff.inputs.right);
    	var y = stuff.speed * time / 1000 * (-1 * stuff.inputs.up + stuff.inputs.down);
    	if(x != 0  || y != 0) { 
    		stuff.move(x,y);
    		// console.log("(" + x + "," + y + ")");
    	}


    }

	control.keydown = function(event) 
	{
		switch(event.keyCode) {
			case KEY.SPACE:	stuff.inputs.center	= true; stuff.circle.fill = Color.random(); console.log("BACK TO CENTER!!!"); break;
		}
	}


    stuff.draw = function(context, canvas, camera)
    {
    	stuff.circle.draw(context, canvas, camera);
    }

    stuff.update = function(canvas, loop)
    {
    	stuff.inputs.update();
    	stuff.inputs.apply(loop._stepInterval);
    	stuff.inputs.reset();
    }

    return canvas;
}