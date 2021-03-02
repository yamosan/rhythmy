import { Namespace, Server, Socket } from 'socket.io'
import { data } from '../@types/data'

type Nsp = TypedEmitter<Namespace, EventsRecord.PlayerEventsFromClient, EventsRecord.PlayerEventsFromServer>
type Sock = TypedEmitter<Socket, EventsRecord.PlayerEventsFromClient, EventsRecord.PlayerEventsFromServer>

const playerHandler = (io: Server, models: data) => {
  const nsp: Nsp = io.of('/player')
  nsp.on('connection', (sock: Sock) => {
    console.log(`player[${sock.id}] connected`)
    setup(sock, models)
    updateHandler(sock, models)
    disconnectHandler(sock, models)
  })
}

function setup(sock: Sock, models: data) {
  const { players, notes } = models
  if (players.setNewPlayer(sock.id)) {
    try {
      const id = players.findPlayer(sock.id).id
      sock.emit('start', { notes: notes.data[id], id: id })
    } catch (err) {
      console.log(err)
    }
  } else {
    // TODO: 満員のとき
  }
}

function updateHandler(sock: Sock, models: data) {
  const { players, notes } = models
  sock.on('update', (data: {track: binary[]}) => {
    try {
      const id = players.findPlayer(sock.id).id
      notes.replaceTrack(id, data.track)
      console.log('LOG: notes is updated')
    } catch(err) {
      console.log(err)
    }
  })
}

function disconnectHandler(sock: Sock, models: data) {
  const { players, notes } = models
  sock.on('disconnect', () => {
    console.log(`player[${sock.id}] disconnected`)
    try {
      const id = players.deletePlayer(sock.id).id
      notes.resetTrack(id)
    } catch(err) {
      console.log(err)
    }
  })
}

export default playerHandler