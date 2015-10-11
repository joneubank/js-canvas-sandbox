var Loop = (function() {

    var _exit = false;
    var _pause = false;
    var _canvas = null;

    var _loops = 0;
    var _updatesPerSecond = 30;
    var _stepInterval = 1000 / _updatesPerSecond;
    var _drawsThisStep = 0;
    var _fpsRegister = [];
    var _fpsRegisterMaxLength = 1000;

    var _nextStepTime = (new Date).getTime() + _stepInterval;
    var updateNextStep = function() {
        _nextStepTime = (new Date).getTime() + _stepInterval;
    }

    /*
    * Loop state variables and updates
    */
    var _randColor = Color.random();
    var update = function() {
        _randColor = Color.random();
    }

    var main = function() {
        if(!_pause) {

            //execute update at set interval
            var timeNow = (new Date).getTime();
            if(timeNow >= _nextStepTime) {
                
                loopTime = timeNow - _nextStepTime;
                update();

                //update time to run loop at next
                updateNextStep();
                if (_fpsRegister.length > _fpsRegisterMaxLength) {
                    _fpsRegister.shift(1);
                }
                _fpsRegister.push(_drawsThisStep);
                _drawsThisStep = 0;
            }

        }

        //draw as often as possible
        _canvas.redraw(); 
        _drawsThisStep = _drawsThisStep + 1;
    }

    var draw = function(context) {
        if(Color) {
            context.fillStyle = _randColor;
        }
        context.fillRect(10, 10, 500, 500);
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
    var unpause = function() {
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

    var init = function(updatesPerSecond) {
        updatesPerSecond = updatesPerSecond !== undefined ? updatesPerSecond : 30;
        _updatesPerSecond = updatesPerSecond;
        _stepInterval = 1000 / _updatesPerSecond;
        updateNextStep();

        setInterval(main,0);
    }

    var getFrameRate = function() {
        sum = 0;
        for(i = 0; i < _fpsRegister.length; i++) {
            sum = sum + _fpsRegister[i];
        }
        return sum/_fpsRegister.length*_updatesPerSecond;
    }

    return {
        "init"          : init,
        "draw"          : draw,
        "attach"        : attach,

        "start"         : start,
        "stop"          : stop,
        "pause"         : pause,
        "unpase"        : unpause,
        "togglePause"   : togglePause,
        "getFrameRate"  : getFrameRate
    }

})();