import { Server, Socket, Namespace } from 'socket.io'
import { data } from '../@types/data'

type Nsp = TypedEmitter<Namespace, EventsRecord.MonitorEventsFromClient, EventsRecord.MonitorEventsFromServer>
type Sock = TypedEmitter<Socket, EventsRecord.MonitorEventsFromClient, EventsRecord.MonitorEventsFromServer>

const monitorHandler = (io: Server, data: data) => {
  const {players, notes} = data
  const nsp: Nsp = io.of('/monitor')
  // notesに更新がかかるたびにemit
  notes.setObserver(() => {
    nsp.emit('update', { notes: notes.data })
    console.log('emit to monitor')
  })

  nsp.on('connection', (sock: Sock) => {
    console.log(`monitor[${sock.id}] connected`)
    sock.on('disconnect', () => {
      console.log(`monitor[${sock.id}] disconnected`)
    })
  })
}

export default monitorHandler