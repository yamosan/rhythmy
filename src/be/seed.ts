import { Players, Player } from './Players'
import { Notes } from './Notes'

export default function seed(data: { players: Players, notes: Notes }) {
  const { players, notes } = data
  const player = new Player(3, 'default')
  players.setPlayer(player)

  notes.replaceTrack(player.id, [1,0,0,0,1,0,0,0,1,0,0,0])
}