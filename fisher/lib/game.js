const Fisher = require("./fisher.js");
const Fish = require("./fish.js");

class Game {
  constructor(stage, fisher) {
    this.fisher= [];
    this.fish = [];
    stage.canvas.height = 500;
		stage.canvas.width = 700;
    if (fisher.x === undefined){
      this.createFisher(stage, {})
      this.createFish.bind(this)(stage);
    }else{
      this.updateFisher(stage,fisher)
    }
    ;

    return this;
  }

  createFisher(stage, fisher_id) {
    const fisher = new Fisher(stage, fisher_id);

    this.fisher = fisher;
  }

  updateFisher(stage, fisher_id){
    this.fisher = new Fisher(stage, fisher_id);
  }

  createFish(stage) {
    for (let i = 0; i < 20; i++) {
      const fish = new Fish(stage);
      this.fish = this.fish.concat(fish);
      this.fish.alpha = 0;
    }
    stage.update();
  }

  allObjects() {
    return [].concat(this.fisher, this.fish, this.lure);
  }



  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);


    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });

  }

    isOutOfBounds(pos) {
      return (pos[0] < 0) || (pos[1] < 0) ||
        (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
    }

  }

module.exports = Game;
