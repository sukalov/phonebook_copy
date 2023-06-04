const Person = require('../models/person')

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

const nonExistingId = async () => {
  const person = new Person({ content: 'willremovethissoon' })
  await person.save()
  await person.deleteOne()

  return person._id.toString()
}

const peopleInDb = async () => {
  const persons = await Person.find({})
  return persons.map(person => person.toJSON())
}

module.exports = {
  initialPersons, nonExistingId, peopleInDb
}