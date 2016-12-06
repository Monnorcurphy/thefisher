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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Fisher = __webpack_require__(2);
	const Fish = __webpack_require__(6);
	
	class Game {
	  constructor(stage, fisher, difficulty) {
	
	    this.fisher= [];
	    this.fish = [];
	    stage.canvas.height = 500;
			stage.canvas.width = 700;
	    if (fisher.x === undefined){
	      this.createFisher(stage, {})
	      this.createFish.bind(this)(stage, difficulty);
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
	
	  createFish(stage, difficulty) {
	    
	    if(difficulty === 'easy'){
	      for (let i = 0; i < 5; i++) {
	        const fish = new Fish(stage);
	        this.fish = this.fish.concat(fish);
	        this.fish.alpha = 0;
	      }
	    }else if(difficulty === 'medium'){
	      for (let i = 0; i < 10; i++) {
	        const fish = new Fish(stage);
	        this.fish = this.fish.concat(fish);
	        this.fish.alpha = 0;
	      }
	    }else if(difficulty=== 'hard'){
	      for (let i = 0; i < 20; i++) {
	        const fish = new Fish(stage);
	        this.fish = this.fish.concat(fish);
	        this.fish.alpha = 0;
	      }
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Lure = __webpack_require__(5);
	const Util = __webpack_require__(4);
	
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
	
	  castLure() {
	    if(this.lureDeployed == false){
	      this.lureDeployed = true
	      let lure = new createjs.Bitmap("./images/hook.png");
	
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
	          lure = {}
	          return 'false'
	        }
	
	        for (let i = 1; i < this.stage.children.length - 1; i++){
	
	          if((Math.abs(lure.y - this.stage.children[i].y) <= 20) && (Math.abs(lure.x - this.stage.children[i].x) <= 30)){
	            this.stage.removeChild(lure)
	            this.stage.removeChild(this.stage.children[i])
	            lure = {}
	            this.lureDeployed = false
	            return 'false'
	          }
	          }
	        }
	
	        this.stage.update
	      }
	    }
	
	      return true;
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	
	class MovingObject {
	  constructor(options) {
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.radius = options.radius;
	    this.color = options.color;
	    this.game = options.game;
	    this.isWrappable = true;
	  }
	
	  collideWith(otherObject) {
	    // default do nothing
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
	    //timeDelta is number of milliseconds since last move
	    //if the computer is busy the time delta will be larger
	    //in this case the MovingObject should move farther in this frame
	    //velocity of object is how far it should move in 1/60th of a second
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


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	
	class Lure extends MovingObject {
	  constructor(options) {
	    options.radius = Lure.RADIUS;
	    super(options);
	    this.isWrappable = false;
	  }
	}
	
	Lure.RADIUS = 2;
	Lure.SPEED = 15;
	
	module.exports = Lure;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(3);
	const Lure= __webpack_require__(5);
	
	
	class Fish {
	  constructor(stage) {
	    this.fishX = -1;
	    this.size = .1
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map