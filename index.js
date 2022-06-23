const fs = require('fs');
const list = JSON.parse(fs.readFileSync('./list.json', 'utf8'));

const hasAt
 = [ // letter: char, position: Number

]
const doesNotHave = 'aegscoud'.split('')
const has = 'ir'.split('')

const wordHasAt = (word) => hasAt.reduce((acc, item) => {
  return acc && word.charAt(item.position) === item.letter
}, true)

const wordDoesNotHave = word => doesNotHave.reduce((acc, letter) => {
  return acc && !word.includes(letter)
}, true)

const wordHas = word => has.reduce((acc, letter) => {
  return acc && word.includes(letter)
}, true)

const options = list.filter(wordHasAt)
  .filter(wordDoesNotHave)
  .filter(wordHas)

console.log(options)