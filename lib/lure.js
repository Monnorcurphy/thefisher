const MovingObject = require("./moving_object");

class Lure {
  constructor(stage, fisher) {
    this.lure = new createjs.Bitmap("./images/hook.png");
    this.lure.x = fisher.x
    this.lure.y = fisher.y + 42
    this.lure.vel = 5
    this.draw(stage, this.lure)
  }

  draw(stage, lure) {
    lure.scaleX = .12
    lure.scaleY = .13
    stage.addChild(lure)
    return this.lure
  }

}


module.exports = Lure;
