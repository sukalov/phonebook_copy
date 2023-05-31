import { express } from 'express'
const app = express()
import Person from '../models/person'

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has ${persons.length} contacts!</p><p>${new Date()}</p>`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(res => {
    if (res) {
      response.json(res)
    } else {
      response.status(404).send('error 404: not found')
    }
  })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(response.status(204).send({ 204: 'no content' }))
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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

app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })
    .then(res => {
      response.json(res)
    })
    .catch(error => next(error))
})

export default app