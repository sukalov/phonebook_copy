import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3001
const MONGO_URL = process.env.MONGO_URL

export default {
  MONGO_URL,
  PORT,
}
