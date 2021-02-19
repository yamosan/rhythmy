import { Server, Socket } from 'socket.io'
import { data } from '../@types/data'

const playerHandler = (io: Server, data: data) => {
  const {players, notes} = data
  const nsp = io.of('/player')
  nsp.on('connection', (sock: Socket) => {
    console.log(`player[${sock.id}] connected`)
    sock.on('disconnect', () => {
      console.log(`player[${sock.id}] disconnected`)
    })
  })
}

export default playerHandler