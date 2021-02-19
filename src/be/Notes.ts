export class Notes {
  readonly data: number[][]
  readonly nSteps: number
  readonly nTracks: number
  observer: () => void

  constructor(nTracks: number, nSteps: number) {
    this.nSteps = nSteps
    this.nTracks = nTracks
    this.data = this.initializeData()
    this.observer = () => { }
  }

  replaceTrack(id: number, track: number[]): number[][] {
    this.validateId(id)
    this.validateTrack(track)
    this.data[id] = track

    this.observer()
    return this.data
  }

  resetTrack(id: number): number[][] {
    this.validateId(id)
    this.data[id] = new Array(this.nSteps).fill(0)

    this.observer()
    return this.data
  }

  setObserver(onChange: () => void) {
    this.observer = onChange
  }

  private initializeData(): number[][] {
    const data = []
    for (let i = 0; i < this.nTracks; i++){
      data.push([])
      for (let j = 0; j < this.nSteps; j++){
        data[i].push(0)
      }
    }
    return data
  }

  // TODO: デコレータ化する
  private validateId(id: number): never | void {
    if (!(0 <= id && id < this.nTracks)) throw new Error(`id must be between 0 and ${this.nTracks-1}`)
  }

  private validateTrack(track: any[]): never | void {
    if (!(track.length === this.nSteps)) throw new Error(`track is invalid`)
    track.forEach(step => {
      if (!(step === 0 || step === 1)) throw new Error(`track is invalid`)
    })
  }
}
