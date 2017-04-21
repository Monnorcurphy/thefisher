/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);

class Lure {
  constructor(stage, fisher) {
    this.lure = new createjs.Bitmap("./images/hook.png");
    this.lure.x = fisher.x
    this.lure.y = fisher.y + 42
    this.lure.vel = 5
    this.draw(stage, this.lure)
  }

  draw(stage, lure) {
    lure.scaleX = .12
    lure.scaleY = .13
    stage.addChild(lure)
    return this.lure
  }

}


module.exports = Lure;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(2);

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = true;
  }


  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.pos = this.game.wrap(this.pos);
      } else {
        this.remove();
      }
    }
  }

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir (vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },
  // Find distance between two points.
  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  // Find the length of the vector.
  norm (vec) {
    return Util.dist([0, 0], vec);
  },
  // Return a randomly oriented vector with the given length.
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  wrap (coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Util;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Fisher = __webpack_require__(5);
const Fish = __webpack_require__(4);
const Lure = __webpack_require__(0);

class Game {
  constructor(stage, fisher, difficulty) {
    this.fisher= [];
    this.fish = [];
    stage.canvas.height = 500;
		stage.canvas.width = 700;
    this.stage = stage
    this.lureDeployed= false;
    this.difficulty = difficulty
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


          if (!(this.ticker)){
            this.ticker = createjs.Ticker.addEventListener("tick", handleTick.bind(this));
          }

          function handleTick(e){
            this.lure.y += this.lure.vel

            if (this.lure.y > this.stage.canvas.height + this.lure.scaleY){
              this.stage.removeChild(this.lure)
              this.lureDeployed = false
              this.lure = {}
              return false
            }

            for (let i = 1; i < this.stage.children.length - 1; i++){

              if((Math.abs(this.lure.y - this.stage.children[i].y) <= 20) && (Math.abs(this.lure.x - this.stage.children[i].x) <= 30)){

                this.stage.removeChild(this.lure)
                this.stage.removeChild(this.stage.children[i])
                for(let j = 0; j < this.fish.length; j++){
                  this.fish[j].fishX *= 1.25
                }

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(2);
const MovingObject = __webpack_require__(1);
const Lure= __webpack_require__(0);


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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Lure = __webpack_require__(0);
const Util = __webpack_require__(2);

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(3);

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
  if((document.game.checkKids() == 0) && (this.document.game.difficulty != 'none')){
    victory.innerHTML = 'Congrats!'
  }
}




function updateStats(){
  checkChildren()
  updateAccuracy()

}


document.addEventListener("DOMContentLoaded", function(){

  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  let started = true;
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map