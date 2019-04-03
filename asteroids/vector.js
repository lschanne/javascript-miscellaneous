var vector = {
    _x: 0,
    _y: 0,
    _angle: 0,
    _length: 0,

    create: function(x, y) {
        obj = Object.create(this);
        obj._x = x;
        obj._y = y;
        obj._updatePolar();
        return obj;
    },

    _updatePolar: function() {
        this._angle = Math.atan2(this._y, this._x);
        this._length = Math.sqrt(this._x*this._x + this._y*this._y);
    },

    _updateCartesian: function() {
        this._x = this._length * Math.cos(this._angle);
        this._y = this._length * Math.sin(this._angle);
    },

    getX: function() {
        return this._x;
    },

    getY: function() {
        return this._y;
    },

    setX: function(x) {
        this._x = x;
        this._updatePolar();
    },

    setY: function(y) {
        this._y = y;
        this._updatePolar();
    },

    getAngle: function() {
        return this._angle;
    },

    getLength: function() {
        return this._length;
    },

    setAngle: function(angle) {
        this._angle = angle;
        this._updateCartesian();
    },

    setLength: function(length) {
        this._length = length;
        this._updateCartesian();
    },

    multiplyBy: function(scalar) {
        this._x *= scalar;
        this._y *= scalar;
        this._length *= scalar;
    },

    addLength: function(length) {
        this.setLength(this._length + length);
    },

    addTo: function(v) {
        this._x += v._x;
        this._y += v._y;
        this._updatePolar();
    }
}

