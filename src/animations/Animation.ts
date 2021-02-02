import p5 from 'p5'

abstract class Animation {
  p: p5
  initPos: p5.Vector
  position: p5.Vector
  alive: boolean
  currentTime: number
  finishTime: number
  abstract display(): void
  abstract updated(): void

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
      this.updated()
    }
    // 終了
    if (this.isFinished()) {
      this.finish()
    }
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

  private finish() {
    this.alive = false
    this.currentTime = 0
    this.position = this.initPos.copy()
  }
}

export default Animation