function f0 () {
  return new Promise((resolve, reject) => {
    let x
    setTimeout(() => {
      x = 100
      resolve(x)
    }, 3000)
  })
}

function f1 (x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x + 100)
    }, 3000)
  })
}

function f2 (x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x + 100)
    }, 3000)
  })
}

const main = async () => {
  try {
    let x = await f0()
    console.log(x)
    x = await f1(x)
    console.log(x)
    x = await f2(x)
    console.log(x)
  } catch (error) {
    console.log(error)
  } finally {
    console.log('i always run')
  }
}

main()