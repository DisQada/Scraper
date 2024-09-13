/** @import { Attribute, AttrObj } from '../../src/options.js' */
import { ok } from 'assert/strict'
import { includesAttr, includesAttrs } from '../../src/func/match.js'

describe('func', function () {
  describe('match', function () {
    describe('includesAttr()', function () {
      it('With value', function () {
        /** @type {AttrObj[]} */
        const nodeAttrs = [{ key: 'class', value: 'yes' }]
        /** @type {Attribute} */
        const sAttr = { key: 'class', value: 'yes' }
        const result = includesAttr(nodeAttrs, sAttr)

        ok(result)
      })

      it('Without value', function () {
        /** @type {AttrObj[]} */
        const nodeAttrs = [{ key: 'href', value: 'https://example.com' }]
        /** @type {Attribute} */
        const sAttr = { key: 'href' }
        const result = includesAttr(nodeAttrs, sAttr)

        ok(result)
      })
    })

    describe('includesAttrs()', function () {
      it('With value', function () {
        /** @type {AttrObj[]} */
        const nodeAttrs = [{ key: 'class', value: 'yes' }]
        const result = includesAttrs(nodeAttrs, [{ key: 'class', value: 'yes' }])

        ok(result)
        ok(!includesAttrs(nodeAttrs, [{ key: 'class', value: 'no' }]))
        ok(!includesAttrs(nodeAttrs, [{ key: 'clazz', value: 'yes' }]))
        ok(
          !includesAttrs(nodeAttrs, [
            { key: 'class', value: 'yes' },
            { key: 'clazz', value: 'no' }
          ])
        )
      })

      it('Without value', function () {
        /** @type {AttrObj[]} */
        const nodeAttrs = [{ key: 'href', value: 'https://example.com' }]

        ok(includesAttrs(nodeAttrs, [{ key: 'href' }]))
        ok(!includesAttrs(nodeAttrs, [{ key: 'no' }]))
      })

      it('Empty array', function () {
        /** @type {AttrObj[]} */
        const nodeAttrs = [{ key: 'class', value: 'yes' }]

        ok(includesAttrs(nodeAttrs, []))
      })
    })
  })
})
