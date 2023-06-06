const mongoose = require('mongoose')
const config = require('../utils/config.js')
const log = require('../utils/log.js')

const url = config.MONGODB_URI

mongoose.set('strictQuery', false)

log.info('connecting to', url)
mongoose.connect(url)
  .then(log.green('connected to MongoDB'))
  .catch((error) => {
    log.red('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number required'],
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
