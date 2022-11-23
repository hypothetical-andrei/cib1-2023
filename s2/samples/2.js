function doSomething () {
  return new Promise((resolve, reject) => {
    let x
    setTimeout(() => {
      x = 100
      resolve(x)
    }, 3000)
  })
}

// const f = function (x) {
//   console.log('the actual value of x is ' + x)
// }

// console.log(doSomething(f))

doSomething().then((x) => {
  console.log(x)
})