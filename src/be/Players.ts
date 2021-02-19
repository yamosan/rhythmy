class Player {
  constructor(
    public readonly id: number,
    public readonly socketId: string
  ) { }
}

export class Players {
  readonly data: Player[]
  readonly limit: number
  randomChoice: boolean

  constructor(limit: number, random?: boolean) {
    this.limit = limit
    this.data = [
      new Player(3, 'default')
    ]
    this.randomChoice = random ? random : true
  }

  setNewPlayer(socketId: string): boolean {
    const id = this.getNewId()
    if (id === -1) return false

    const player = new Player(id, socketId)
    this.data.push(player)
    this.sort()
    return true
  }

  private getNewId() {
    const ids = this.data.map(p => p.id)
    const range = [...Array(this.limit)].map((_,i) => i)
    const empty = range.filter(n => !ids.includes(n))
    if (empty.length === 0) return -1
    
    if (this.randomChoice) {
      return empty[Math.floor(Math.random() * empty.length)]
    } else {
      return empty[0]
    }
  }

  private sort(): void {
    this.data.sort((a, b) => a.id - b.id)
  }
}