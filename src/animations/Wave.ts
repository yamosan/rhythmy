import p5 from 'p5'
import Animation from './Animation'

let p: p5

class Wave extends Animation {
  constructor(p: p5, x: number, y: number) {
    super(p, x, y)
  }

  updateHook() {
  }

  displayHook() {
    const alpha = 255 - (this.currentTime / this.finishTime) * 255
    this.p.noFill()
    this.p.stroke(235, 255, 255, alpha)
    this.p.translate(this.position.x, this.position.y)
    const r = this.currentTime / 2
    const rDiv = r * 0.2
    this.p.beginShape()
    for (let angle = 0; angle < this.p.TWO_PI; angle += 0.1) {
      let noise = this.p.noise((this.p.cos(angle) + 100) * 10, (this.p.sin(angle) + 100) * 10, this.currentTime * 0.1)
      let pR = r + rDiv * (this.p.map(noise, 0, 1, -1, 1))
      let x = pR * this.p.cos(angle)
      let y = pR * this.p.sin(angle)
      this.p.vertex(x,y)
    }
    this.p.endShape()
  }
}

export default Wave