var Control = function(canvas) {

    var control = {};

    canvas.control = control;

    /* -------------- --
    *    CONSTANTS
    * --------------- */

    var KEY = control.KEY = {
	    BACKSPACE: 8,
	    TAB:       9,
	    RETURN:   13,
	    CONTROL:  17,
	    ESC:      27,
	    SPACE:    32,
	    PAGEUP:   33,
	    PAGEDOWN: 34,
	    END:      35,
	    HOME:     36,
	    LEFT:     37,
	    UP:       38,
	    RIGHT:    39,
	    DOWN:     40,
	    INSERT:   45,
	    DELETE:   46,
	    ZERO:     48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
	    A:        65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
	    F1: 	  112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123,
	    TILDA:    192
	};

	/* ---------------------- --
	*      EVENT HANDLING
	*  ---------------------- */

    control.keydown 	= function(event) {}
    control.keyup 		= function(event) {}
    control.click 		= function(event) {}
    control.mousemove 	= function(event) {}
    control.touchstart = function(event) {}
    control.touchmove 	= function(event) {}

    //Attach Listeners
	document.addEventListener('keydown',    onkeydown,    false);
  	document.addEventListener('keyup',      onkeyup,      false);
 
    canvas._elem.addEventListener('click',      	onclick,      false);
    canvas._elem.addEventListener('mousemove',   	onmousemove,  false);
    canvas._elem.addEventListener('touchstart', 	ontouchstart, false);
    canvas._elem.addEventListener('touchmove',  	ontouchmove,  false);

	function onkeydown(event) 
	{
		control._pressed[event.keyCode] = true;
		control.keydown(event);
		if(!allowDefault(event))
		{
			event.preventDefault();
		}
	}

	function onkeyup(event) 
	{
		control._pressed[event.keyCode] = false;
		control.keyup(event);
		event.preventDefault();
	}

	function onclick(event) 
	{
		control.click(event);
		event.preventDefault();
	}

	function onmousemove(event) 
	{
		control.mousemove(event);
		event.preventDefault();
	}

	function ontouchstart(event) 
	{
		control.touchstart(event);
		event.preventDefault();
	}

	function ontouchmove(event) 
	{
		control.touchmove(event);
		event.preventDefault();
	}

	function allowDefault(event) 
	{
		if(
				(event.keyCode == KEY.F12) //Open Inspector Tools
			||	(event.keyCode == KEY.R && control._pressed[KEY.R])	) //Refresh Page
		{
			return true;
		}
		return false;
	}

	/* ------------- --
	*      STATE
	*  ------------- */

	control._pressed = [];
	control.pressed = function(code)
	{
		return control._pressed[code];
	}


    return canvas;
}