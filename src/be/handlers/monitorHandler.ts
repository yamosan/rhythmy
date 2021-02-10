import { Server, Socket } from 'socket.io'

const monitorHandler = (io: Server) => {
  const nsp = io.of('/monitor')
  nsp.on('connection', (sock: Socket) => {
    console.log(`monitor[${sock.id}] connected`)
    sock.on('disconnect', () => {
      console.log(`monitor[${sock.id}] disconnected`)
    })
  })
}

export default monitorHandler