let a = [1, 2, 3, 4, 5, 6, 7, 8]

for (let i = 0; i < a.length; i++) {
  console.log(a[i])
}

for (let element of a) {
  if (element % 2 === 0) {
    console.log(element + ' is even')
  } else {
    console.log(element + ' is odd')
  }
}

console.log(5 == '5')