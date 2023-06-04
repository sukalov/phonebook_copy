console.log('start')
const asyncTest = async () => {
  console.log(3)
  const a = new Promise (e => {
    console.log(4)
    return 5
  })
  const b = await a
  console.log(b)
}

console.log(1)
asyncTest()
console.log(2)