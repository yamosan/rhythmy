export class Player {
  constructor(
    public readonly id: number,
    public readonly socketId: string
  ) { }
}

export class Players {
  readonly data: Player[]
  readonly limit: number
  randomChoice: boolean

  constructor(limit: number, random = true) {
    this.limit = limit
    this.data = []
    this.randomChoice = random
  }

  setPlayer(player: Player): boolean {
    const match = this.data.find(p => p.id === player.id || p.socketId === player.socketId)
    if (match) return false
    this.data.push(player)
    this.sort()
    return true
  }

  setNewPlayer(socketId: string): boolean {
    const id = this.getNewId()
    if (id === -1) return false

    const player = new Player(id, socketId)
    this.data.push(player)
    this.sort()
    return true
  }

  findPlayer(socketId: string): Player | never {
    const result = this.data.find(p => p.socketId === socketId)
    if (result) {
      return { ...result }
    } else {
      throw new Error(`Players(socketId: ${socketId}) is not found`)
    }
  }

  deletePlayer(socketId: string): Player | never {
    const player = this.findPlayer(socketId)
    this.data.filter(p => p.socketId !== socketId)
    return { ...player }
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