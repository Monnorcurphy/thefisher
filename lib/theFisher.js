const Game = require("./game");

document.onkeydown = keyPressed;

function keyPressed(event){

  let hook;
    switch (event.keyCode) {
      case (40):
      case (83):
      
        hook = document.game.fisher.castLure()
        if(hook){
          document.game.count +=1
        }

        break;
      case(39):
      case (68):
        document.game.fisher.updatePosition(document.game.fisher.fisher.x + 4)
        break;
      case(37):
      case (65):
        document.game.fisher.updatePosition(document.game.fisher.fisher.x - 4)
        break;
      default:


    }
  }



document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  let restart = document.getElementById("restart");
  let easy = document.getElementById("easy");
  let medium = document.getElementById("medium");
  let hard = document.getElementById("hard");


  restart.onclick = reset;
  easy.onclick = setEasy;
  medium.onclick = setMedium;
  hard.onclick = setHard;

  this.ctx = canvasEl.getContext("2d");
  this.stage = new createjs.Stage(canvas)
  this.game = new Game(this.stage, {radius: 0}, 'none');
  this.game.difficulty = 'none'
  // document.game.score = document.getElementById("score");

  function reset (){

    document.stage.removeAllChildren(document.stage.children)
    document.stage = new createjs.Stage(canvas)
    let difficulty = document.game.difficulty
    document.game = new Game(document.stage, {radius: 0}, document.game.difficulty);
    document.game.difficulty = difficulty

  }

  function setEasy(){

    if (this.game){
      document.game.difficulty = 'easy'
      reset()
    }else{
      this.game = new Game(document.stage, {radius: 0}, 'easy');
      document.game.difficulty = 'easy'
      reset()
    }

  }

  function setMedium(){
    if (this.game){
      document.game.difficulty = 'medium'
      reset()
    }else{
      this.game = new Game(document.stage, {radius: 0}, 'medium');
      document.game.difficulty = 'medium'
      reset()
    }

  }

  function setHard(){
    if (this.game){
      document.game.difficulty = 'hard'
      reset()
    }else{
      this.game = new Game(document.stage, {radius: 0}, 'hard');
      document.game.difficulty = 'hard'
      reset()
    }

  }


});
