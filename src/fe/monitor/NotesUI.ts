import p5 from 'p5'

class NotesUI {
  p: p5
  cells: number[][]
  column: number
  row: number
  ox: number
  oy: number
  cellSize: number

  constructor(p: p5, cells: number[][], ox: number, oy: number, cellSize: number) {
    this.p = p
    this.cells = cells
    this.column = cells===undefined ? 0 : cells.length
    this.row = cells===undefined ? 0 : cells[0].length
    this.ox = ox
    this.oy = oy
    this.cellSize = cellSize
  }

  onClick(mouseX: number, mouseY: number): [x: number, y: number] {
    const xCondition = mouseX + this.ox < this.cellSize * this.row
    const yCondition = mouseY + this.oy < this.cellSize * this.column
    if (xCondition && yCondition) {
      let x = this.p.floor((mouseX - this.ox) / this.cellSize)
      let y = this.p.floor((mouseY - this.oy) / this.cellSize)
      return [x, y]
    } else {
      return [-1, -1]
    }
  }

  drawCell(x: number, y: number) {
    const rectSize = 10
    const color = this.cells[y][x] ? this.p.color(255) : this.p.color(0)
    this.p.translate(this.cellSize / 2 - rectSize / 2, this.cellSize / 2 - rectSize / 2)
    this.p.stroke(255)
    this.p.fill(color)
    this.p.rect(0, 0, rectSize, rectSize)
  }

  display() {
    this.p.push()
    this.p.translate(this.ox, this.oy)
    for (let y = 0; y < this.column; y++) {
      for (let x = 0; x < this.row; x++) {
        this.p.push()
        this.p.translate(this.cellSize * x, this.cellSize * y)
        this.drawCell(x, y)
        this.p.pop()
      }
    }
    this.p.pop()
  }
}

export default NotesUI