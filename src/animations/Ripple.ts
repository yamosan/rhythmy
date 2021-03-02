import p5 from 'p5'
import sound from 'sounds/a.mp3'
import Animation from './Animation'

class Ripple extends Animation {
  constructor(p: p5, x: number, y: number) {
    super(p, x, y, sound)
  }

  updateHook() {
  }

  displayHook() {
    const alpha = 255 - (this.currentTime / this.finishTime) * 255
    this.p.noFill()
    this.p.stroke(255, alpha)
    const size = this.currentTime
    this.p.ellipse(this.position.x, this.position.y, size, size)
  }
}

export default Ripple