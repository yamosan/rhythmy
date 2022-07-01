import p5 from "p5";
import * as Tone from "tone";
import NotesUI from "../../NotesUI";
import AnimationsUI from "../../AnimationsUI";
import animations from "../../animationList";
import { TypedSocket } from "../../types";

type Store = {
  cells: Binary[][];
  id?: number;
};

let sock: TypedSocket;

let store: Store = {
  cells: [],
};
let nTracks = 0;
let nSteps = 0;

function sketch(p: p5) {
  // cells
  let cellSize = 0;
  let topMargin = 0;
  let leftMargin = 0;
  let currentStep = 0;
  // UI
  let notesUI: NotesUI;
  let animUI: AnimationsUI;
  // beat
  let beats = 0;

  function windowObserver() {
    if (window.innerWidth !== p.width || window.innerHeight !== p.height) {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
      setupSize(p.width, p.height);
      setupUI();
    }
  }

  function setupSize(w: number, h: number) {
    if (nSteps === 0 || nTracks === 0) return;
    if (w / nSteps > h / nTracks) {
      cellSize = h / nTracks;
      topMargin = 0;
      leftMargin = (w - cellSize * nSteps) / 2;
    } else {
      cellSize = w / nSteps;
      topMargin = (h - cellSize * nTracks) / 2;
      leftMargin = 0;
    }
  }

  function setupUI() {
    if (store.id === undefined) {
      throw new Error("store is not initialized");
    }
    animUI = new AnimationsUI(
      p,
      store.cells,
      leftMargin,
      topMargin,
      cellSize,
      currentStep,
      [animations[store.id]]
    );
    notesUI = new NotesUI(
      p,
      store.cells,
      leftMargin,
      topMargin,
      cellSize,
      currentStep
    );
  }

  function onBeat(time: number) {
    beats++;
    currentStep = beats % nSteps;
    animUI.play(currentStep, time);
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    Tone.Transport.bpm.value = 160;
    Tone.Transport.scheduleRepeat(onBeat, "8n");
    setupSize(p.width, p.height);
    setupUI();
  };

  p.draw = () => {
    windowObserver();
    p.background(0);
    notesUI.update(store.cells, currentStep);
    notesUI.display();

    animUI.update(store.cells, currentStep);
    animUI.display();
  };

  p.mousePressed = () => {
    resumeContext();
    const [x, y] = notesUI.onClick(p.mouseX, p.mouseY);
    if (x !== -1 || y !== -1) {
      store.cells[y][x] = store.cells[y][x] === 0 ? 1 : 0;
      sock.emit("player:update", { track: store.cells[0] });
    }
  };
}

function resumeContext() {
  // https://github.com/Tonejs/Tone.js/issues/341
  if (Tone.context.state !== "running") {
    Tone.context.resume().then(() => {
      Tone.Transport.start();
    });
  }
}

function defineReceiver() {}

function initializeStore(data: { notes: Binary[]; id: number }) {
  store.cells = [data.notes];
  store.id = data.id;
  nTracks = 1;
  nSteps = data.notes.length;
}

function defineSketch(
  socket: TypedSocket,
  initData: { notes: Binary[]; id: number }
) {
  sock = socket;
  defineReceiver();
  initializeStore(initData);
  return sketch;
}

export default defineSketch;
