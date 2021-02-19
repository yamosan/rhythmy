import { Server, Socket } from 'socket.io'
import { data } from '../@types/data'

const monitorHandler = (io: Server, data: data) => {
  const {players, notes} = data
  const nsp = io.of('/monitor')
  nsp.on('connection', (sock: Socket) => {
    console.log(`monitor[${sock.id}] connected`)
    sock.on('disconnect', () => {
      console.log(`monitor[${sock.id}] disconnected`)
    })
  })
}

export default monitorHandler