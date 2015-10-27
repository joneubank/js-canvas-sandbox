var Splosions = function(canvas) {

    function Generator()
    {
        function Particle()
        {

        }

        this._particles = [];
        


        this.draw = function(context, canvas)
        {
            Util.drawList(this._particles, context, canvas);
        }
    }

    var spl = {};

    spl._list = [];
    spl.random = {};
    spl.random.genPerSecond = 15;
    spl.random.minRad = 1;
    spl.random.maxRad = 3;
    spl.random.minVel = 500;
    spl.random.maxVel = 1000;

    spl.draw = function(context, canvas)
    {
        Util.drawList(spl._list, context, canvas);
    }

    canvas.splosions = spl;

}

