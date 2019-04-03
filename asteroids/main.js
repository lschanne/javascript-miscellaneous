window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,

        s = ship.create(width / 2, height / 2),
        asteroidArray = [],
        numAsteroids = 25,
        bufferRadius = 20,

        collisionColor = "#800000"; // color any collision objects maroon

    for (var i = 0; i < numAsteroids; i+=1) {
        var invalidStart = true
        // make sure the asteroid doesn't start too close to the ship
        // use a buffer radius that will be added to the asteroid for the
        // collision checking and then taken away
        var ast;
        while (invalidStart) {
            ast = asteroid.create(Math.random() * width,
                                  Math.random() * height,
                                  5 + 20 * Math.random() + bufferRadius);
            invalidStart = s.isColliding(ast);
        }
        ast.setRadius(ast.getRadius() - bufferRadius);
        asteroidArray.push(ast);
    }

    update();

    document.addEventListener("keydown", function(event) {
        switch(event.keyCode) {
            case 38: // up arrow
                s.enableThrusting();
                break;
            case 40: // down arrow
                // do nothing
                break;
            case 37: // left arrow
                s.startTurningLeft();
                break;
            case 39: // right arrow
                s.startTurningRight();
                break;
            default:
                break;
        }
    });

    document.addEventListener("keyup", function(event) {
        switch(event.keyCode) {
            case 38: // up arrow
                s.disableThrusting();
                break;
            case 40: // down arrow
                // do nothing
                break;
            case 37: // left arrow
                s.stopTurningLeft();
                break;
            case 39: // right arrow
                s.stopTurningRight();
                break;
            default:
                break;
        }
    });

    function screenWrap(obj) {
        var r = obj.getRadius(),
            x = obj.position.getX(),
            y = obj.position.getY();

        if (x + r < 0) {
            obj.position.setX(width + r);
        } else if (x - r > width) {
            obj.position.setX(-r);
        }
        if (y + r < 0) {
            obj.position.setY(height + r);
        } else if (y - r > height) {
            obj.position.setY(-r);
        }
    }

    function update() {
        // Set a black background
        context.fillStyle = "#000000";
        context.fillRect(0, 0, width, height);

        s.update();
        screenWrap(s);

        var isColliding = false;
        for (var i = 0; i < numAsteroids; i+=1) {
            var ast = asteroidArray[i];

            ast.update();
            screenWrap(ast);
            if (s.isColliding(ast)) {
                isColliding = true;
                ast.setColor(collisionColor);
            }
            ast.draw(context);
        }


        if (isColliding) {
            s.setColor(collisionColor);
        }
        s.draw(context);

        if (!isColliding) {
            requestAnimationFrame(update);
        }
    }
};

