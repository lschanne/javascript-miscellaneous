var planet = {
    x: null,
    y: null,
    vx: null,
    vy: null,
    radius: null,
    mass: null,
    gravitations: null,
    color: null,
    bounceFactor: 0.95,

    create: function(x, y, r, m, color) {
        obj = Object.create(this);
        obj.x = x;
        obj.y = y;
        obj.vx = 0;
        obj.vy = 0;
        obj.radius = r;
        obj.mass = m;
        obj.color = color || "#000000";
        obj.gravitations = [];
        return obj;
    },

    update: function(width, height) {
        for (var i = 0; i < this.gravitations.length; i += 1) {
            this.gravitateTo(this.gravitations[i]);
        }

        this.x += this.vx;
        this.y += this.vy;

        for (var i = 0; i < this.gravitations.length; i += 1) {
            this.checkCollision(this.gravitations[i]);
        }
    },

    checkCollision: function(p) {
        var dx = p.x - this.x,
            dy = p.y - this.y,
            dist = Math.sqrt(dx * dx + dy * dy);
        // do nothing for now
    },

    screenWrap: function(width, height) {
        if (this.x + this.radius < 0) {
            this.x = width + this.radius;
        } else if (this.x - this.radius < width) {
            this.x = -this.radius;
        }

        if (this.y + this.radius < 0) {
            this.y = height + this.radius;
        } else if (this.y - this.radius < height) {
            this.y = -this.radius;
        }
    },

    screenBounce: function(width, height) {
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx *= -this.bounceFactor;
            this.vy *=  this.bounceFactor;
        } else if (this.x + this.radius > width) {
            this.x = width - this.radius;
            this.vx *= -this.bounceFactor;
            this.vy *=  this.bounceFactor;
        }

        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vx *=  this.bounceFactor;
            this.vy *= -this.bounceFactor;
        } else if (this.y + this.radius > height) {
            this.y = height - this.radius;
            this.vx *=  this.bounceFactor;
            this.vy *= -this.bounceFactor;
        }
    },

    gravitateTo: function(p) {
        var dx = p.x - this.x,
            dy = p.y - this.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            grav = p.mass / (dist * dist);

        this.vx += grav * dx / dist;
        this.vy += grav * dy / dist;
    },

    addGravitation: function(p) {
        this.gravitations.push(p);
    },

    removeGravitation: function (p) {
        for (var i = 0; i < this.gravitations.length; i += 1) {
            if (this.gravitations[i] === p) {
                this.gravitations.slice(i, 1);
                return true;
            }
        }
        return false;
    },

    draw: function(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
};
