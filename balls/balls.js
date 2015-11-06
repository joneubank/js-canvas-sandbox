var Balls = function(canvas) {
    
    var balls = {};
    balls._list = [];
    balls.random = {};
    balls.random.minRad = 10;
    balls.random.maxRad = 150;
    balls.random.minVel = 50;
    balls.random.maxVel = 1000;

    balls.random.radius = function() {
        var sqrtRad = Math.random()*(Math.sqrt(balls.random.maxRad-balls.random.minRad));
        return (sqrtRad*sqrtRad)|0+balls.random.minRad;
    }

    balls.create = function(radius, posx, posy, velx, vely, color) 
    {
        radius = radius !== undefined ? radius : balls.random.radius();
        velx = velx !== undefined ? velx : (Math.random()*(balls.random.maxVel-balls.random.minVel)|0 + balls.random.minVel)*(Math.round(Math.random()) ? 1 : -1);
        vely = vely !== undefined ? vely : (Math.random()*(balls.random.maxVel-balls.random.minVel)|0 + balls.random.minVel)*(Math.round(Math.random()) ? 1 : -1);
        posx = posx !== undefined ? posx : Math.random()*(canvas._elem.width-radius*2)+radius;
        posy = posy !== undefined ? posy : Math.random()*(canvas._elem.height-radius*2)+radius;
        color = color !== undefined ? color : Color.random();

        var ball = {};

        ball.circle     = Shapes.circle(radius, posx, posy, color);
        ball.velx       = velx;
        ball.vely       = vely;

        return ball;
    }

    balls.add = function(num) 
    {
        for(i = 0; i < num; i++) 
        {
            balls._list.push(balls.create());
        }
    }

    balls.draw = function(context, canvas, camera)
    {
        //draw each ball
        for(i = 0; i < balls._list.length; i++)
        {
            balls._list[i].circle.draw(context, canvas, camera);
        }
    }

    balls.update = function(canvas)
    {
        for(i = 0; i < balls._list.length; i++)
        {
            // add velocity to position, velocity calculated as per second
            ball = balls._list[i];
            ball.circle.x = ball.circle.x + ball.velx * canvas.loop._stepInterval / 1000;
            ball.circle.y = ball.circle.y + ball.vely * canvas.loop._stepInterval / 1000;

            //horizontal velocity correction (move towards box if outside / bounce if inside at edge)
            if(ball.circle.x+ball.circle.radius > canvas._elem.width)   { ball.velx = ball.velx > 0 ? ball.velx * -1: ball.velx;}
            else if(ball.circle.x < 0 + ball.circle.radius)             { ball.velx = ball.velx < 0 ? ball.velx * -1: ball.velx;}

            //vertical velocity correction (move towards box if outside / bounce if inside at edge)
            if(ball.circle.y+ball.circle.radius > canvas._elem.height)  { ball.vely = ball.vely > 0 ? ball.vely * -1: ball.vely;}
            else if(ball.circle.y < 0 + ball.circle.radius)             { ball.vely = ball.vely < 0 ? ball.vely * -1: ball.vely;}
        }
    }
    
//    balls.add = 
//        var
//        balls._list.
//    }

    canvas.balls = balls;
    return canvas;
}