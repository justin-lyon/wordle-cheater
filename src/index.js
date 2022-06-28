const list = require('./list')
const { greenLetters, yellowLetters, grayLetters } = require('./guesses')
const scrabble = require('./scrabble')

const hasAt = word => {
  return greenLetters.length === 0
    || greenLetters.reduce((acc, { letter, position }) => {
      return acc && word.charAt(position) === letter
    }, true)
}

const doesNotHave = word => grayLetters.reduce((acc, letter) => {
  return acc && !word.includes(letter)
}, true)

const notHasAt = (word, { letter, positions }) => positions.reduce((acc, pos) => {
  return acc && word.charAt(pos) !== letter
}, true)

const has = word => yellowLetters.reduce((acc, item) => {
  return acc && word.includes(item.letter) && notHasAt(word, item)
}, true)

const score = word => {
  const value = word.split('').reduce((acc, letter) => {
    const foundValue = scrabble.find(item => item.letters.includes(letter)).value
    return acc += foundValue
  }, 0)
  return {
    word,
    value
  }
}

const options = list.filter(hasAt)
  .filter(doesNotHave)
  .filter(has)
  .map(score)
  .sort((a, b) => a.value - b.value)

console.table(options)
/**
 * In Scrabble, the lowest point letters are most frequent.
 * Choose the option that has the lowest score.
 */
console.log('recommended', options[0].word)