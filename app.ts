import express from 'express'
import path from 'path'

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('layout', {js: 'bundle'})
})

app.listen(3000)