const express = require('express')
const Person = require('../models/person.js')
require('express-async-errors')
// import log from '../utils/log.js'
const personsRouter = express.Router()
const User = require('../models/user')
const getToken = require('../utils/getToken.js')
const config = require('../utils/config.js')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/userExtractor.js')
const tokenExtractor = require('../utils/tokenExtractor.js')

personsRouter.use(tokenExtractor)
personsRouter.use(userExtractor)

personsRouter.get('/', async (request, response) => {
  response.json(await Person.find({}).populate('user', { username: 1 }))
})

personsRouter.get('/:id', async (request, response) => {
  const res = await Person.findById(request.params.id)
  if (res) response.json(res)
  else response.status(404).send('error 404: not found')
})

personsRouter.post('/', async (req, res) => {
  if (!req.user) { res.status(401).json({ error: 'authentication required' }) } else {
    const person = new Person({ user: req.user, ...req.body })
    const savedPerson = await person.save()
    const user = await User.findById(req.user).exec()
    user.persons.push(savedPerson._id)
    await User.findByIdAndUpdate(req.user, { persons: user.persons }, { runValidators: true })
    res.status(201).json(savedPerson)
  }
})

personsRouter.delete('/:id', async (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: 'authentication required' })
  } else {
    try {
      const person = await Person.findById(req.params.id)
      if (req.user === person.user.toString()) {
        await Person.findByIdAndRemove(req.params.id)
        const user = await User.findById(req.user).exec()
        const updatedPersons = user.persons.filter((userPerson) => userPerson.toString() !== req.params.id)
        await User.findByIdAndUpdate(req.user, { persons: updatedPersons })
        res.status(204).send('content removed')
      } else {
        res.status(401).send({ error: 'non allowed to delete other people\'s notes' })
      }
    } catch (error) {
      res.status(404).send({ error: 'content not found' })
    }
  }
})


personsRouter.put('/:id', async (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: 'authentication required' })
  } else {
    try {
      const person = await Person.findById(req.params.id)
      if (req.user === person.user.toString()) {
        const updated = await Person.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true },
        )
        res.send(updated)
      } else {
        res.status(401).send({ error: 'non allowed to change other people\'s notes' })
      }
    } catch (error) {
      res.status(404).send({ error: 'content not found' })
    }
  }
})

module.exports = personsRouter