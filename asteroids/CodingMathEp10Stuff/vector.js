var vector = {
    // default to a unit vector to <1,0>
    // Note that adding an underscore does not make the member
    // private, but it does convey that intent
    _x: 1,
    _y: 0,

    // this create function will act like a constructor
    // it is more convenient to be able to use this than
    // having to call each of these lines every time you
    // want to make an object
    create: function(x, y) {
        var obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        return obj;
    },
    
    setX: function(value) {
        this._x = value;
    },

    setY: function(value) {
        this._y = value;
    },

    getX: function() {
        return this._x;
    },

    getY: function() {
        return this._y;
    },

    setAngle: function(angle) {
        var length = this.getLength();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },

    getAngle: function() {
        return Math.atan2(this._y, this._x);
    },

    getAngleDegrees: function() {
        return this.getAngle() * 180 / Math.PI;
    },

    setLength: function(length) {
        var angle = this.getAngle();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },

    getLength: function() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    },

    // add some functions for vector addition / subtraction
    add: function(v2) {
        return vector.create(this._x + v2.getX(), this._y + v2.getV());
    },

    subtract: function(v2) {
        // utilize our other member functions for better practices
        return this.add(v2.multiply(-1));
    },

    // add a scalar multiplication and division
    multiply: function(scalar) {
        return vector.create(this._x * scalar, this._y * scalar);
    },

    divide: function(scalar) {
        return this.multiply(1/scalar);
    },

    // perform vector operations in place
    addTo: function(v2) {
        this._x += v2._x;
        this._y += v2._y;
    },

    subtractFrom: function(v2) {
        this._x = v2._x - this._x;
        this._y = v2._y - this._y;
    },

    multiplyBy: function(scalar) {
        this._x *= scalar;
        this._y *= scalar;
    },

    divideBy: function(scalar) {
        this._x /= scalar;
        this._y /= scalar;
    }
};

