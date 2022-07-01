import p5 from "p5";
import sound from "../../assets/sounds/c.mp3";
import Animation from "./Animation";

class RotRect extends Animation {
  constructor(p: p5, x: number, y: number) {
    super(p, x, y, sound);
  }

  updateHook() {}

  displayHook() {
    const alpha = 255 - (this.currentTime / this.finishTime) * 255;
    const size = this.currentTime;
    this.p.translate(this.position.x, this.position.y);
    this.p.rotate(this.currentTime * 0.02);
    this.p.noFill();
    this.p.stroke(0, 255, 255, alpha);
    this.p.rectMode(this.p.CENTER);
    this.p.rect(0, 0, size, size);
    this.p.rotate(this.currentTime * 0.02);
    this.p.rect(0, 0, size, size);
  }
}

export default RotRect;
