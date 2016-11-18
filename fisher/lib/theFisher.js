const Game = require("./game");

document.onkeydown = keyPressed;

function keyPressed(event){
    switch (event.keyCode) {
      case (40):
      case (32):
        document.game.fisher.castLure()
        break;
      case(39):
      case (68):
        document.game.fisher.updatePosition(document.game.fisher.fisher.x + 4)
        break;
      case(37):
      case (65):
        document.game.fisher.updatePosition(document.game.fisher.fisher.x - 4)
        break;
      case (83):
          document.game.fisher.castLure()
        break;
      default:


    }
  }

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  this.ctx = canvasEl.getContext("2d");
  this.stage = new createjs.Stage(canvas)
  this.game = new Game(this.stage, {radius: 0});


});
