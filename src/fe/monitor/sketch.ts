import p5 from 'p5'
import { Socket } from 'socket.io-client'

type Sock = TypedEmitter<Socket, EventsRecord.MonitorEventsFromServer, EventsRecord.MonitorEventsFromClient>
type Store = {
  cells: number[][]
}

let sock: Sock
let store: Store = {
  cells: undefined
}
let nTracks = 0
let nSteps = 0

function sketch(p: p5) {
  // cells
  let cellSize = 60
  let topMargin = 0
  let leftMargin = 0

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.colorMode(p.HSB, 255)
    p.strokeWeight(2)
  }
  
  p.draw = () => {
    p.background(0)
    p.fill(200)
    for (let y = 0; y < nTracks; y++) {
      for (let x = 0; x < nSteps; x++) {
        // console.log(store.cells[y][x])
        p.stroke(255)
        const color = store.cells[y][x] === 0 ? p.color(0) : p.color(255)
        p.fill(color)
        p.push()
        p.translate(cellSize/2-5, cellSize/2-5)
        p.rect(cellSize + cellSize * x, cellSize + cellSize * y, 10, 10)
        p.pop()
      }
    }
  }
}

function defineReceiver() {
  sock.on('update', (data) => {
    console.log('[update]', data.notes)
    store.cells = data.notes
    nTracks = data.notes.length
    nSteps = data.notes[0].length
  })
}

function defineSketch(socket: Sock) {
  sock = socket
  defineReceiver()
  return sketch
}

export default defineSketch