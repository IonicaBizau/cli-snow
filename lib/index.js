var Ul = require("ul");

/**
 * CliSnow
 * Initializes the snow in command line.
 *
 * @name CliSnow
 * @function
 * @param {Object} options The settings object, containing the following fields:
 *
 *  - `speed` (Number): How fast the snow falls. You can choose a number in between 0 - 5. The higher, the faster (default: `0`).
 *  - `chars` (Array): The characters used for snow flakes (default: `[".", "*", "@"]`).
 *  - `count` (Number): How many flakes should be on the screen (default: `200`).
 *  - `windPower` (Number): If you want the wind to blow left, set a positive number in this option., if you want the wind to blow right, set a negative number in this option (default: `0`).
 *  - `size` (Object): An object containing:
 *    - `w` (Number): The width value (default: `process.stdout.columns || 80`).
 *    - `h` (Number): The height value (default: `process.stdout.rows || 60`).
 *  - `mX` (Number): The minimum `x` (default: `-100`).
 *  - `mY` (Number): The minimum `y` (default: `-100`).
 *
 * @param {Function} callback The callback function called with an `err`, `stringified` and `scr` arguments.
 * @return {Object} An object containing the following fields:
 *
 *  - `options` (Object): The reference to the options.
 *  - `flakes` (Array): An array with the current flakes.
 *
 */
var CliSnow = module.exports = function (options, callback) {

    var self = {};

    if (typeof options === "function") {
        callback = options;
        options = {};
    }

    options = Ul.merge(CliSnow.defaults, options);
    self.options = options;

    var flakes = self.flakes = [];

    function animate(callback) {
        setTimeout(callback, 100);
    }

    function snow() {
        var scr = [];
        for (var y = 0; y < options.size.h; ++y) {
            var cY = [];
            scr.push(cY);
            for (var x = 0; x < options.size.w; ++x) {
                cY.push(" ");
            }
        }

        for (var i = 0; i < options.count; ++i) {
            var flake = flakes[i]
              , x = options.mX
              , y = options.mY
              , minDist = 100
              , x2 = flake.x
              , y2 = flake.y
              , dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y))
              , dx = x2 - x
              , dy = y2 - y
              ;

            if (dist < minDist) {
                var force = minDist / (dist * dist)
                  , xcomp = (x - x2) / dist
                  , ycomp = (y - y2) / dist
                  , deltaV = force / 2
                  ;

                flake.velX -= deltaV * xcomp;
                flake.velY -= deltaV * ycomp;
            } else {
                flake.velX *= .98;
                if (flake.velY <= flake.speed) {
                    flake.velY = flake.speed
                }

                switch (options.windPower) {
                  case false:
                    flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                  break;

                  case 0:
                    flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
                  break;

                  default:
                    flake.velX += 0.01 + (options.windPower/100);
                }
            }

            flake.y += flake.velY;
            flake.x += flake.velX;

            if (flake.y >= options.size.h || flake.y <= 0) {
                reset(flake);
            }

            if (flake.x >= options.size.w || flake.x <= 0) {
                reset(flake);
            }

            scr[Math.floor(flake.y)][Math.floor(flake.x)] = flake.c;
        }

        var stringified = scr.map(function (c) { return c.join(""); }).join("\n");
        callback(null, stringified, scr);
        animate(snow);
    }

    function reset(flake) {
        if (options.windPower == false || options.windPower == 0) {
          flake.x = Math.floor(Math.random() * options.size.w);
          flake.y = 0;
        } else {
          if (options.windPower > 0) {
            var xarray = Array(Math.floor(Math.random() * options.size.w), 0);
            var yarray = Array(0, Math.floor(Math.random() * options.size.h))
            var allarray = Array(xarray, yarray)

            var selected_array = allarray[Math.floor(Math.random()*allarray.length)];

             flake.x = selected_array[0];
             flake.y = selected_array[1];
          } else {
            var xarray = Array(Math.floor(Math.random() * canvas.width),0);
            var yarray = Array(canvas.width, Math.floor(Math.random() * canvas.height))
            var allarray = Array(xarray, yarray)

            var selected_array = allarray[Math.floor(Math.random()*allarray.length)];

             flake.x = selected_array[0];
             flake.y = selected_array[1];
          }
        }

        flake.size = (Math.random() * 3) + options.size;
        flake.speed = (Math.random() * 1) + options.speed;
        flake.velY = flake.speed;
        flake.velX = 0;
        flake.opacity = (Math.random() * 0.5) + options.opacity;
    }

    // Initialize the flakes
    for (var i = 0; i < options.count; ++i) {
        var x = Math.floor(Math.random() * options.size.w)
          , y = Math.floor(Math.random() * options.size.h)
          , c = options.chars[Math.floor(Math.random() * options.chars.length)]
          , speed = (Math.random() * 1) + options.speed
          ;

        flakes.push({
            speed: speed
          , velY: speed
          , velX: 0
          , x: x
          , y: y
          , c: c
          , stepSize: (Math.random()) / 30
          , step: 0
          , angle: 180
        });
    }

    animate(snow);
    return self;
};

// Defaults
CliSnow.defaults = {
    speed: 0
  , chars: [".", "*", "@"]
  , count: 200
  , windPower: 4
  , size: {
        w: process.stdout.columns || 80
      , h: process.stdout.rows || 60
    }
  , mX: -100
  , mY: -100
};
