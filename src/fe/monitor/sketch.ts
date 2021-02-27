import p5 from 'p5'
import { Socket } from 'socket.io-client'

type Sock = TypedEmitter<Socket, EventsRecord.MonitorEventsFromServer, EventsRecord.MonitorEventsFromClient>
type Data = {
  cells: number[][]
}

let sock: Sock
let data: Data

function sketch (p: p5) {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.colorMode(p.HSB, 255)
    p.strokeWeight(2)
  }
  
  p.draw = () => {
    p.background(0)
  }
}

function defineReceiver() {
  sock.on('update', (data) => {
    console.log(data.notes)
  })
}

function defineSketch(socket: Sock) {
  sock = socket
  defineReceiver()
  return sketch
}

export default defineSketch