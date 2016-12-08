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
    this.fisher.scaleX=0.15;
    this.fisher.scaleY=0.15;
    this.fisher.x = stage.canvas.width /2;
    this.fisher.y = 0
    stage.addChild(this.fisher)

}



  checkKids() {
    if (this.stage.children.length === 0){
      return 0
    }
    let count = 0;
    for (let i = 0; i < this.stage.children.length; i++) {

      if(this.stage.children[i].scaleX == .1){

        count += 1
      }}
    return count;
  }

  castLure() {
    if(this.lureDeployed == false){
      this.lureDeployed = true
      let lure = new createjs.Bitmap("./images/hook.png");

    if(lure.x === 0 && lure.y ===0){

      lure.x = this.fisher.x
      lure.y = this.fisher.y + 10
      lure.vel = 5
      lure.scaleX=0.11;
      lure.scaleY=0.11;
      this.stage.addChild(lure)
      createjs.Ticker.addEventListener("tick", handleTick.bind(this));
      function handleTick(e){
        lure.y += lure.vel

        if (lure.y > this.stage.canvas.height + lure.scaleY){
          this.stage.removeChild(lure)
          this.lureDeployed = false
          lure = {}
          return false
        }

        for (let i = 1; i < this.stage.children.length - 1; i++){

          if((Math.abs(lure.y - this.stage.children[i].y) <= 20) && (Math.abs(lure.x - this.stage.children[i].x) <= 30)){
            this.stage.removeChild(lure)
            this.stage.removeChild(this.stage.children[i])
            lure = {}
            this.lureDeployed = false

            return false
          }
          }
        }

        this.stage.update
      }
      return true
    }

      return false;
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
