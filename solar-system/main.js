window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        planets = [],
        masses = [20, 40, 60, 80, 100, 120],
        radii =  [10, 15, 20, 25, 30, 35],
        sun = planet.create(width / 2, height / 2, 50, 5000, "#FF8C00");

    for (var i = 0; i < masses.length; i += 1) {
        planets.push(
            planet.create(
                Math.random() * height,
                Math.random() * width,
                radii[i],
                masses[i],
                "#FFFFFF"
        ));
    }

    planets.push(sun);

    for (var i = 0; i < planets.length; i += 1) {
        for (var j = 0; j < planets.length; j += 1) {
            if (i != j) {
                planets[i].addGravitation(planets[j])
            }
        }
    }

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        context.fillStyle = "#000000";
        context.fillRect(0, 0, width, height);

        for (var i = 0; i < planets.length; i += 1) {
            var p = planets[i];
            p.update();
            p.screenBounce(width, height);
            p.draw(context);
        }

        requestAnimationFrame(update);
    }
};
