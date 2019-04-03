window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ship = particle.create(width / 2, height / 2, 0, 0),
        thrust = vector.create(0, 0),
        angle = 0,
        turningLeft = false,
        turningRight = false,
        thrusting = false;

    update();

    // We will use the arrow keys to dynamically adjust our thrust vector
    document.body.addEventListener("keydown", function(event) {
        // console.log(event.keyCode);
        switch(event.keyCode) {
            case 38: // up
                thrusting = true;
                break;
            case 40: // down

                break;
            case 37: // left
                turningLeft = true;
                break;
            case 39: // right
                turningRight = true;
                break;
            default:
                break;
        }
    });

    // "keyup" will listen for the keys being released
    // We'll want to restore our default of 0 thrust
    document.body.addEventListener("keyup", function(event) {
        switch(event.keyCode) {
            case 38: // up
                thrusting = false;
                break;
            case 40: // down
                break;
            case 37: // left
                turningLeft = false;
                break;
            case 39: // right
                turningRight = false;
                break;
            default:
                break;
        }
    });

    function update() {
        context.clearRect(0, 0, width, height);
        
        // wrap the ship around the screen
        if (ship.position.getX() < 0) {
            ship.position.setX(width);
        }
        if (ship.position.getX() > width) {
            ship.position.setX(0);
        }
        if (ship.position.getY() < 0) {
            ship.position.setY(height);
        }
        if (ship.position.getY() > height) {
            ship.position.setY(0);
        }

        context.save();
        context.translate(ship.position.getX(), ship.position.getY());
        context.rotate(angle);

        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        // visually demonstrate that the ship is thrusting
        if (thrusting) {
            context.moveTo(-10, 0);
            context.lineTo(-18, 0);
        }
        context.stroke()

        context.restore();

        // check for the ship turning or thrusting
        var angleDelta = 0.05,
            thrustMagnitude = 0.1;
        if (turningLeft) {
            angle -= 0.05;
        }
        if (turningRight) {
            angle += 0.05;
        }
        if (thrusting) {
            thrust.setLength(thrustMagnitude);
        }
        else {
            thrust.setLength(0);
        }

        thrust.setAngle(angle);

        // apply the thrust vector to the ship's acceleration
        ship.accelerate(thrust);
        ship.update();

        requestAnimationFrame(update);
    }
};
