import p5 from 'p5'

abstract class Animation {
  p: p5
  initPos: p5.Vector
  position: p5.Vector
  alive: boolean
  currentTime: number
  finishTime: number
  abstract displayHook(): void
  abstract updateHook(): void

  constructor(p: p5, x: number, y: number) {
    this.p = p
    this.initPos = p.createVector(x, y)
    this.position = this.initPos.copy()
    this.alive = false
    this.currentTime = 0
    this.finishTime = 150
  }

  update() {
    // 更新
    if (this.alive) {
      this.currentTime++
      this.updateHook()
    }
    // 終了
    if (this.isFinished()) {
      this.finish()
    }
  }
  
  display() {
    this.p.push()
    if (this.alive) {
      this.p.colorMode(this.p.HSB, 255)
      this.displayHook()
    }
    this.p.pop()
  }

  play() {
    if (this.alive) {
      this.finish()
    }
    this.alive = true
  }

  private isFinished() {
    if (this.currentTime >= this.finishTime) {
      return true
    }
    return false
  }

  protected finish() {
    this.alive = false
    this.currentTime = 0
    this.position = this.initPos.copy()
  }
}

export default Animation