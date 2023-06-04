const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.NODE_ENV !== 'production'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
}
