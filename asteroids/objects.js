var ship = {
    position: null,
    velocity: null,
    thrust: null, // acceleration of ship while thrusting
    drag: 0.95, // drag coefficient applied to ship on each frame
    isThrusting: null,
    angle: null, // the direction the ship is facing (and will accelerate)
    thrustMag: 0.75, // the magnitude of thrust acceleration while thrust
                  // is enabled
    angleDelta: 0.05, // amount by which angle will be incremented while ship
                      // is turning left or right
    turningLeft: null,
    turningRight: null,
    radius: 0, // give ship a 0 radius for interaction with the screenWrap()
               // function in main.js
    color: null,

    // define the size of the ship
    x: 10,
    y: 7,
    thrustLineLength: 18,

    create: function(x, y) {
        s = Object.create(this);
        // Initialize an instance of the ship
        s.position = vector.create(x, y);
        s.velocity = vector.create(0, 0);
        s.thrust = vector.create(0, 0);
        s.isThrusting = false;
        s.angle = 0;
        s.turningLeft = false;
        s.turningRight = false;
        s.color = "#FFFFFF"; // make the ship white by default
        return s;
    },

    update: function() {
        if (this.turningLeft) {
            this.turnLeft();
        } else if (this.turningRight) {
            this.turnRight();
        }
        this.velocity.addTo(this.thrust);
        this.velocity.multiplyBy(this.drag);
        this.position.addTo(this.velocity);
    },

    isColliding: function(ast) {
        // determine if the ship is colliding with the given asteroid
        // In this.draw(), we translate and then rotate the context
        // before drawing the lines using this.x and this.y
        // So here, we must translate and then rotate the position of the
        // asteroid before comparing to the lines drawn by this.x and this.y
        var x = ast.position.getX() - this.position.getX(),
            y = ast.position.getY() - this.position.getY(),
            d = Math.sqrt(x*x + y*y),
            theta = Math.atan2(y, x),
            r = ast.getRadius(),
            m = this.y / (2 * this.x),
            b = this.y / 2;

        // adjust theta by the angle of the ship
        theta += this.angle;
        // rotate the x and y coordinates of the asteroid to match the x-y
        // plane of the ship
        x = d * Math.cos(theta);
        y = d * Math.sin(theta);

        // So there are three lines for which we need to check the bounds
        // The first is the vertical line from (-this.x, -this.y) to
        // (-this.x, this.y); for this line, we can just check if the rightmost
        // point of the circle is to the right of -this.y
        return (x + r > -this.x) &&

        // the next line to check goes from (-this.x, this.y) to (this.x, 0)
        // To see if any of the asteroid circle goes under this line, we can
        // check the leftmost and the lowest points of the circle
            (this.lineBound(x - r, y, -m, b, true) ||
                this.lineBound(x, y - r, -m, b, true)) &&
        // The last line goes from (-this.x, this.y) to (this.x, 0)
        // To check if any of the asteroid circle goes over this line, we can
        // check the rightmost and highest points of the circle
            (this.lineBound(x + r, y, m, -b, false) ||
                this.lineBound(x, y + r, m, -b, false));
    },

    lineBound: function(x, y, m, b, under) {
        // check if the point (x, y) is either under (under = true)
        // or over (under = false) the line Y = m * X + b
        // return the mathcing boolean
        // if the point is on the line, this won't return true for either,
        // but we are working with random floating point numbers, so the
        // theoretical probability of an exact match is 0
        // Of course, since we use a finite amount of memory to represent the
        // numbers, there is actually a very small probability of an exact
        // match, but I'm comfortable with that
        return ((y < (x * m + b)) == under);
    },

    enableThrusting: function() {
        if (!this.isThrusting) {
            this.thrust.setLength(this.thrustMag); // turn on the thrust
            this.isThrusting = true;
        }
    },

    disableThrusting: function() {
        if (this.isThrusting) {
            this.thrust.setLength(0); // turn off the thrust
            this.isThrusting = false;
        }
    },

    startTurningLeft: function() {
        this.turningLeft = true;
    },

    startTurningRight: function() {
        this.turningRight = true;
    },

    stopTurningLeft: function() {
        this.turningLeft = false;
    },

    stopTurningRight: function() {
        this.turningRight = false;
    },

    turnLeft: function() {
        this.angle -= this.angleDelta;
        this.thrust.setAngle(this.angle);
    },

    turnRight: function() {
        this.angle += this.angleDelta;
        this.thrust.setAngle(this.angle);
    },

    getRadius: function() {
        return this.radius;
    },

    setColor: function(color) {
        this.color = color;
    },

    draw: function(context) {
        context.save();
        context.translate(this.position.getX(), this.position.getY());
        context.rotate(this.angle);
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.beginPath();
        context.moveTo(this.x, 0);
        context.lineTo(-this.x, -this.y);
        context.lineTo(-this.x, this.y);
        context.lineTo(this.x, 0);
        context.fill();
        // visually demonstrate that the ship is thrusting
        if (this.isThrusting) {
            context.moveTo(-this.x, 0);
            context.lineTo(-this.thrustLineLength, 0);
        }
        context.stroke();
        context.restore();
    }
}

var asteroid = {
    position: null,
    velocity: null,
    radius: null,
    color: null,

    create: function(x, y, r) {
        a = Object.create(this);
        a.position = vector.create(x, y);
        a.randomizeVelocity();
        a.radius = r;
        a.color = "#0000FF"; // set asteroids to blue by default
        return a;
    },

    update: function() {
        this.position.addTo(this.velocity);
    },

    getRadius: function() {
        return this.radius;
    },

    setRadius: function(radius) {
        this.radius = radius;
    },

    setColor: function(color) {
        this.color = color;
    },

    draw: function(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.position.getX(), this.position.getY(),
                    this.radius, 0, Math.PI * 2);
        context.fill();
    },

    randomizeVelocity: function() {
        this.velocity = vector.create(0, 0);
        this.velocity.setLength(Math.random() * 2 + 1);
        this.velocity.setAngle(Math.random() * Math.PI * 2);
    }
}
