import app from './app.js'
import config from './utils/config.js'
import logger from './utils/log.js'

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
