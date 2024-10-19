/** @import { AttrsObj, AttrStr, Child, Node, Selector } from '../../src/options.js' */
import { ok } from 'assert/strict'
import {
  matchNode,
  matchChildren,
  matchChild,
  includesAttrsObj,
  includesAttrs,
  includesAttr
} from '../../src/func/match.js'

describe('match', function () {
  describe('includesAttr()', function () {
    /** @type {AttrsObj} */ let nAttrs = { class: 'yes' }
    /** @type {AttrStr} */ let sAttr

    it('', function () {
      sAttr = 'class=yes'
      ok(includesAttr(nAttrs, sAttr))

      sAttr = 'class="yes"'
      ok(includesAttr(nAttrs, sAttr))

      sAttr = "class='yes'"
      ok(includesAttr(nAttrs, sAttr))

      sAttr = 'class'
      ok(includesAttr(nAttrs, sAttr))

      sAttr = 'class='
      ok(!includesAttr(nAttrs, sAttr))
    })
  })

  describe('includesAttrs()', function () {
    /** @type {AttrsObj} */ let nAttrs

    it('With value', function () {
      nAttrs = { class: 'yes' }
      ok(includesAttrs(nAttrs, ['class=yes']))
      ok(!includesAttrs(nAttrs, ['class=no']))
      ok(!includesAttrs(nAttrs, ['clazz=yes']))
      ok(!includesAttrs(nAttrs, ['class=yes', 'clazz=no']))
    })

    it('Without value', function () {
      nAttrs = { href: 'https://example.com' }
      ok(includesAttrs(nAttrs, ['href']))
      ok(!includesAttrs(nAttrs, ['a']))
    })

    it('Empty nodes object', function () {
      nAttrs = {}
      ok(includesAttrs(nAttrs, []))

      nAttrs = { class: 'yes' }
      ok(includesAttrs(nAttrs, []))

      nAttrs = {}
      ok(!includesAttrs(nAttrs, ['class']))
    })

    it("Match isn't enough", function () {
      nAttrs = { class: 'yes' }
      ok(!includesAttrs(nAttrs, ['class=yes', 'id=no']))
    })
  })

  describe('includesAttrsObj()', function () {
    /** @type {AttrsObj} */ let nAttrs

    it('With value', function () {
      nAttrs = { class: 'yes' }
      ok(includesAttrsObj(nAttrs, { class: 'yes' }))
      ok(!includesAttrsObj(nAttrs, { class: 'no' }))
      ok(!includesAttrsObj(nAttrs, { clazz: 'yes' }))
      ok(!includesAttrsObj(nAttrs, { class: 'yes', clazz: 'no' }))
    })

    it('Without value', function () {
      nAttrs = { href: 'https://example.com' }
      ok(includesAttrsObj(nAttrs, { href: undefined }))
      ok(!includesAttrsObj(nAttrs, { a: undefined }))
    })

    it('Empty nodes object', function () {
      nAttrs = {}
      ok(includesAttrsObj(nAttrs, {}))

      nAttrs = { class: 'yes' }
      ok(includesAttrsObj(nAttrs, {}))

      nAttrs = {}
      ok(!includesAttrsObj(nAttrs, { class: undefined }))
    })

    it("Match isn't enough", function () {
      nAttrs = { class: 'yes' }
      ok(!includesAttrsObj(nAttrs, { class: 'yes', id: 'no' }))
    })
  })

  describe('matchChild()', function () {
    /** @type {Child[]} */ let children
    /** @type {Selector} */ let sel

    it('Empty nodes', function () {
      children = []
      sel = { tag: 'p' }
      ok(!matchChild(children, sel))
    })

    it('Empty selector', function () {
      children = [{ tag: 'p' }]
      sel = {}
      ok(matchChild(children, sel))
    })

    it('Match', function () {
      children = [{ tag: 'p' }]
      sel = { tag: 'p' }
      ok(matchChild(children, sel))
    })

    it('No match', function () {
      children = [{ tag: 'p' }]
      sel = { tag: 'a' }
      ok(!matchChild(children, sel))
    })
  })

  describe('matchChildren()', function () {
    /** @type {Child[]} */ let children
    /** @type {Selector[]} */ let selArr

    it('Empty nodes', function () {
      children = []
      selArr = []
      ok(matchChildren(children, selArr))
    })

    it('Empty selector', function () {
      children = [{ tag: 'p' }]
      selArr = []
      ok(matchChildren(children, selArr))
    })

    it('Match one', function () {
      children = [{ tag: 'p' }]
      selArr = [{ tag: 'p' }]
      ok(matchChildren(children, selArr))
    })

    it('Match some', function () {
      children = [{ tag: 'p' }, { tag: 'a' }]
      selArr = [{ tag: 'p' }]
      ok(matchChildren(children, selArr))
    })

    it('Match all', function () {
      children = [{ tag: 'p' }, { tag: 'a' }]
      selArr = [{ tag: 'p' }, { tag: 'a' }]
      ok(matchChildren(children, selArr))
    })

    it('Match not enough', function () {
      children = [{ tag: 'p' }]
      selArr = [{ tag: 'p' }, { tag: 'a' }]
      ok(!matchChildren(children, selArr))
    })

    it('No match', function () {
      children = [{ tag: 'p' }]
      selArr = [{ tag: 'a' }]
      ok(!matchChildren(children, selArr))
    })
  })

  describe('matchNode()', function () {
    /** @type {Node} */ let node
    /** @type {Selector} */ let sel

    it('Empty selector', function () {
      node = { tag: 'p' }
      sel = {}
      ok(matchNode(node, sel))
    })

    it('Tag matching', function () {
      node = { tag: 'p' }

      sel = { tag: 'p' }
      ok(matchNode(node, sel))

      /** @type {Selector} */
      sel = { tag: 'a' }
      ok(!matchNode(node, sel))
    })

    it('Attribute matching', function () {
      node = { tag: 'p', attrs: { class: 'yes' } }

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
      node = { tag: 'p', children: [{ tag: 'a' }] }

      sel = { child: { tag: 'a' } }
      ok(matchNode(node, sel))

      sel = { child: { tag: 'p' } }
      ok(!matchNode(node, sel))
    })

    it('Match some', function () {
      node = { tag: 'p', attrs: { class: 'yes' }, children: [{ tag: 'a' }] }

      sel = { tag: 'div', attr: 'class=yes', child: { tag: 'a' } }
      ok(!matchNode(node, sel))

      sel = { tag: 'p', attr: 'class=no', child: { tag: 'a' } }
      ok(!matchNode(node, sel))

      sel = { tag: 'p', attr: 'class=yes', child: { tag: 'p' } }
      ok(!matchNode(node, sel))
    })

    it('Match all', function () {
      node = { tag: 'p', attrs: { class: 'yes' }, children: [{ tag: 'a' }] }
      sel = { tag: 'p', attr: 'class=yes', child: { tag: 'a' } }

      ok(matchNode(node, sel))
    })
  })
})
