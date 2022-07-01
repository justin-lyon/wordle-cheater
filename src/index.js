const list = require('./list')
const { filterByGuesses, score } = require('./lib');

const options = list.filter(filterByGuesses)
  .map(score)
  .sort((a, b) => a.value - b.value)

console.table(options)
/**
 * In Scrabble, the lowest point letters are most frequent.
 * Choose the option that has the lowest score.
 */
console.log('recommended', options[0].word)