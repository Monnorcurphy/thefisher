const Util = require("./util");
const MovingObject = require("./moving_object");
const Lure= require("./lure");


class Fish {
  constructor(stage, velocity = 0, pos = undefined) {

    this.fishX = -1;
    this.size = .1;
    this.vel = velocity
    this.setVelocity = this.setVelocity.bind(this)
    this.pos = pos
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
    if (this.vel > -.3){
      // console.log('here');
      this.fishX = 0 - Math.random() * 3;
      this.vel = this.fishX
    }else if(!(this.vel)){
      
      this.fishX = 0 - Math.random() * 3;
      this.vel = this.fishX
    }

  }


  draw(stage) {
    const fish = new createjs.Bitmap("./images/fish.png");
    fish.scaleX=this.size;
    fish.scaleY=this.size;
    fish.width = this.size;
    fish.height = this.size;

    if (this.pos == undefined){
      const pos = this.randomPosition.bind(this)(stage);
      fish.x = pos[0];
      fish.y = pos[1];
    }
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
