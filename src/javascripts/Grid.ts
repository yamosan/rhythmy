import p5 from "p5";

abstract class Grid {
  p: p5;
  cells: number[][];
  column: number;
  row: number;
  ox: number;
  oy: number;
  cellSize: number;
  currentStep: number;
  abstract updateCell(x: number, y: number): void;
  abstract displayCell(x: number, y: number): void;

  constructor(
    p: p5,
    cells: number[][],
    ox: number,
    oy: number,
    cellSize: number,
    currentStep: number
  ) {
    this.p = p;
    this.cells = cells;
    this.column = cells === undefined ? 0 : cells.length;
    this.row = cells === undefined ? 0 : cells[0].length;
    this.ox = ox;
    this.oy = oy;
    this.cellSize = cellSize;
    this.currentStep = currentStep;
  }

  update(cells: number[][], currentStep: number) {
    this.cells = cells;
    this.currentStep = currentStep;
    for (let y = 0; y < this.column; y++) {
      for (let x = 0; x < this.row; x++) {
        this.updateCell(x, y);
      }
    }
  }

  display() {
    this.p.push();
    this.p.translate(this.ox, this.oy);
    for (let y = 0; y < this.column; y++) {
      for (let x = 0; x < this.row; x++) {
        this.p.push();
        this.p.translate(this.cellSize * x, this.cellSize * y);
        this.displayCell(x, y);
        this.p.pop();
      }
    }
    this.p.pop();
  }
}

export default Grid;
