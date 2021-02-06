import express from 'express'
import path from 'path'

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/monitor', (req, res) => {
  res.render('layout', {js: 'monitor'})
})

app.get('/player', (req, res) => {
  res.render('layout', {js: 'player'})
})

app.listen(3000)