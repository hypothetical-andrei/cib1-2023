function doSomething (callback) {
  let x
  setTimeout(() => {
    x = 100
    callback(x)
  }, 3000)
}

const f = function (x) {
  console.log('the actual value of x is ' + x)
}

// console.log(doSomething(f))