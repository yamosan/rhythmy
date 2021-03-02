import p5 from 'p5'
import Grid from './Grid'

class NotesUI extends Grid {
  currentStep: number

  constructor(p: p5, cells: number[][], ox: number, oy: number, cellSize: number, currentStep: number) {
    super(p, cells, ox, oy, cellSize, currentStep)
  }

  onClick(mouseX: number, mouseY: number): [x: number, y: number] {
    const xCondition = (this.ox < mouseX) && (mouseX < this.ox + this.cellSize * this.row)
    const yCondition = (this.oy < mouseY) && (mouseY < this.oy + this.cellSize * this.column)
    if (xCondition && yCondition) {
      let x = this.p.floor((mouseX - this.ox) / this.cellSize)
      let y = this.p.floor((mouseY - this.oy) / this.cellSize)
      return [x, y]
    } else {
      return [-1, -1]
    }
  }

  updateCell(x: number, y: number) {}

  displayCell(x: number, y: number) {
    // currentStep
    if (x === this.currentStep) {
      const color = this.cells[y][x] ? this.p.color(255, 100) : this.p.color(255, 10)
      this.p.fill(color)
      this.p.rect(0, 0, this.cellSize, this.cellSize)
    }

    // button
    const rectSize = 10
    const color = this.cells[y][x] ? this.p.color(255) : this.p.color(0)
    this.p.translate(this.cellSize / 2 - rectSize / 2, this.cellSize / 2 - rectSize / 2)
    this.p.stroke(255)
    this.p.fill(color)
    this.p.rect(0, 0, rectSize, rectSize)
  }
}

export default NotesUI