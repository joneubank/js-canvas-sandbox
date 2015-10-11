var Loop = (function() {

    var _exit = false;
    var _pause = false;
    var _canvas = null;

    var _fps = 30;

    var main = function() {
        while(!_exit) {
            if(!_pause) {



            }
        }
    }

    /*
    * Runs the main loop until told to stop
    */
    var start = function() {
        this.main();
    }

    /*
    * stop()
    * Sets a property that indicates to the main loop to exit
    */
    var stop = function() {
        _exit = true;
    }

    /*
    * pause()
    * Sets a property that indicates to the main loop to not execute
    */
    var pause = function() {
        _pause = true;
    }

    /*
    * unpasue()
    * Sets the Pause property to false so that the main loop will run
    */
    var unpase = function() {
        _pause = false;
    }

    /*
    * togglePause()
    * Sets _pause to the opposite of its current state, pausing a running loop and unpausing a paused loop
    */
    var togglePause = function() {
        _pause = !_pause;
    }

    var attach = function(canvas) {
        _canvas = canvas;
        canvas.draw = draw;
    }

    var init = function(fps = 30) {
        _fps = fps;
    }

    return {
        "init"          : init,

        "start"         : start,
        "stop"          : stop,
        "pause"         : pause,
        "unpase"        : unpause,
        "togglePause"   : togglePause
    }

})();