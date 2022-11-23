let a = [1, 2, 3, 4, 5, 6, 7, 8]

let a1 = a.map(e => e * 2)

console.log(a1)

let a2 = a.filter(e => e > 3)

console.log(a2)

let a4 = [[1,2,3], [4,5], [6], [7,8,9]]

let a5 = a4.reduce((a, e) => a.concat(e),[])

console.log(a5)