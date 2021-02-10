import p5 from 'p5'
import sketch from './sketch'
import io from 'socket.io-client'

const sock = io('/monitor')

new p5(sketch)