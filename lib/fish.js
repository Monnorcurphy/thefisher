const Util = require("./util");
const MovingObject = require("./moving_object");
const Lure= require("./lure");


class Fish {
  constructor(stage) {
    this.fishX = -1;
    this.size = .1;
		this.fish = this.draw(stage);

  }

  randomPosition(stage) {
    let x = Math.floor(Math.random() + .5);

    if (x === 1) {
			x = stage.canvas.width;
    }
    let y = (Math.random() * stage.canvas.height) + 50 ;
    while (y >= stage.canvas.height - 100 ){
      y = (Math.random() * stage.canvas.height) + 50
    }
    return [x,y];
  }

  setVelocity(fish) {

    this.fishX = 0 - Math.random() * 3;
    fish.vel = this.fishX
    if (this.fishX > -.3){
      this.fishX -= .7
      fish.vel = this.fishX
    }

  }

  increaseVelocity(fish){
    console.log(this);
  }

  draw(stage) {
    const fish = new createjs.Bitmap("./images/fish.png");
    fish.scaleX=this.size;
    fish.scaleY=this.size;
    fish.width = this.size;
    fish.height = this.size;

    const pos = this.randomPosition.bind(this)(stage);
    fish.x = pos[0];
    fish.y = pos[1];
    this.setVelocity.bind(this)(fish);
    stage.addChild(fish);


    createjs.Ticker.addEventListener("tick", handleTick.bind(this));
    function handleTick(e) {

      fish.x += this.fishX;
      if (fish.x > stage.canvas.width + fish.scaleX + 60) {
        fish.x = 0;
        stage.removeChild(fish);
      } else if (fish.x < 0 - fish.scaleX - 60) {
        fish.x = stage.canvas.width;
      }


      stage.update();
    }
    return fish;
  }

}

module.exports = Fish;
