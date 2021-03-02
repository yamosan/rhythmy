import p5 from 'p5'
import * as Tone from 'tone'
import { Socket } from 'socket.io-client'
import NotesUI from '../NotesUI'
import AnimationsUI from '../AnimationsUI'
import animations from '../animations'

type Sock = TypedEmitter<Socket, EventsRecord.MonitorEventsFromServer, EventsRecord.MonitorEventsFromClient>
type Store = {
  cells: binary[][]
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
  let animUI: AnimationsUI
  // beat
  let beats = 0

  function windowObserver() {
    if (window.innerWidth !== p.width || window.innerHeight !== p.height) {
      p.resizeCanvas(window.innerWidth, window.innerHeight)
      setupSize(p.width, p.height)
      setupUI()
    }
  }

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

  function setupUI() {
    animUI = new AnimationsUI(p, store.cells, leftMargin, topMargin, cellSize, currentStep, animations)
    notesUI = new NotesUI(p, store.cells, leftMargin, topMargin, cellSize, currentStep)
  }

  function onBeat(time: number) {
    beats++
    currentStep = (beats) % nSteps
    animUI.play(currentStep, time)
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    Tone.Transport.bpm.value = 160
    Tone.Transport.scheduleRepeat(onBeat, "8n")
    setupSize(p.width, p.height)
    setupUI()
  }
  
  p.draw = () => {
    windowObserver()
    p.background(0)
    notesUI.update(store.cells, currentStep)
    notesUI.display()

    animUI.update(store.cells, currentStep)
    animUI.display()
  }

  p.mousePressed = () => {
    resumeContext()
    const [x, y] = notesUI.onClick(p.mouseX, p.mouseY)
    if (x !== -1 || y !== -1) {
      store.cells[y][x] = store.cells[y][x] === 0 ? 1 : 0
    }
  }
}

function resumeContext() {
  // https://github.com/Tonejs/Tone.js/issues/341
  if (Tone.context.state !== 'running') {
    Tone.context.resume().then(() => {
      Tone.Transport.start()
    })
  }
}

function defineReceiver() {
  sock.on('update', (data) => {
    console.log('[update]', data.notes)
    initializeStore(data)
  })
}

function initializeStore(data: { notes: binary[][] }) {
  store.cells = data.notes
  nTracks = data.notes.length
  nSteps = data.notes[0].length
}

function defineSketch(socket: Sock, initData: { notes: binary[][] }) {
  sock = socket
  defineReceiver()
  initializeStore(initData)
  return sketch
}

export default defineSketch