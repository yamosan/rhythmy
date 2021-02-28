import p5 from 'p5'
import { Socket } from 'socket.io-client'
import NotesUI from './NotesUI'
import * as Tone from 'tone'

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
  let cellSize = 0
  let topMargin = 0
  let leftMargin = 0
  let currentStep = 0
  // UI
  let notesUI: NotesUI
  // beat
  let beats = 0

  function setupSize(w: number, h: number) {
    if (nSteps === 0 || nTracks === 0) return
    if (w / nSteps > h / nTracks) {
      cellSize = h / nTracks
      topMargin = 0
      leftMargin = (w - cellSize * nSteps) / 2
    } else {
      cellSize = w / nSteps
      topMargin = (h - cellSize * nTracks) / 2
      leftMargin = 0
    }
  }

  function onBeat(time: number) {
    for (let track = 0; track < nTracks; track++) {
      if (store.cells[track][currentStep] == 1) {
        // animations[track][currentStep].play(time)
      }
    }
    beats++
    currentStep = (beats) % nSteps
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.colorMode(p.HSB, 255)
    p.strokeWeight(2)
    Tone.Transport.bpm.value = 160
    Tone.Transport.scheduleRepeat(onBeat, "8n")
  }
  
  p.draw = () => {
    setupSize(p.width, p.height)
    p.background(0)

    notesUI = new NotesUI(p, store.cells, leftMargin, topMargin, cellSize, currentStep)
    notesUI.display()
  }

  p.mousePressed = () => {
    resumeContext()
    const [x, y] = notesUI.onClick(p.mouseX, p.mouseY)
    if (x !== -1 || y !== -1) {
      store.cells[y][x] = store.cells[y][x] === 0 ? 1 : 0
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
}

function resumeContext () {
  // https://github.com/Tonejs/Tone.js/issues/341
  if (Tone.context.state !== 'running') {
    Tone.context.resume()
  }
  Tone.Transport.start()
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