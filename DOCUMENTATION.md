## Documentation

You can see below the API reference of this module.

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

