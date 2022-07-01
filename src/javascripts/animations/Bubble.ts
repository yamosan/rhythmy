import p5 from "p5";
import sound from "../../assets/sounds/d.mp3";
import Animation from "./Animation";

class Bubble extends Animation {
  ballNum: number;
  balls: p5.Vector[];

  constructor(p: p5, x: number, y: number) {
    super(p, x, y, sound);
    this.ballNum = 14;
    this.balls = this.initializeBalls();
  }

  updateHook() {}

  displayHook() {
    this.p.translate(this.position.x, this.position.y);
    this.p.noFill();
    this.balls.forEach((ball, idx) => {
      this.p.push();
      this.p.translate(ball.x, ball.y);
      let size = this.currentTime * 1.2 - 10 * idx;
      let max = 50;
      let alpha = this.p.map(size, max, 0, 0, 255);
      this.p.stroke(140, 255, 255, alpha);
      if (size < 0) size = 0;
      if (size > max) size = max;
      if (size > 0 && size < max) {
        this.p.ellipse(0, 0, size, size);
      }
      this.p.pop();
    });
  }

  private initializeBalls(): p5.Vector[] {
    const balls = [];
    for (let i = 0; i < this.ballNum; i++) {
      balls.push(
        this.p.createVector(this.p.random(-30, 30), this.p.random(-30, 30))
      );
    }
    return balls;
  }
}

export default Bubble;
