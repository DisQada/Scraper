const { attrsSubset, attrExists } = require('../../src/func/match')

describe('Checking the existence of a single attribute', () => {
  test('With value', () => {
    /** @type {import('../../src/options').ObjAttr[]} */
    const nodeAttrs = [
      {
        key: 'class',
        value: 'yes'
      }
    ]
    /** @type {import('../../src/options').Attribute} */
    const sAttr = {
      key: 'class',
      value: 'yes'
    }
    const result = attrExists(nodeAttrs, sAttr)
    expect(result).toBeTruthy()
  })

  test('Without value', () => {
    /** @type {import('../../src/options').ObjAttr[]} */
    const nodeAttrs = [
      {
        key: 'href',
        value: 'https://example.com'
      }
    ]
    /** @type {import('../../src/options').Attribute} */
    const sAttr = {
      key: 'href'
    }
    const result = attrExists(nodeAttrs, sAttr)
    expect(result).toBeTruthy()
  })
})

describe('Checking the existence of multiple attributes', () => {
  test('With value', () => {
    /** @type {import('../../src/options').ObjAttr[]} */
    const nodeAttrs = [
      {
        key: 'class',
        value: 'yes'
      }
    ]

    const result = attrsSubset(nodeAttrs, [
      {
        key: 'class',
        value: 'yes'
      }
    ])
    expect(result).toBeTruthy()

    expect(
      attrsSubset(nodeAttrs, [
        {
          key: 'class',
          value: 'no'
        }
      ])
    ).toBeFalsy()

    expect(
      attrsSubset(nodeAttrs, [
        {
          key: 'clazz',
          value: 'yes'
        }
      ])
    ).toBeFalsy()

    expect(
      attrsSubset(nodeAttrs, [
        {
          key: 'class',
          value: 'yes'
        },
        {
          key: 'clazz',
          value: 'no'
        }
      ])
    ).toBeFalsy()
  })

  test('Without value', () => {
    /** @type {import('../../src/options').ObjAttr[]} */
    const nodeAttrs = [
      {
        key: 'href',
        value: 'https://example.com'
      }
    ]

    expect(
      attrsSubset(nodeAttrs, [
        {
          key: 'href'
        }
      ])
    ).toBeTruthy()

    expect(
      attrsSubset(nodeAttrs, [
        {
          key: 'no'
        }
      ])
    ).toBeFalsy()
  })
})

describe('No or empty selector attributes', () => {
  test('Empty array', () => {
    /** @type {import('../../src/options').ObjAttr[]} */
    const nodeAttrs = [
      {
        key: 'class',
        value: 'yes'
      }
    ]

    expect(attrsSubset(nodeAttrs, [])).toBeFalsy()
  })
})
