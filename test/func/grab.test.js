/** @import { ElementNode } from '../../src/options.js' */
import { equal } from 'assert/strict'
import { readFile } from 'fs/promises'
import { grabText, grabAttr } from '../../src/func/grab.js'

/** @type {ElementNode[]} */
const nodes = JSON.parse(await readFile('scrap.json', 'utf8'))

describe('grab', function () {
  describe('grabText()', function () {
    /** @type {string} */ let t

    it('Without options', function () {
      t = grabText(nodes, { tag: 'h1' })
      equal(t, 'Hello!')
    })

    it('With options', function () {
      t = grabText(nodes, { tag: 'h1' }, { deep: true })
      equal(t, 'Hello World!')
    })
  })

  describe('grabAttr()', function () {
    /** @type {string} */ let a

    it('', function () {
      a = grabAttr(nodes, { tag: 'a' }, 'class')
      equal(a, 'one')
    })
  })
})
