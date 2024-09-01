/** @import {ElementNode, ModifiedENode} from '../../src/options.js' */
import { equal, deepEqual } from 'assert/strict'
import { findNode } from '../../src/func/find.js'

/** @type {ElementNode[]} */ // @ts-expect-error
const nodes = (await import('../../scrap.json', { assert: { type: 'json' } })).default

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

        deepEqual(cleanNode(node), {
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

        deepEqual(cleanNode(node), {
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

        deepEqual(cleanNode(node), {
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

        deepEqual(cleanNode(node), {
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

        deepEqual(cleanNode(node), {
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

        deepEqual(cleanNode(node), {
          type: 'element',
          tagName: 'p',
          attributes: [
            { key: 'class', value: 'three' },
            { key: 'id', value: 'other' }
          ],
          children: []
        })

        it('Using child property', function () {
          const node = findNode(nodes, {
            tag: 'p',
            child: { tag: 'href' }
          })

          deepEqual(cleanNode(node), {
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
          const node = findNode(nodes, { tag: 'nested2' })?.child({ tag: 'nested3' })

          deepEqual(cleanNode(node), {
            type: 'element',
            tagName: 'nested3',
            attributes: [],
            children: [{ type: 'text', content: 'Hello World!' }]
          })
        })
      })
    })

    describe('.text()', function () {
      it('Get value', function () {
        const text = findNode(nodes, { tag: 'nested3' })?.text()
        equal(text, 'Hello World!')
      })
    })

    describe('.attr()', function () {
      it('Get value', function () {
        const attr = findNode(nodes, { tag: 'p' })?.attr('class')
        equal(attr, 'three')
      })
    })
  })
})

/**
 * @param {ModifiedENode|undefined} node
 */
function cleanNode(node) {
  if (node) {
    // @ts-expect-error
    delete node.text
    // @ts-expect-error
    delete node.attr
    // @ts-expect-error
    delete node.child
  }

  return node
}
