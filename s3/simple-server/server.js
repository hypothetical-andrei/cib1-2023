const express = require('express')

const app = express()

app.locals.kittens = [{
  id: 1,
  name: 'tim',
  color: 'black'
}, {
  id: 2,
  name: 'tom',
  color: 'tan'
}]

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url)
  next()
})

app.use(express.json())

app.get('/kittens', (req, res) => {
  res.status(200).json(app.locals.kittens)
})

app.post('/kittens', (req, res) => {
  const kitten = req.body
  app.locals.kittens.push(kitten)
  res.status(201).json({ message: 'created' })
})

app.get('/kittens/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const kitten = app.locals.kittens.find(e => e.id === id)
  if (kitten) {
    res.status(200).json(kitten)
  } else {
    res.status(404).json({ message: 'not found' })
  }
})

app.put('/kittens/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const kittenUpdate = req.body
  const kittenIndex = app.locals.kittens.findIndex(e => e.id === id)
  if (kittenIndex !== -1) {
    app.locals.kittens[kittenIndex].name = kittenUpdate.name
    app.locals.kittens[kittenIndex].color = kittenUpdate.color
    res.status(202).json({ message: 'accepted' })
  } else {
    res.status(404).json({ message: 'not found' })
  }
})

app.delete('/kittens/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const kittenIndex = app.locals.kittens.findIndex(e => e.id === id)
  if (kittenIndex !== -1) {
    app.locals.kittens.splice(kittenIndex, 1)
    res.status(202).json({ message: 'accepted' })
  } else {
    res.status(404).json({ message: 'not found' })
  }
})

app.listen(8080)