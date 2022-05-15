const fs = require('fs')
// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)
// console.log(data.title)

const data = JSON.parse(fs.readFileSync('1-json.json').toString())
data.name = 'David'
data.age = 22
fs.writeFileSync('1-json.json', JSON.stringify(data))
console.log(data.name)