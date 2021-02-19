import { Server, Socket } from 'socket.io'
import { data } from '../@types/data'

const monitorHandler = (io: Server, data: data) => {
  const {players, notes} = data
  const nsp = io.of('/monitor')
  // notesに更新がかかるたびにemit
  notes.setObserver(() => {
    nsp.emit('update', { notes: notes.data })
    console.log('emit to monitor')
  })

  nsp.on('connection', (sock: Socket) => {
    console.log(`monitor[${sock.id}] connected`)
    sock.on('disconnect', () => {
      console.log(`monitor[${sock.id}] disconnected`)
    })
  })
}

export default monitorHandler