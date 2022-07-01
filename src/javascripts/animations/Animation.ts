import p5 from "p5";
import * as Tone from "tone";

type Sound = string | AudioBuffer | Tone.ToneAudioBuffer;

abstract class Animation {
  p: p5;
  initPos: p5.Vector;
  position: p5.Vector;
  alive: boolean;
  currentTime: number;
  finishTime: number;
  sound?: Tone.Player;
  allowSound: boolean;
  abstract displayHook(): void;
  abstract updateHook(): void;

  constructor(p: p5, x: number, y: number, sound?: Sound) {
    this.p = p;
    this.initPos = p.createVector(x, y);
    this.position = this.initPos.copy();
    this.alive = false;
    this.currentTime = 0;
    this.finishTime = 150;
    // sound
    if (sound) this.sound = new Tone.Player(sound).toDestination();
    this.allowSound = true;
  }

  update() {
    // 更新
    if (this.alive) {
      this.currentTime++;
      this.updateHook();
    }
    // 終了
    if (this.isFinished()) {
      this.finish();
    }
  }

  display() {
    this.p.push();
    if (this.alive) {
      this.p.colorMode(this.p.HSB, 255);
      this.p.strokeWeight(2);
      this.displayHook();
    }
    this.p.pop();
  }

  play(time?: number) {
    if (this.alive) {
      this.finish();
    }
    this.alive = true;
    if (time && this.sound && this.allowSound) {
      this.sound.start(time);
    }
  }

  private isFinished() {
    if (this.currentTime >= this.finishTime) {
      return true;
    }
    return false;
  }

  protected finish() {
    this.alive = false;
    this.currentTime = 0;
    this.position = this.initPos.copy();
  }
}

export default Animation;
