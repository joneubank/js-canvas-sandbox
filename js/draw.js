var Draw = (function(){

    var _context = null;

	var rect = function(context, color, left, top, width, height) {
        context = context !== undefined ? context : _context;
        color = color !== undefined ? color : '#ffffff';

        if(context) {
            context.fillStyle=color;
            context.fillRect(left, top, width, height);
        }
	}

    var clear = function(context, left, top, width, height) {
        context = context !== undefined ? context : _context;
        if(context) {
            context.clearRect(left, top, width, height);
        }
    }

    var setContext = function(context) {
        _context = context;
    }



	return {
        "setContext"        : setContext,
        
        "rect"              : rect,
        "clear"             : clear
	};
})();