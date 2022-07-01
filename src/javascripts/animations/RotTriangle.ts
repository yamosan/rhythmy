import p5 from "p5";
import sound from "../../assets/sounds/e.mp3";
import Animation from "./Animation";

class RotTriangle extends Animation {
  constructor(p: p5, x: number, y: number) {
    super(p, x, y, sound);
  }

  updateHook() {}

  displayHook() {
    const alpha = 255 - (this.currentTime / this.finishTime) * 255;
    const size = this.currentTime * 0.7;
    this.p.translate(this.position.x, this.position.y);
    this.p.rotate(this.currentTime * 0.02);
    this.p.noFill();
    this.p.stroke(28, 255, 255, alpha);
    for (let i = 0; i <= 1; i++) {
      this.p.rotate(i * this.currentTime * 0.02);
      this.p.beginShape();
      let divNum = 3;
      let inc = this.p.TWO_PI / divNum;
      for (let angle = 0; angle <= this.p.TWO_PI; angle += inc) {
        let x = size * this.p.cos(angle);
        let y = size * this.p.sin(angle);
        this.p.vertex(x, y);
      }
      this.p.endShape(this.p.CLOSE);
    }
  }
}

export default RotTriangle;
