import express from 'express'
import { createServer } from 'http'
import path from 'path'

const app = express()
const http = createServer(app)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/monitor', (req, res) => {
  res.render('layout', {js: 'monitor'})
})

app.get('/player', (req, res) => {
  res.render('layout', {js: 'player'})
})

http.listen(3000)