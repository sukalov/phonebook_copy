const Person = require('../models/person')
const User = require('../models/user')

const initialPersons = [
  {
    name: 'Matvey Sokolovsky',
    number: '000-000-0000',
    user: '647e6ac1ab36883e7db9d70b',
    _id: '647e6e5f96a07189908cdc6d'
  },
  {
    name: 'Anatoly Yatskov',
    number: '123-456-7890',
    user: '647e6ac1ab36883e7db9d70b',
    _id: '647e6e5f96a07189908cdc6e'
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialPersons, nonExistingId, peopleInDb, usersInDb
}