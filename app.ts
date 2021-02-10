import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import path from 'path'
import { monitorHandler, playerHandler } from './src/be/handlers'

const app = express()
const http = createServer(app)
const io = new Server(http)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/monitor', (req, res) => {
  res.render('layout', {js: 'monitor'})
})

app.get('/player', (req, res) => {
  res.render('layout', {js: 'player'})
})

monitorHandler(io)
playerHandler(io)

http.listen(3000)