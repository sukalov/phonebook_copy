const colors = {
  white: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
}

const info = (...props) => {
  let color = 'white'
  if (process.env.NODE_ENV !== 'test') console.log(colors[color], ...props, '\x1b[0m')
}
const red = (...props) => {
  let color = 'red'
  if (process.env.NODE_ENV !== 'test') console.log(colors[color], ...props, '\x1b[0m')
}

const blue = (...props) => {
  let color = 'blue'
  if (process.env.NODE_ENV !== 'test') console.log(colors[color], ...props, '\x1b[0m')
}

const green = (...props) => {
  let color = 'green'
  if (process.env.NODE_ENV !== 'test') console.log(colors[color], ...props, '\x1b[0m')
}

const yellow = (...props) => {
  let color = 'yellow'
  if (process.env.NODE_ENV !== 'test') console.log(colors[color], ...props, '\x1b[0m')
}

const error = (...props) => {
  if (process.env.NODE_ENV !== 'test') console.error(...props)
}

module.exports =  {
  info,
  red,
  blue,
  green,
  yellow,
  error,
}
