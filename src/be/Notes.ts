export class Notes {
  data: number[][]
  nSteps: number
  nTracks: number
  onChange: () => void

  constructor(nTracks: number, nSteps: number, onChange?: () => void) {
    this.nSteps = nSteps
    this.nTracks = nTracks
    this.data = this.initializeData()
    this.onChange = onChange !== undefined ? onChange : () => { }
  }

  replaceTrack(id: number, track: number[]): number[][] {
    this.validateId(id)
    this.validateTrack(track)
    this.data[id] = track
    return this.data
  }

  resetTrack(id: number): number[][] {
    this.validateId(id)
    this.data[id] = new Array(this.nSteps).fill(0)
    return this.data
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
