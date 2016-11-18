class GameView {
  constructor(stage, game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.stage = stage;
  }

  
  start() {

    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }


  animate(time) {
    const timeDelta = time - this.lastTime;

    this.stage.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  "a": [-1,  0],
  "d": [ 1,  0]
};

module.exports = GameView;
