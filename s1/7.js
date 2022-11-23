let o = {
  name: 'Andrei',
  weight: 75,
  sayHello: function (other) {
    console.log(`${this.name} says hello ${other}`)
  }
}

o.sayHello('Jim')

for (const key in o) {
  console.log(o[key])
}