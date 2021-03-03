import p5 from 'p5'
import sketch from './sketch'
import { io, Socket } from 'socket.io-client'

type Sock = TypedEmitter<Socket, EventsRecord.MonitorEventsFromServer, EventsRecord.MonitorEventsFromClient>
const sock: Sock = io('/monitor')

sock.on('start', (initData) => {
  new p5(sketch(sock, initData))
})

document.addEventListener("touchmove", e => e.preventDefault(), { passive: false })
document.addEventListener("mousewheel", e => e.preventDefault(), { passive: false })