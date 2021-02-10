import { Server, Socket } from 'socket.io'

const playerHandler = (io: Server) => {
  const nsp = io.of('/player')
  nsp.on('connection', (sock: Socket) => {
    console.log(`player[${sock.id}] connected`)
    sock.on('disconnect', () => {
      console.log(`player[${sock.id}] disconnected`)
    })
  })
}

export default playerHandler