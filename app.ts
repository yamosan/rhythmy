import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import path from 'path'
import { monitorHandler, playerHandler } from './src/be/handlers'
import { Notes } from './src/be/Notes'
import { Players } from './src/be/Players'
import seed from './src/be/seed'

const PORT = process.env.PORT || 3000

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

const playerLimit = 7
const nSteps = 12
const data = {
  players: new Players(playerLimit),
  notes: new Notes(playerLimit, nSteps)
}
seed(data)
monitorHandler(io, data)
playerHandler(io, data)

http.listen(PORT)