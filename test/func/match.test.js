/** @import { AttrObj, AttrStr, ElementNode, Node, Selector } from '../../src/options.js' */
import { ok, deepEqual } from 'assert/strict'
import {
  matchNode,
  matchChildren,
  matchChild,
  includesAttrs,
  includesAttr,
  toObjAttrs,
  toObjAttr
} from '../../src/func/match.js'

describe('match', function () {
  describe('toObjAttr()', function () {
    it('Obj', function () {
      /** @type {AttrObj} */ let attr

      attr = { key: 'class', value: undefined }
      deepEqual(toObjAttr(attr), attr)

      attr = { key: 'class', value: 'yes' }
      deepEqual(toObjAttr(attr), attr)
    })

    it('String', function () {
      /** @type {AttrStr} */ let attr
      /** @type {AttrObj} */ let expected

      attr = 'class=yes'
      expected = { key: 'class', value: 'yes' }
      deepEqual(toObjAttr(attr), expected)

      attr = 'class="yes"'
      expected = { key: 'class', value: 'yes' }
      deepEqual(toObjAttr(attr), expected)

      attr = 'class='
      expected = { key: 'class', value: '' }
      deepEqual(toObjAttr(attr), expected)

      // attr = 'class'
      // expected = { key: 'class', value: true }
      // deepEqual(toObjAttr(attr), expected)
    })
  })

  describe('toObjAttrs()', function () {
    it('Obj', function () {
      /** @type {AttrObj[]} */ let attrs

      attrs = [
        { key: 'class', value: 'yes' },
        { key: 'id', value: 'no' }
      ]
      deepEqual(toObjAttrs(attrs), attrs)
    })

    it('String', function () {
      /** @type {AttrStr[]} */ let attrs
      /** @type {AttrObj[]} */ let expected

      attrs = ['class=yes', 'id=no']
      expected = [
        { key: 'class', value: 'yes' },
        { key: 'id', value: 'no' }
      ]
      deepEqual(toObjAttrs(attrs), expected)
    })
  })

  describe('includesAttr()', function () {
    /** @type {AttrObj[]} */ const nAttrs = [{ key: 'class', value: 'yes' }]

    it('Object selector', function () {
      /** @type {AttrObj} */ let sAttr

      sAttr = { key: 'class', value: 'yes' }
      ok(includesAttr(nAttrs, sAttr))

      sAttr = { key: 'class', value: undefined }
      ok(includesAttr(nAttrs, sAttr))
    })

    it('With value', function () {
      /** @type {AttrStr} */ let sAttr

      sAttr = 'class=yes'
      ok(includesAttr(nAttrs, sAttr))

      sAttr = 'class='
      ok(!includesAttr(nAttrs, sAttr))

      // sAttr = 'class' // value is true
      // ok(!includesAttr(nAttrs, sAttr))
    })
  })

  describe('includesAttrs()', function () {
    /** @type {AttrObj[]} */ let nAttrs
    /** @type {AttrObj[]} */ let selAttrs

    it('With value', function () {
      nAttrs = [{ key: 'class', value: 'yes' }]

      selAttrs = [{ key: 'class', value: 'yes' }]
      ok(includesAttrs(nAttrs, selAttrs))

      selAttrs = [{ key: 'class', value: 'no' }]
      ok(!includesAttrs(nAttrs, selAttrs))

      selAttrs = [{ key: 'clazz', value: 'yes' }]
      ok(!includesAttrs(nAttrs, selAttrs))
    })

    it('Without value', function () {
      nAttrs = [{ key: 'href', value: 'https://example.com' }]

      selAttrs = [{ key: 'href', value: undefined }]
      ok(includesAttrs(nAttrs, selAttrs))

      selAttrs = [{ key: 'a', value: undefined }]
      ok(!includesAttrs(nAttrs, selAttrs))
    })

    it('Empty nodes object', function () {
      nAttrs = []
      selAttrs = [{ key: 'class', value: 'yes' }]
      ok(!includesAttrs(nAttrs, selAttrs))
    })

    it('Empty selector array', function () {
      nAttrs = [{ key: 'class', value: 'yes' }]
      selAttrs = []
      ok(includesAttrs(nAttrs, selAttrs))
    })

    it("Match isn't enough", function () {
      nAttrs = [{ key: 'class', value: 'yes' }]
      selAttrs = [
        { key: 'class', value: 'yes' },
        { key: 'id', value: 'no' }
      ]
      ok(!includesAttrs(nAttrs, selAttrs))
    })
  })

  describe('matchChild()', function () {
    /** @type {Node[]} */ let children
    /** @type {Selector} */ let sel

    it('Empty nodes', function () {
      children = []
      sel = { tag: 'p' }
      ok(!matchChild(children, sel))
    })

    it('Empty selector', function () {
      children = [{ type: 'element', tagName: 'p', attributes: [], children: [] }]
      sel = {}
      ok(matchChild(children, sel))
    })

    it('Match', function () {
      children = [{ type: 'element', tagName: 'p', attributes: [], children: [] }]
      sel = { tag: 'p' }
      ok(matchChild(children, sel))
    })

    it('No match', function () {
      children = [{ type: 'element', tagName: 'p', attributes: [], children: [] }]
      sel = { tag: 'a' }
      ok(!matchChild(children, sel))
    })
  })

  describe('matchChildren()', function () {
    /** @type {Node[]} */ let children
    /** @type {Selector[]} */ let selArr

    it('Empty nodes', function () {
      children = []
      selArr = []
      ok(matchChildren(children, selArr))
    })

    it('Empty selector', function () {
      children = [{ type: 'element', tagName: 'p', attributes: [], children: [] }]
      selArr = []
      ok(matchChildren(children, selArr))
    })

    it('Match one', function () {
      children = [{ type: 'element', tagName: 'p', attributes: [], children: [] }]
      selArr = [{ tag: 'p' }]
      ok(matchChildren(children, selArr))
    })

    it('Match some', function () {
      children = [
        { type: 'element', tagName: 'p', attributes: [], children: [] },
        { type: 'element', tagName: 'a', attributes: [], children: [] }
      ]
      selArr = [{ tag: 'p' }]
      ok(matchChildren(children, selArr))
    })

    it('Match all', function () {
      children = [
        { type: 'element', tagName: 'p', attributes: [], children: [] },
        { type: 'element', tagName: 'a', attributes: [], children: [] }
      ]
      selArr = [{ tag: 'p' }, { tag: 'a' }]
      ok(matchChildren(children, selArr))
    })

    it('Match not enough', function () {
      children = [{ type: 'element', tagName: 'p', attributes: [], children: [] }]
      selArr = [{ tag: 'p' }, { tag: 'a' }]

      ok(!matchChildren(children, selArr))
    })

    it('No match', function () {
      children = [{ type: 'element', tagName: 'p', attributes: [], children: [] }]
      selArr = [{ tag: 'a' }]

      ok(!matchChildren(children, selArr))
    })
  })

  describe('matchNode()', function () {
    /** @type {ElementNode} */ let node
    /** @type {Selector} */ let sel

    it('Empty selector', function () {
      node = { type: 'element', tagName: 'p', attributes: [], children: [] }
      sel = {}
      ok(matchNode(node, sel))
    })

    it('Tag matching', function () {
      node = { type: 'element', tagName: 'p', attributes: [], children: [] }

      sel = { tag: 'p' }
      ok(matchNode(node, sel))

      sel = { tag: 'a' }
      ok(!matchNode(node, sel))
    })

    it('Attribute matching', function () {
      node = { type: 'element', tagName: 'p', attributes: [{ key: 'class', value: 'yes' }], children: [] }

      // 'yes' === 'yes'
      sel = { attr: 'class=yes' }
      ok(matchNode(node, sel))

      // 'yes' !== 'no'
      sel = { attr: 'class=no' }
      ok(!matchNode(node, sel))

      // 'yes' !== ''
      sel = { attr: 'class=' }
      ok(!matchNode(node, sel))

      // // 'yes' !== true
      // sel = { attr: 'class' }
      // ok(!matchNode(node, sel))
    })

    it('Children matching', function () {
      node = {
        type: 'element',
        tagName: 'p',
        attributes: [],
        children: [{ type: 'element', tagName: 'a', attributes: [], children: [] }]
      }

      sel = { child: { tag: 'a' } }
      ok(matchNode(node, sel))

      sel = { child: { tag: 'p' } }
      ok(!matchNode(node, sel))
    })

    it('Match some', function () {
      node = { type: 'element', tagName: 'p', attributes: [{ key: 'class', value: 'yes' }], children: [] }

      sel = { tag: 'div', attr: 'class=yes', child: { tag: 'a' } }
      ok(!matchNode(node, sel))

      sel = { tag: 'p', attr: 'class=no', child: { tag: 'a' } }
      ok(!matchNode(node, sel))

      sel = { tag: 'p', attr: 'class=yes', child: { tag: 'p' } }
      ok(!matchNode(node, sel))
    })

    it('Match all', function () {
      node = {
        type: 'element',
        tagName: 'p',
        attributes: [{ key: 'class', value: 'yes' }],
        children: [{ type: 'element', tagName: 'a', attributes: [], children: [] }]
      }
      sel = { tag: 'p', attr: 'class=yes', child: { tag: 'a' } }

      ok(matchNode(node, sel))
    })
  })
})
