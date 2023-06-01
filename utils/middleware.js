import morganLogger from './morganLogger.js'

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'completely unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else {
    next(error)
  }
}

export default {
  errorHandler,
  unknownEndpoint,
  morganLogger,
}
