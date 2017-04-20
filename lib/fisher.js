const MovingObject = require("./moving_object");
const Lure = require("./lure");
const Util = require("./util");

class Fisher{
  constructor(stage, fisher) {

    this.fisher = new createjs.Bitmap("./images/fisher.png");
    this.fisher.radius = Fisher.RADIUS
    this.stage = stage

    if(fisher.fisher){
      this.fisher.x = fisher.fisher.x
      this.multipleFishers = true
    }else{
      this.fisher.x = this.stage.canvas.width /2;
      this.fisher.y = 0
    }
    this.draw(this.stage)
  }

  draw(stage) {
    this.fisher.scaleX = .14
    this.fisher.scaleY = .14
    stage.addChild(this.fisher)

  return this.fisher

  }

  updatePosition(x){
    
    if(x > 0 && x < this.stage.canvas.width - 60){
      this.fisher.x = x
      this.stage.update
    }

  }



}

Fisher.RADIUS = 20;
module.exports = Fisher;
