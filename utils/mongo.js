const mongoose = require('mongoose')
const config = require('./config.js')

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)

function table(arr) { // original function taken from https://github.com/Automattic/mongoose/issues/6468
  let lean = arr.map((doc) => doc.toObject())
  return console.table(lean, ['name', 'number'])
}

if (!process.argv[3]) {
  console.log('\x1b[92mphonebook:\x1b[0m')
  Person.find({}).then((res) => {
    table(res)
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3],
  })

  person.save().then((res) => {
    console.log(
      `succesfully added ${res.name} with number ${res.number} to the phonebook`,
    )
    mongoose.connection.close()
  })
}
