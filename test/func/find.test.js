/** @import { ModNode, Node } from '../../src/options.js' */
import { ok, equal, deepEqual } from 'assert/strict'
import { readFile } from 'fs/promises'
import { findNode, modifyNode } from '../../src/func/find.js'

/** @type {Node[]} */
const nodes = JSON.parse(await readFile('scrap.json', 'utf8'))

describe('find', function () {
  describe('findNode()', function () {
    /** @type {ModNode | undefined} */ let n
    /** @type {Node | undefined} */ let expected

    it('Not found', function () {
      n = findNode(nodes, { tag: 'abbr' })
      expected = undefined
      equal(n, expected)
    })

    it('First match', function () {
      n = findNode(nodes, { tag: 'p' })
      expected = { tag: 'p' }
      ok(n)
      deepEqual(clean(n), expected)

      n = findNode(nodes, { attr: ['class=two'] })
      expected = { tag: 'img', attrs: { class: 'two' } }
      ok(n)
      deepEqual(clean(n), expected)

      n = findNode(nodes, { child: { tag: 'span' } })
      expected = { tag: 'canvas', children: [{ tag: 'span', children: ['Hello World!'] }] }
      ok(n)
      deepEqual(clean(n), expected)
    })

    it('Deep match', function () {
      n = findNode(nodes, {
        tag: 'div',
        attr: ['class=container', 'id=main'],
        child: {
          tag: 'canvas',
          child: { tag: 'span' }
        }
      })
      expected = {
        tag: 'div',
        attrs: { class: 'container', id: 'main' },
        children: [
          {
            tag: 'canvas',
            children: [{ tag: 'span', children: ['Hello World!'] }]
          }
        ]
      }

      ok(n)
      deepEqual(clean(n), expected)
    })
  })

  describe('modifyNode()', function () {
    /** @type {ModNode | undefined} */ let n

    it('should add the get chain-functions', function () {
      n = modifyNode({ tag: 'p', children: ['Hello World!'] })

      ok(n)
      ok(n.getChild)
      ok(n.getAttr)
      ok(n.getText)
    })

    it('node.getChild()', function () {
      n = findNode(nodes, { tag: 'canvas' })
      ok(n)

      const c = n.getChild({ tag: 'span' })
      ok(c)

      deepEqual(clean(c), { tag: 'span', children: ['Hello World!'] })
    })

    it('node.getAttr()', function () {
      n = findNode(nodes, { tag: 'a' })
      ok(n)

      const a = n.getAttr('class')
      equal(a, 'one')
    })

    it('node.getText()', function () {
      n = findNode(nodes, { tag: 'span' })
      ok(n)

      const t = n.getText()
      equal(t, 'Hello World!')
    })
  })
})

/**
 * @param {ModNode} node
 * @returns {Node}
 */
function clean(node) {
  // @ts-expect-error
  delete node.getChild
  // @ts-expect-error
  delete node.getAttr
  // @ts-expect-error
  delete node.getText
  return node
}
