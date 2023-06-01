import express from 'express'
import cors from 'cors'
import personsRouter from './controllers/persons.js'
import middleware from './utils/middleware.js'
import Person from './models/person.js'

// i decided to use ES6 modules instead of CommonJS since node20 documentation
// calls it the official standart for this version being fully supported and stable now
// https://nodejs.org/api/esm.html

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(middleware.morganLogger)
app.use('/api/persons', personsRouter)

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has ${persons.length} contacts!</p><p>${new Date()}</p>`)
  })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app