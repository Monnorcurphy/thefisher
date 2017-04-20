const Game = require("./game");

document.onkeydown = keyPressed;

function keyPressed(event){
  let hook;
    switch (event.keyCode) {
      case (40):
      case (83):
        document.game.castLure()
      case(39):
      case (68):
        document.game.updatePosition(4)

        break;
      case(37):
      case (65):
        document.game.updatePosition(- 4)
        break;
      default:
    }
  }


function checkChildren(){
  document.fish.innerHTML= `Fish Remaining: ${document.game.checkKids()}`
}

function updateAccuracy(){
  let rate;
  if (document.count === 0){
    rate = 100
  }
  if (document.game.checkKids() === document.total){
    rate = 0
  } else{
    rate =(document.total - document.game.checkKids())/document.count;
  }
  if(!rate){
    rate = 100
  }
  accuracy.innerHTML = `Accuracy: ${rate}%`
}

function updateSpeed(){
  fishRemaining = document.total -document.game.checkKids()
  if (document.total){
    if(fishRemaining === 0){
      speed.innerHTML = `Speed: ${100 * 1}%`
    }else if (fishRemaining === document.total){
      victory.innerHTML = 'Congrats!'
    }
    else{
      speed.innerHTML = `Speed: ${100 * (1.5 * fishRemaining)}%`
    }
  }

}


function updateStats(){
  checkChildren()
  updateAccuracy()
  updateSpeed()
}


document.addEventListener("DOMContentLoaded", function(){

  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  let restart = document.getElementById("restart");
  let easy = document.getElementById("easy");
  let medium = document.getElementById("medium");
  let hard = document.getElementById("hard");
  let accuarcy = document.getElementById("accuracy");
  let speed = document.getElementById('speed')
  let victory = document.getElementById('victory')
   document.fish = document.getElementById("fish-count")
   document.count = 0


  restart.onclick = reset;
  easy.onclick = setEasy;
  medium.onclick = setMedium;
  hard.onclick = setHard;

  this.ctx = canvasEl.getContext("2d");
  this.stage = new createjs.Stage(canvas)
  this.game = new Game(this.stage, {radius: 0}, 'none');
  this.game.difficulty = 'none'


  function reset (){

    document.stage.removeAllChildren(document.stage.children)
    document.stage = new createjs.Stage(canvas)
    let difficulty = document.game.difficulty
    document.game = new Game(document.stage, {radius: 0}, document.game.difficulty);
    document.game.difficulty = difficulty
    document.fish.innerHTML= `Fish Remaining: ${document.game.fish.length}`
    document.count = 0
    document.total = document.game.checkKids()
    victory.innerHTML = ''
    let intervalID = window.setInterval(updateStats, 500);
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
  document.fish.innerHTML = `Fish Remaining: ${document.game.fish.length}`

  let intervalID = window.setInterval(updateStats, 500);



});
