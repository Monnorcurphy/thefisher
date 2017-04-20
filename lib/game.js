const Fisher = require("./fisher.js");
const Fish = require("./fish.js");
const Lure = require("./lure.js");

class Game {
  constructor(stage, fisher, difficulty) {
    this.fisher= [];
    this.fish = [];
    stage.canvas.height = 500;
		stage.canvas.width = 700;
    this.stage = stage
    this.lureDeployed= false;
    if (fisher.x === undefined){
      this.createFisher(stage, {})
      this.createFish.bind(this)(stage, difficulty);
    }else{
      this.updateFisher(stage,fisher)
    };


    return this;
  }

  createFisher(stage, fisher_id) {
    const fisher = new Fisher(stage, fisher_id);
    this.fisher = fisher;
  }

  updateFisher(stage, fisher_id){
    this.fisher.updatePosition(fisher_id)
  }

  createFish(stage, difficulty) {
    let numFish = {easy: 5, medium: 10, hard: 20};
    for (let i = 0; i <= numFish[difficulty]; i++){
      const fish = new Fish(stage);
      this.fish = this.fish.concat(fish);
      this.fish.alpha = 0;
    }
    stage.update();
  }

  allObjects() {
    return [].concat(this.fisher, this.fish, this.lure);
  }

    isOutOfBounds(pos) {
      return (pos[0] < 0) || (pos[1] < 0) ||
        (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
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

        if (this.stage.children <= 1){
          return false
        }else if (this.lureDeployed){
          return false
        }else{
          this.lureDeployed = true
          this.lure = new Lure(this.stage, this.fisher.fisher);
          this.lure = this.lure.lure
          console.log(this.lure);

          // if (!(this.ticker)){
            this.ticker = createjs.Ticker.addEventListener("tick", handleTick.bind(this));
          // }

          function handleTick(e){
            this.lure.y += this.lure.vel

            if (this.lure.y > this.stage.canvas.height + this.lure.scaleY){
              this.stage.removeChild(this.lure)
              this.lureDeployed = false
              this.lure = {}
              return false
            }

            for (let i = 1; i < this.stage.children.length - 1; i++){

              if((Math.abs(this.lure.y - this.stage.children[i].y) <= 20) && (Math.abs(this.lure.x - this.stage.children[i].x) <= 30) && (this.stage.children[i].scaleY != .14)){
                this.stage.removeChild(this.lure)
                this.stage.removeChild(this.stage.children[i])
                this.lure = {}
                this.lureDeployed = false
                return false
                }
              }
            }

            this.stage.update
          }
          return true
        }

      updatePosition(x){

        if(this.fisher.fisher.x > 0 && this.fisher.fisher.x < this.stage.canvas.width - 64){
          this.fisher.fisher.x += x
          this.updateFisher(this.stage, this.fisher)
          this.stage.update
        }

      }


}

module.exports = Game;
