const express = require('express')
const Person = require('../models/person.js')
require('express-async-errors')
// import log from '../utils/log.js'
const personsRouter = express.Router()
const User = require('../models/user')

personsRouter.get('/', async (request, response) => {
  response.json(await Person.find({}).populate('user', { username: 1 }))
})

personsRouter.get('/:id', async (request, response) => {
  const res = await Person.findById(request.params.id)
  if (res) response.json(res)
  else response.status(404).send('error 404: not found')
})

personsRouter.delete('/:id', async (request, response) => {
  await Person.findByIdAndRemove(request.params.id)
  response.status(204).send({ 204: 'no content' })
})

personsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.userId)
  if (!request.body.name || !request.body.number) {
    response.status(400).json({
      error: 'content missing'
    })
  } else {
    const person = new Person({ ...response.req.body, user: user._id })
    const res = await person.save()
    user.persons = user.persons.concat(res.id)
    await user.save()

    response.status(201).json(res)
  }
})

personsRouter.put('/:id', async (request, response) => {
  const res = await Person.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })
  if (res) response.json(res)
  else response.status(404).send('error 404: not found')
})

module.exports = personsRouter