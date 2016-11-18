const MovingObject = require("./moving_object");

class Lure extends MovingObject {
  constructor(options) {
    options.radius = Lure.RADIUS;
    super(options);
    this.isWrappable = false;
  }
}

Lure.RADIUS = 2;
Lure.SPEED = 15;

module.exports = Lure;
