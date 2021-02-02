import p5 from 'p5'
import Animation from './Animation'

class Fireworks extends Animation{
  constructor(p: p5, x: number, y: number) {
    super(p, x, y)
  }

  updateHook() {
  }

  displayHook() {
    const alpha = 255 - (this.currentTime / this.finishTime) * 255
    this.p.translate(this.position.x, this.position.y)
    this.p.stroke(112, 255, 255, alpha)
    this.p.noFill()

    const divNum = 8
    const r = this.p.log(this.currentTime*0.5)*10
    for (let angle = 0; angle < this.p.TWO_PI; angle += this.p.TWO_PI/divNum){
      let x0 = r * this.p.cos(angle)
      let y0 = r * this.p.sin(angle)
      let x1 = (r + 20) * this.p.cos(angle)
      let y1 = (r + 20) * this.p.sin(angle)
      this.p.line(x0,y0,x1,y1)
    }
  }
}

export default Fireworks