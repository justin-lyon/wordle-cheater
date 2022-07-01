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

const filterByGuesses = word => {
  return hasAt(word)
    && doesNotHave(word)
    && has(word)
}

const getScrabbleValue = word => {
  return word.split('').reduce((acc, letter) => {
    const foundValue = scrabble.find(item => item.letters.includes(letter)).value
    return acc += foundValue
  }, 0)
}

const hasDuplicateLetter = word => {
  return word.split('').some((letter, index, letters) => {
    return letters.lastIndexOf(letter) !== index;
  });
}

const score = word => {
  const scrabbleValue = getScrabbleValue(word)
  const hasDupe = hasDuplicateLetter(word)
  const weightedValue = scrabbleValue * 1.5
  const value = hasDupe ? weightedValue : scrabbleValue

  return {
    word,
    value
  }
}
module.exports = { filterByGuesses, score }