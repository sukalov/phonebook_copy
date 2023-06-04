const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./testHelper')
const Person = require('../models/person.js')

beforeEach(async () => {
  await Person.deleteMany({})
  const personObject = helper.initialPersons
    .map(person => new Person(person))
  const promiseArray = personObject.map(person => person.save())
  await Promise.all(promiseArray)
})

test('persons are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are all persons', async () => {
  const response = await api.get('/api/persons')

  expect(response.body).toHaveLength(helper.initialPersons.length)
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

  const peopleAtEnd = await helper.peopleInDb()
  expect(peopleAtEnd).toHaveLength(helper.initialPersons.length + 1)

  const names = peopleAtEnd.map(r => r.name)
  expect(names).toContain('Alexey Navalny')
})

test('an empty contact cannot be added', async () => {
  const newPerson = {
    name: '',
    number: '',
  }
  await api
    .post('/api/persons')
    .send(newPerson)
    .expect(400)

  const peopleAtEnd = await helper.peopleInDb()
  expect(peopleAtEnd).toHaveLength(helper.initialPersons.length)
})

test('able to find specific person', async () => {
  const peopleAtStart = await helper.peopleInDb()
  const personToView = peopleAtStart[0]
  const response = await api
    .get(`/api/persons/${personToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toEqual(personToView)
})

test('able to delete a person', async () => {
  const peopleAtStart = await helper.peopleInDb()
  const personToDelete = peopleAtStart[0]

  await api
    .delete(`/api/persons/${personToDelete.id}`)
    .expect(204)

  const peopleAtEnd = await helper.peopleInDb()
  expect(peopleAtEnd).toHaveLength(helper.initialPersons.length - 1)

  const names = peopleAtEnd.map(r => r.name)
  expect(names).not.toContain(personToDelete.name)
})

test('we cannot update contact with bad data', async () => {
  const peopleAtStart = await helper.peopleInDb()
  const personToUpdate = peopleAtStart[0]
  const badData = {
    name: '',
    number: '',
  }

  await api
    .put(`/api/persons/${personToUpdate.id}`)
    .send(badData)
    .expect(400)
})

test('we\'re able to update contact', async () => {
  const peopleAtStart = await helper.peopleInDb()
  const personToUpdate = peopleAtStart[0]

  const goodData = {
    name: personToUpdate.name,
    number: '888-888-8888'
  }

  await api
    .put(`/api/persons/${personToUpdate.id}`)
    .send(goodData)
    .expect(200)

  const peopleAtEnd = await helper.peopleInDb()
  expect(peopleAtEnd).toHaveLength(helper.initialPersons.length)

  const numbers = peopleAtEnd.map(r => r.number)
  expect(numbers).toContain('888-888-8888')

})


afterAll(async () => {
  await mongoose.connection.close()
})