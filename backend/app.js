const express =  require('express')
const cors =  require('cors')
const personsRouter =  require('./controllers/persons.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')
const middleware =  require('./utils/middleware.js')
const Person =  require('./models/person.js')
require('express-async-errors')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use('/login', loginRouter)

if (process.env.NODE_ENV !== 'test') app.use(middleware.morganLogger)
app.use('/api/persons', personsRouter)
app.use('/api/users', usersRouter)

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has ${persons.length} contacts!</p><p>${new Date()}</p>`)
  })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app