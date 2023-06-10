const morganLogger = require('./morganLogger.js')

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'completely unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  } if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: error.message })
  } if (error.name === 'TokenExpiredError') {
    response.status(401).json({ error: 'token expired' })
  } else {
    response.status(500).json({ error: error.message })
  }
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  morganLogger,
}
