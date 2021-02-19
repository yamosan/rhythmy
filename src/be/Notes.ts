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

  replaceTrack(track: number[], id: number): number[][] {
    return this.data
  }

  resetTrack(id: number): number[][] {
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
}
