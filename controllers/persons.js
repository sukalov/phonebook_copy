const express = require('express')
const Person = require('../models/person.js')
// import log from '../utils/log.js'

const personsRouter = express.Router()

personsRouter.get('/', async (request, response) => {
  response.json(await Person.find({}))
})

personsRouter.get('/:id', async (request, response, next) => {
  const res = await Person.findById(request.params.id)
  try {
    if (res) response.json(res)
    else response.status(404).send('error 404: not found')
  } catch (err)  {next(err)}
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(response.status(204).send({ 204: 'no content' }))
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  if (!request.body.name || !request.body.number) {
    response.status(400).json({
      error: 'content missing'
    })
  } else {
    const person = new Person({ ...response.req.body })
    person.save().then(res => {
      response.json(res)
    }).catch(err => next(err))
  }
})

personsRouter.put('//:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })
    .then(res => {
      response.json(res)
    })
    .catch(error => next(error))
})

module.exports = personsRouter