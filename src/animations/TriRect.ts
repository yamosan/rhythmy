import p5 from 'p5'
import sound from 'sounds/b.mp3'
import Animation from './Animation'

class TriRect extends Animation{
  constructor(p: p5, x: number, y: number) {
    super(p, x, y, sound)
  }

  updateHook() {
  }

  displayHook() {
    const alpha = 255 - (this.currentTime / this.finishTime) * 255
    const size = (this.currentTime) 
    this.p.translate(this.position.x, this.position.y)
    this.p.rectMode(this.p.CENTER)
    this.p.stroke(76, 255, 255, alpha)
    this.p.noFill()

    this.p.rect(-20, 20, size, size)
    if (this.currentTime > 10) {
      this.p.rect(0, 0, size - 10, size - 10)
      if (this.currentTime > 20) {
        this.p.rect(20, -20, size - 20, size - 20)
      }
    }
  }
}

export default TriRect