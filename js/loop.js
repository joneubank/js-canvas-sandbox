var Loop = (function() {

    _this = null;

    var _exit = false;
    var _pause = false;
    var _canvas = null;

    //loop handling
    var _loops = 0;
    var _updatesPerSecond = 30;
    var _stepInterval = 1000 / _updatesPerSecond;
    var _drawsThisStep = 0;
    var _fpsRegister = [];
    var _fpsRegisterMaxLength = 1000;

    var _data = {};

    var _nextStepTime = (new Date).getTime() + _stepInterval;
    var updateNextStep = function() {
        _nextStepTime = (new Date).getTime() + _stepInterval;
    }

    /*
    * Loop state variables and updates
    */
    var _randColor = Color.random();
    var update = function(data) {
        
    }

    var main = function() {
        if(!_pause) {

            //execute update at set interval
            var timeNow = (new Date).getTime();
            if(timeNow >= _nextStepTime) {
                
                loopTime = timeNow - _nextStepTime;
                _this.update(_data);

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
        if(_canvas) {
            var width = _canvas.get().width;
            var height = _canvas.get().height;
            context.clearRect(0,0,width,height);

            _this.render(context, _data);
                
            // context.fillRect(0, 0, width, height);
        }
    }

    var render = function(context, data) {

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

        updateCanvasData();
    }

    var updateCanvasData = function() {
        if(_canvas) {
            _data.canvas = {};
            _data.canvas.width = _canvas.get().width;
            _data.canvas.height = _canvas.get().height;
        }
    }

    var init = function(updatesPerSecond, updateFunction, renderFunction) {
        _this = this;

        updatesPerSecond = updatesPerSecond !== undefined ? updatesPerSecond : 30;
        updateFunction = updateFunction !== undefined ? updateFunction : function(){};
        renderFunction = renderFunction !== undefined ? renderFunction : function(){};

        _this.render = renderFunction;
        _this.update = updateFunction;

        _updatesPerSecond = updatesPerSecond;
        _stepInterval = 1000 / _updatesPerSecond;
        update(_data);
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

    var setUpdateRate = function(rate) {
        _updatesPerSecond = rate;
        _stepInterval = 1000 / _updatesPerSecond;
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
        "getFrameRate"  : getFrameRate,
        "setUpdateRate" : setUpdateRate
    }

})();