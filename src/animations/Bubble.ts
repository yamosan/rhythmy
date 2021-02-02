import p5 from 'p5'
import Animation from './Animation'

class Bubble extends Animation{
  balls: p5.Vector[]

  constructor(p: p5, x: number, y: number) {
    super(p, x, y)
    this.balls = []
  }

  updateHook() {
    if (this.currentTime === 1) {
      this.balls = []
      for (let i = 0; i < 14; i++) {
        this.balls.push(this.p.createVector(this.p.random(-30, 30), this.p.random(-30, 30)))
      }
    }
  }

  displayHook() {
    this.p.translate(this.position.x, this.position.y)
    this.p.noFill()
    this.balls.forEach((ball,idx) => {
      this.p.push()
      this.p.translate(ball.x, ball.y)
      let size = this.currentTime*1.2 - 10*idx
      let max = 50
      let alpha = this.p.map(size, max, 0, 0, 255)
      this.p.stroke(140, 255, 255, alpha)
      if (size < 0) size = 0
      if (size > max) size = max
      if (size > 0 && size < max) {
        this.p.ellipse(0, 0, size, size)
      }
      this.p.pop()
    })
  }
}

export default Bubble