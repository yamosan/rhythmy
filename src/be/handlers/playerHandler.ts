import { Namespace, Server, Socket } from 'socket.io'
import { data } from '../@types/data'

type Nsp = TypedEmitter<Namespace, EventsRecord.PlayerEventsFromClient, EventsRecord.PlayerEventsFromServer>
type Sock = TypedEmitter<Socket, EventsRecord.PlayerEventsFromClient, EventsRecord.PlayerEventsFromServer>

const playerHandler = (io: Server, data: data) => {
  const {players, notes} = data
  const nsp: Nsp = io.of('/player')
  nsp.on('connection', (sock: Sock) => {
    console.log(`player[${sock.id}] connected`)

    sock.on('update', (data: {track: binary[]}) => {
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