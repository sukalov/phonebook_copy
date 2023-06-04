const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Person = require('../models/person.js')

const initialPersons = [
  {
    name: 'Matvey Sokolovsky',
    number: '000-000-0000',
  },
  {
    name: 'Anatoly Yatskov',
    number: '123-456-7890',
  },
]

beforeEach(async () => {
  await Person.deleteMany({})
  let personObject = new Person(initialPersons[0])
  await personObject.save()
  personObject = new Person(initialPersons[1])
  await personObject.save()
})

test('persons are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('there are all persons', async () => {
  const response = await api.get('/api/persons')

  expect(response.body).toHaveLength(initialPersons.length)
})
test('Matvey is within the returned phonebook', async () => {
  const response = await api.get('/api/persons')

  const names = response.body.map(r => r.name)
  expect(names).toContain(
    'Matvey Sokolovsky'
  )
})
test('a valid person can be added', async () => {
  const newPerson = {
    name: 'Alexey Navalny',
    number: '555-555-5555',
  }

  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/person')
  const names = response.body.map(r => r.name)

  expect(response.body).toHaveLength(initialPersons.length + 1)
  expect(names).toContain(
    'Alexey Navalny'
  )
})

afterAll(async () => {
  await mongoose.connection.close()
})