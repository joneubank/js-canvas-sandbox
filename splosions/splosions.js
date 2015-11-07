var Splosions = function(canvas) {

    var spl = {};

    spl._list = [];
    spl.random = {};
    spl.random.minParticles = 20;
    spl.random.maxParticles = 50;
    
    spl.random.minRad = 1;
    spl.random.maxRad = 5;
    
    spl.random.minVel = 0;
    spl.random.maxVel = 1000;
    
    spl.random.minLife = 50;
    spl.random.maxLife = 400;

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

            var vel = Util.randomInt(spl.random.minVel, spl.random.maxVel);
            var angle = Math.random()*Math.PI * 2;


            this.velx = vel*Math.cos(angle);
            this.vely = vel*Math.sin(angle);
            if(Math.random() <= 0.5){
                this.velx *= -1;
            }
            if(Math.random() <= 0.5){
                this.vely *= -1;
            }
            var rad = Util.randomInt(spl.random.minRad, spl.random.maxRad);
            this.shape = Shapes.circle(rad, x, y, Color.random());

            this.draw = this.shape.draw;
            this.update = function(canvas, loop)
            {
                this._age += loop.time;
                if(this._age > this._lifespan) { this.alive = false; }
                else 
                {
                    this.shape.x += this.velx * loop.time/1000;
                    this.shape.y += this.vely * loop.time/1000;
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
        var splosionCount = 0;
        var particleCount = 0; 
        for(i = 0; i < spl._list.length ; i++) 
        {
            var generatorHasParticles = false;
            if(spl._list[i])
            {
                for(j = 0; j < spl._list[i]._particles.length; j++) {
                    if (spl._list[i]._particles[j]) {
                        particleCount += 1;
                        generatorHasParticles = true;
                    }
                }
            }
            if (generatorHasParticles) {
                splosionCount += 1;
            }
        }
        if (splosionCount == 0) {
            spl._list = [];
        }
    }

    spl.add = function(num, canvas)
    {
        for(var i = 0; i < num; i++)
        {
            var x = Math.random()*canvas._elem.width;
            var y = Math.random()*canvas._elem.height;
            spl.addAt(x, y, canvas);
        }
    }

    spl.addAt = function(x, y, canvas)
    {
        Util.addToList(this._list, new Generator(x,y));
    }

    canvas.splosions = spl;
    return canvas;
}

