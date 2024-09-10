import { equal } from 'assert/strict'
import { removeQuotes } from '../../src/func/util.js'

describe('util', function () {
  describe('removeQuotes()', function () {
    it('should remove quotes from the string', function () {
      equal(removeQuotes('"test"'), 'test')
      equal(removeQuotes("'test'"), 'test')
      equal(removeQuotes('test'), 'test')
    })
  })
})
