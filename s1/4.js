let a = [1, 2, 3]

console.log(a[2])

a.unshift(0)
console.log(a)
console.log(a.shift())
console.log(a)
a.push(4)
console.log(a)
console.log(a.pop())
console.log(a)

let b = a.slice(2, 5)
console.log(b)

let c = [1,2,3,4,5,6,7,8]
console.log(c.slice(2, 5))

c.splice(2, 2, 13, 14)

console.log(c)

console.log(c.indexOf(5))
console.log(c.indexOf(22))
