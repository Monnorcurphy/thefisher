const MovingObject = require("./moving_object");
const Lure = require("./lure");
const Util = require("./util");

class Fisher{
  constructor(stage, fisher) {

    this.fisher = fisher
    this.fisher.radius = Fisher.RADIUS
    this.stage = stage
    this.draw(stage)
    this.lureDeployed = false

  }

  draw(stage) {
    this.fisher = new createjs.Bitmap("./images/fisher.png");
    this.fisher.scaleX=0.1;
    this.fisher.scaleY=0.1;
    this.fisher.x = stage.canvas.width /2;
    this.fisher.y = 0
    stage.addChild(this.fisher)


}

  castLure() {
    if(this.lureDeployed == false){
      this.lureDeployed = true
      const lure = new createjs.Bitmap("./images/hook.png");

    if(lure.x === 0 && lure.y ===0){

      lure.x = this.fisher.x
      lure.y = this.fisher.y + 10
      lure.vel = 5
      lure.scaleX=0.1;
      lure.scaleY=0.1;
      this.stage.addChild(lure)
      createjs.Ticker.addEventListener("tick", handleTick.bind(this));
      function handleTick(e){
        lure.y += lure.vel

        if (lure.y > this.stage.canvas.height + lure.scaleY){
          this.stage.removeChild(lure)
          this.lureDeployed = false
          lure.y = 0
          lure.x = 0
        }

        for (let i = 1; i < this.stage.children.length - 1; i++){

          if((Math.abs(lure.y - this.stage.children[i].y) <= 10) && (Math.abs(lure.x - this.stage.children[i].x) <= 20)){
            this.stage.removeChild(lure)
            this.stage.removeChild(this.stage.children[i])
            lure.y = -150
            lure.x = -150
            lure.vel= 0
            this.lureDeployed = false
          }
          }
        }
        this.stage.update
      }
    }
      return;
    }


  updatePosition(x){

    this.fisher.x = x
    this.stage.update
  }

}

Fisher.RADIUS = 20;
module.exports = Fisher;
