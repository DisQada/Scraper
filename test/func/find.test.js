/** @import { ElementNode, ModifiedENode } from '../../src/options.js' */
import { ok, equal, deepEqual } from 'assert/strict'
import { readFile } from 'fs/promises'
import { findNode, modifyNode } from '../../src/func/find.js'

/** @type {ElementNode[]} */
const nodes = JSON.parse(await readFile('scrap.json', 'utf8'))

describe('find', function () {
  describe('findNode()', function () {
    /** @type {ModifiedENode | undefined} */ let n
    /** @type {ElementNode | undefined} */ let expected

    it('Not found', function () {
      n = findNode(nodes, { tag: 'abbr' })
      expected = undefined
      equal(n, expected)
    })

    it('First match', function () {
      n = findNode(nodes, { tag: 'p' })
      expected = { type: 'element', tagName: 'p', attributes: [], children: [] }
      ok(n)
      deepEqual(clean(n), expected)

      n = findNode(nodes, { attr: ['class=two'] })
      expected = { type: 'element', tagName: 'img', attributes: [{ key: 'class', value: 'two' }], children: [] }
      ok(n)
      deepEqual(clean(n), expected)

      n = findNode(nodes, { child: { tag: 'span' } })
      expected = {
        type: 'element',
        tagName: 'canvas',
        attributes: [],
        children: [
          {
            type: 'element',
            tagName: 'span',
            attributes: [],
            children: [{ type: 'text', content: 'Hello World!' }]
          }
        ]
      }
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
        type: 'element',
        tagName: 'div',
        attributes: [
          { key: 'class', value: 'container' },
          { key: 'id', value: 'main' }
        ],
        children: [
          {
            type: 'element',
            tagName: 'canvas',
            attributes: [],
            children: [
              {
                type: 'element',
                tagName: 'span',
                attributes: [],
                children: [{ type: 'text', content: 'Hello World!' }]
              }
            ]
          }
        ]
      }
      ok(n)
      deepEqual(clean(n), expected)
    })
  })

  describe('modifyNode()', function () {
    /** @type {ModifiedENode | undefined} */ let n

    it('should add the get chain-functions', function () {
      n = modifyNode({
        type: 'element',
        tagName: 'p',
        attributes: [],
        children: [{ type: 'text', content: 'Hello World!' }]
      })

      ok(n.getChild)
      ok(n.getAttr)
      ok(n.getText)
    })

    it('node.getChild()', function () {
      n = findNode(nodes, { tag: 'canvas' })
      ok(n)

      const c = n.getChild({ tag: 'span' })
      ok(c)

      /** @type {ElementNode} */
      const expected = {
        type: 'element',
        tagName: 'span',
        attributes: [],
        children: [{ type: 'text', content: 'Hello World!' }]
      }
      deepEqual(clean(c), expected)
    })

    it('node.getAttr()', function () {
      const n = findNode(nodes, { tag: 'a' })
      ok(n)

      const a = n.getAttr('class')
      equal(a, 'one')
    })

    it('node.getText()', function () {
      const n = findNode(nodes, { tag: 'span' })
      ok(n)

      const t = n.getText()
      equal(t, 'Hello World!')
    })
  })
})

/**
 * @param {ModifiedENode} node
 * @returns {ElementNode}
 */
function clean(node) {
  if (node) {
    // @ts-expect-error
    delete node.getChild
    // @ts-expect-error
    delete node.getAttr
    // @ts-expect-error
    delete node.getText
  }

  return node
}
