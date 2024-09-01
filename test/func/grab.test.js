/** @import {ElementNode} from '../../src/options.js' */
import { equal } from 'assert/strict'
import { grabText, grabAttr } from '../../src/func/grab.js'

/** @type {ElementNode[]} */ // @ts-expect-error
const nodes = (await import('../../scrap.json', { assert: { type: 'json' } })).default

describe('func', function () {
  describe('grab', function () {
    describe('grabText()', function () {
      it('Without options', function () {
        const text = grabText(nodes, { tag: 'nested3' })
        equal(text, 'Hello World!')
      })

      it('With options.deep', function () {
        const text = grabText(nodes, { tag: 'nested3' }, { deep: true })
        equal(text, 'Hello World!')
      })
    })

    describe('grabAttr()', function () {
      it('Grab value', function () {
        const arr = grabAttr(nodes, { tag: 'p' }, 'class')
        equal(arr, 'three')
      })
    })
  })
})
