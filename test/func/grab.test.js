/** @import { ElementNode } from '../../src/options.js' */
import { equal } from 'assert/strict'
import { readFile } from 'fs/promises'
import { grabText, grabAttr } from '../../src/func/grab.js'

/** @type {ElementNode[]} */
const nodes = JSON.parse(await readFile('scrap.json', 'utf8'))

describe('func', function () {
  describe('grab', function () {
    describe('grabText()', function () {
      it('Without options', function () {
        const text = grabText(nodes, { tag: 'h1' })
        equal(text, 'Hello!')
      })

      it('With options.deep', function () {
        const text = grabText(nodes, { tag: 'h1' }, { deep: true })
        equal(text, 'Hello World!')
      })
    })

    describe('grabAttr()', function () {
      it('Grab value', function () {
        const arr = grabAttr(nodes, { tag: 'a' }, 'class')
        equal(arr, 'one')
      })
    })
  })
})
