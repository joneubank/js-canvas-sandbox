var Splosions = function(canvas) {

    var spl = {};

    spl._list = [];
    spl.random = {};
    spl.random.minParticles = 20;
    spl.random.maxParticles = 50;
    
    spl.random.minRad = 1;
    spl.random.maxRad = 3;
    
    spl.random.minVel = 500;
    spl.random.maxVel = 1000;
    
    spl.random.minLife = 200;
    spl.random.maxLife = 600;

    /* ============================
     *   PARTICLE GENERATOR START
     * ========================= */
    function Generator(x, y)
    {
        function Particle(x, y)
        {
            this.alive = true;
            this._age = 0;
            this._lifespan = Util.randomInt(spl.random.minLife, spl.random.maxLife);

            this.velx = Util.randomInt(spl.random.minVel, spl.random.maxVel);
            this.vely = Util.randomInt(spl.random.minVel, spl.random.maxVel);

            var rad = Util.randomInt(spl.random.minRad, spl.random.maxRad);
            this.shape = Shapes.circle(rad, x, y, "#ffffff");

            this.draw = this.shape.draw;
            this.update = function(canvas, loop)
            {
                this.age += loop.time;
                if(this.age > this._lifespan) { this.alive = false; }
                else 
                {
                    this.shape.x += velx * loop.time/1000;
                    this.shape.y += vely * loop.time/1000;
                }
            }
        }

        this.x = x;
        this.y = y;

        //PARTICLE LIST - add random number of particles
        this._particles = [];
        var numParitcles = Util.randomInt(spl.random.minParticles, spl.random.maxParticles);
        for(var i = 0; i < numParitcles; i++)
        {
            this._particles.push(new Particle(x,y));
        }
        
        this.alive = true;

        this.draw = function(context, canvas, camera)
        {
            Util.drawList(this._particles, context, canvas, camera);
        }

        this.update = function(canvas, loop) {
            Util.updateList(this._particles, canvas, loop);
        }
    }
    /* ============================
     *   PARTICLE GENERATOR END
     * ========================= */

    spl.draw = function(context, canvas, camera)
    {
        Util.drawList(spl._list, context, canvas, camera);
    }

    spl.update = function(canvas, loop) 
    {
        Util.updateList(spl._list, canvas, loop);
    }

    spl.add = function(num, canvas)
    {
        for(var i = 0; i < num; i++)
        {
            var x = Math.random()*canvas._elem.width;
            var y = Math.random()*canvas._elem.height;
            Util.addToList(this._list, new Generator(x,y));
        }
    }

    canvas.splosions = spl;
    return canvas;
}

