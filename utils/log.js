const colors = {
  white: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
}

const info = (...props) => {
  let color = 'white'
  console.log(colors[color], ...props, '\x1b[0m')
}
const red = (...props) => {
  let color = 'red'
  console.log(colors[color], ...props, '\x1b[0m')
}

const blue = (...props) => {
  let color = 'blue'
  console.log(colors[color], ...props, '\x1b[0m')
}

const green = (...props) => {
  let color = 'green'
  console.log(colors[color], ...props, '\x1b[0m')
}

const yellow = (...props) => {
  let color = 'yellow'
  console.log(colors[color], ...props, '\x1b[0m')
}

const error = (...props) => {
  console.error(...props)
}

export default {
  info,
  red,
  blue,
  green,
  yellow,
  error,
}
