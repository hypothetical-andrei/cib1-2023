const express = require('express')

const app = express()

app.locals.students = [{
  id: 1,
  name: 'jim',
  age: 19
}, {
  id: 2,
  name: 'jane',
  age: 20
}, {
  id: 3,
  name: 'ann',
  age: 18
}]

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.url)
  next()
})

app.get('/ping', (req, res, next) => {
  res.status(200).send('pong')
})

app.get('/students', (req, res, next) => {
  res.status(200).json(app.locals.students)
})

app.post('/students', (req, res, next) => {
  const student = req.body
  app.locals.students.push(student)
  res.status(201).json({ message: 'created' })
})

app.listen(8080)