CLI Snow
========
Snow, snow, snow! Let it snow, in terminal!

![](http://i.imgur.com/0tLNe6K.png)

Yes, it's animated (probably we have to add there a gif file)! :smile:

Inspired from [Let it snow](https://github.com/peachananr/let_it_snow).

## Installation

```sh
$ npm install -g cli-snow
```

## Usage

```sh
$ snow
```

Also, you can use it as a module. See below.

## Example
```js
// Dependencies
var CliUpdate = require("cli-update")
  , CliBox = require("cli-box")
  , CliSnow = require("../lib")
  , Overlap = require("overlap")
  , Figlet = require("figlet")
  ;

// Init snow
Figlet("Happy New Year!", function (err, message) {
    if (err) throw err;
    var where = {};
    var snow = CliSnow(function (err, snow) {
        if (err) throw err;
        CliUpdate.render(
            Overlap({
                who: snow
              , with: message
              , where: where
            })
        );
    });

    where.x = snow.options.size.w / 2 - message.split("\n")[0].length / 2;
    where.y = snow.options.size.h - message.split("\n").length;
});
```

## Documentation
### `CliSnow(options, callback)`
Initializes the snow in command line.

#### Params
- **Object** `options`: The settings object, containing the following fields:
 - `speed` (Number): How fast the snow falls. You can choose a number in between 0 - 5. The higher, the faster (default: `0`).
 - `chars` (Array): The characters used for snow flakes (default: `[".", "*", "@"]`).
 - `count` (Number): How many flakes should be on the screen (default: `200`).
 - `windPower` (Number): If you want the wind to blow left, set a positive number in this option., if you want the wind to blow right, set a negative number in this option (default: `0`).
 - `size` (Object): An object containing:
   - `w` (Number): The width value (default: `process.stdout.columns || 80`).
   - `h` (Number): The height value (default: `process.stdout.rows || 60`).
 - `mX` (Number): The minimum `x` (default: `-100`).
 - `mY` (Number): The minimum `y` (default: `-100`).

- **Function** `callback`: The callback function called with an `err`, `stringified` and `scr` arguments.

#### Return
- **Object** An object containing the following fields:
 - `options` (Object): The reference to the options.
 - `flakes` (Array): An array with the current flakes.

## How to contribute
1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
