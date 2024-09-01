/** @import {ObjAttr, Attribute} from '../../src/options.js' */
import { ok } from 'assert/strict'
import { attrExists, attrsSubset } from '../../src/func/match.js'

describe('func', function () {
  describe('match', function () {
    describe('attrExists()', function () {
      it('With value', function () {
        /** @type {ObjAttr[]} */
        const nodeAttrs = [{ key: 'class', value: 'yes' }]
        /** @type {Attribute} */
        const sAttr = { key: 'class', value: 'yes' }
        const result = attrExists(nodeAttrs, sAttr)

        ok(result)
      })

      it('Without value', function () {
        /** @type {ObjAttr[]} */
        const nodeAttrs = [{ key: 'href', value: 'https://example.com' }]
        /** @type {Attribute} */
        const sAttr = { key: 'href' }
        const result = attrExists(nodeAttrs, sAttr)

        ok(result)
      })
    })

    describe('attrsSubset()', function () {
      it('With value', function () {
        /** @type {ObjAttr[]} */
        const nodeAttrs = [{ key: 'class', value: 'yes' }]
        const result = attrsSubset(nodeAttrs, [{ key: 'class', value: 'yes' }])

        ok(result)
        ok(!attrsSubset(nodeAttrs, [{ key: 'class', value: 'no' }]))
        ok(!attrsSubset(nodeAttrs, [{ key: 'clazz', value: 'yes' }]))
        ok(
          !attrsSubset(nodeAttrs, [
            { key: 'class', value: 'yes' },
            { key: 'clazz', value: 'no' }
          ])
        )
      })

      it('Without value', function () {
        /** @type {ObjAttr[]} */
        const nodeAttrs = [{ key: 'href', value: 'https://example.com' }]

        ok(attrsSubset(nodeAttrs, [{ key: 'href' }]))
        ok(!attrsSubset(nodeAttrs, [{ key: 'no' }]))
      })

      it('Empty array', function () {
        /** @type {ObjAttr[]} */
        const nodeAttrs = [{ key: 'class', value: 'yes' }]

        ok(!attrsSubset(nodeAttrs, []))
      })
    })
  })
})
