import { Server, Socket } from 'socket.io'
import { data } from '../@types/data'

const playerHandler = (io: Server, data: data) => {
  const {players, notes} = data
  const nsp = io.of('/player')
  nsp.on('connection', (sock: Socket) => {
    console.log(`player[${sock.id}] connected`)

    sock.on('update', (data: {track: number[]}) => {
      try {
        const id = players.findPlayer(sock.id).id
        notes.replaceTrack(id, data.track)
        console.log('LOG: notes is updated')
      } catch(err) {
        console.log(err)
      }
    })
    sock.on('disconnect', () => {
      console.log(`player[${sock.id}] disconnected`)
    })
  })
}

export default playerHandler