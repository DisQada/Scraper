/** @import { ElementNode, ModifiedENode } from '../../src/options.js' */
import { ok, equal, deepEqual } from 'assert/strict'
import { readFile } from 'fs/promises'
import { findNode } from '../../src/func/find.js'

/** @type {ElementNode[]} */
const nodes = JSON.parse(await readFile('scrap.json', 'utf8'))

describe('func', function () {
  describe('find', function () {
    describe('findNode()', function () {
      it('Using tag name and attributes', function () {
        const node = findNode(nodes, {
          tag: 'p',
          attr: [
            { key: 'class', value: 'three' },
            { key: 'id', value: 'other' }
          ]
        })

        ok(node)
        deepEqual(clean(node), {
          type: 'element',
          tagName: 'p',
          attributes: [
            { key: 'class', value: 'three' },
            { key: 'id', value: 'other' }
          ],
          children: []
        })
      })

      it('Using tag name only', function () {
        const node = findNode(nodes, { tag: 'a' })

        ok(node)
        deepEqual(clean(node), {
          type: 'element',
          tagName: 'a',
          attributes: [{ key: 'class', value: 'one' }],
          children: []
        })
      })

      it('Using attributes only', function () {
        const node = findNode(nodes, {
          attr: [{ key: 'class', value: 'two' }]
        })

        ok(node)
        deepEqual(clean(node), {
          type: 'element',
          tagName: 'img',
          attributes: [{ key: 'class', value: 'two' }],
          children: []
        })
      })

      it('Using tag name and string attributes', function () {
        const node = findNode(nodes, {
          tag: 'p',
          attr: ['class=three', 'id=other']
        })

        ok(node)
        deepEqual(clean(node), {
          type: 'element',
          tagName: 'p',
          attributes: [
            { key: 'class', value: 'three' },
            { key: 'id', value: 'other' }
          ],
          children: []
        })
      })

      it('Using string attributes only', function () {
        const node = findNode(nodes, {
          attr: ['class=two']
        })

        ok(node)
        deepEqual(clean(node), {
          type: 'element',
          tagName: 'img',
          attributes: [{ key: 'class', value: 'two' }],
          children: []
        })
      })

      it('Using array of string attributes only', function () {
        const node = findNode(nodes, {
          attr: ['class=three', 'id=other']
        })

        ok(node)
        deepEqual(clean(node), {
          type: 'element',
          tagName: 'p',
          attributes: [
            { key: 'class', value: 'three' },
            { key: 'id', value: 'other' }
          ],
          children: []
        })
      })

      it('Using child property', function () {
        const node = findNode(nodes, {
          tag: 'p',
          child: { tag: 'href' }
        })

        ok(node)
        deepEqual(clean(node), {
          type: 'element',
          tagName: 'p',
          attributes: [],
          children: [
            {
              type: 'element',
              tagName: 'href',
              attributes: [],
              children: []
            }
          ]
        })
      })

      it('Using child chain function', function () {
        const node = findNode(nodes, { tag: 'h1' })?.getChild({ tag: 'span' })

        ok(node)
        deepEqual(clean(node), {
          type: 'element',
          tagName: 'span',
          attributes: [],
          children: [{ type: 'text', content: ' World' }]
        })
      })
    })

    describe('.text()', function () {
      it('Get value', function () {
        const text = findNode(nodes, { tag: 'span' })?.getText()
        equal(text, 'Hello World!')
      })
    })

    describe('.attr()', function () {
      it('Get value', function () {
        const attr = findNode(nodes, { tag: 'a' })?.getAttr('class')
        equal(attr, 'one')
      })
    })
  })
})

/**
 * @param {ModifiedENode} node
 * @returns {ElementNode}
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
