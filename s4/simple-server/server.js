const express = require('express')
const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'kitten.db'
})

const Kitten = sequelize.define('kitten', {
  name: Sequelize.STRING,
  color: Sequelize.STRING
})

sequelize.sync()
  .then(() => {
    console.log('tables created')
  })

const app = express()

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url)
  next()
})

app.use(express.json())

app.get('/kittens', async (req, res) => {
  try {
    const kittens = await Kitten.findAll()
    res.status(200).json(kittens)
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'kitten error' })
  }
})

app.post('/kittens', async (req, res) => {
  try {
    const kitten = await Kitten.create(req.body)
    res.status(201).json(kitten)
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'kitten error' })
  }
})

app.get('/kittens/:id', async (req, res) => {
  try {
    const kitten = await Kitten.findByPk(req.params.id)
    if (kitten) {
      res.status(200).json(kitten)
    } else {
      res.status(404).json({ message: 'not found' })
    }
      
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'kitten error' })
  }
})

app.put('/kittens/:id', async (req, res) => {
  try {
    const kitten = await Kitten.findByPk(req.params.id)
    kitten.color = req.body.color
    kitten.name = req.body.name
    await kitten.save()
    if (kitten) {
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
      
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'kitten error' })
  }
})

app.delete('/kittens/:id', async (req, res) => {
  try {
    const kitten = await Kitten.findByPk(req.params.id)
    await kitten.destroy()
    if (kitten) {
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
      
  } catch (error) {
    console.warn(error)
    res.status(500).json({ message: 'kitten error' })
  }
})

app.listen(8080)