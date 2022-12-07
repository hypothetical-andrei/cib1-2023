const express = require('express')
const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'kitten.db'
})

const Kitten = sequelize.define('kitten', {
  name: Sequelize.STRING,
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 10]
    }
  }
})

sequelize.sync({ alter: true })
  .then(() => {
    console.log('tables created')
  })

const app = express()

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url)
  next()
})

app.use(express.static('public'))

app.use(express.json())

app.get('/kittens', async (req, res, next) => {
  try {
    const kittens = await Kitten.findAll()
    res.status(200).json(kittens)
  } catch (error) {
    next(error)
  }
})

app.post('/kittens', async (req, res, next) => {
  try {
    const kitten = await Kitten.create(req.body)
    res.status(201).json(kitten)
  } catch (error) {
    next(error)
  }
})

app.get('/kittens/:id', async (req, res, next) => {
  try {
    const kitten = await Kitten.findByPk(req.params.id)
    if (kitten) {
      res.status(200).json(kitten)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (error) {
    next(error)
  }
})

app.put('/kittens/:id', async (req, res, next) => {
  try {
    const kitten = await Kitten.findByPk(req.params.id)
    if (kitten) {
      kitten.color = req.body.color
      kitten.name = req.body.name
      await kitten.save()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }      
  } catch (error) {
    next(error)
  }
})

app.delete('/kittens/:id', async (req, res, next) => {
  try {
    const kitten = await Kitten.findByPk(req.params.id)
    if (kitten) {
      await kitten.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
      
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error' })
})

app.listen(8080)