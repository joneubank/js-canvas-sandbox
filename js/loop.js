var Loop = function(canvas) {
    var loop = {};

    loop._exit = false;
    loop._pause = false;

    //loop handling
    loop._count = 0;
    loop._stepInterval = 1000 / 60;
    loop._drawsThisStep = 0;
    loop._fpsRegister = [];
    loop._fpsRegisterMaxLength = 1000;

    loop.time = 0;

    loop.updateNextStep = function() {
        loop._nextStepTime = (new Date).getTime() + loop._stepInterval;
    }
    
    /*
    * _update(canvas, loop) has the default functionality
    * update(canvas, loop) is blank by default and should be overwritten by whatever logic the user wants the loop to execute
    */
    loop.update = function(canvas, loop) { }
    loop._update = function(canvas, loop) {
        loop._count = loop._count + 1;
        loop.update(canvas, loop);
    }

    loop.main = function() {
        if(!loop._pause) {

            //execute update at set interval
            var timeNow = (new Date).getTime();
            if(timeNow >= loop._nextStepTime) {
                
                loop.time = timeNow - loop._nextStepTime + loop._stepInterval;
                loop._update(canvas, loop);

                //update time to run loop at next
                loop.updateNextStep();

                if (loop._fpsRegister.length > loop._fpsRegisterMaxLength) {
                    loop._fpsRegister.shift(1);
                }
                loop._fpsRegister.push(loop._drawsThisStep);
                loop._drawsThisStep = 0;
                
                
            }
        }

        //draw as often as possible
        canvas.redraw();
        loop._drawsThisStep = loop._drawsThisStep + 1;
    }

    /*
    * Runs the main loop until told to stop
    */
    loop.start = function() {
        loop._intervalRef = setInterval(loop.main,0);
    }

    /*
    * stop()
    * Sets a property that indicates to the main loop to exit
    */
    loop.stop = function() {
        clearInterval(loop._intervalRef);
    }

    /*
    * pause()
    * Sets a property that indicates to the main loop to not execute
    */
    loop.pause = function() {
        loop._pause = true;
    }

    /*
    * unpasue()
    * Sets the Pause property to false so that the main loop will run
    */
    loop.unpause = function() {
        loop._pause = false;
    }

    /*
    * togglePause()
    * Sets _pause to the opposite of its current state, pausing a running loop and unpausing a paused loop
    */
    loop.togglePause = function() {
        _pause = !_pause;
    }


    loop.updateRate = function()
    {
        return 1000 / loop._stepInterval;
    }

    loop.fps = function() {
        sum = 0;
        for(i = 0; i < loop._fpsRegister.length; i++) {
            sum = sum + loop._fpsRegister[i];
        }
        return sum/loop._fpsRegister.length*loop.updateRate();
    }

    loop.updateNextStep();
    canvas.loop = loop;
    return canvas;
};
