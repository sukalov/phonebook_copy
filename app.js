const express =  require('express')
const cors =  require('cors')
const personsRouter =  require('./controllers/persons.js')
const middleware =  require('./utils/middleware.js')
const Person =  require('./models/person.js')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV !== 'test') app.use(middleware.morganLogger)
app.use('/api/persons', personsRouter)

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has ${persons.length} contacts!</p><p>${new Date()}</p>`)
  })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app