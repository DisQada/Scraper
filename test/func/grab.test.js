/** @import {ElementNode} from '../../src/options.js' */
const { equal } = require('assert/strict')
const { grabText, grabAttr } = require('../../src/func/grab.js')

/** @type {ElementNode[]} */ // @ts-expect-error
const json = require('../scrap.json')

describe('func', function () {
  describe('grab', function () {
    describe('grabText()', function () {
      it('Without options', function () {
        const text = grabText(json, { tag: 'nested3' })
        equal(text, 'Hello World!')
      })

      it('With options.deep', function () {
        const text = grabText(json, { tag: 'nested3' }, { deep: true })
        equal(text, 'Hello World!')
      })
    })

    describe('grabAttr()', function () {
      it('Grab value', function () {
        const arr = grabAttr(json, { tag: 'p' }, 'class')
        equal(arr, 'three')
      })
    })
  })
})
