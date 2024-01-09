const { grabText, grabAttr } = require('../../src/func/grab')

/** @type {import('../../src/options').ElementNode[]} */
// @ts-expect-error
const json = require('../scrap.json')

describe('Grabing text', () => {
  test('Without options', () => {
    const text = grabText(json, {
      tag: 'nested3'
    })

    expect(text).toEqual('Hello World!')
  })

  test('With options.deep', () => {
    const text = grabText(
      json,
      {
        tag: 'nested3'
      },
      { deep: true }
    )

    expect(text).toEqual('Hello World!')
  })
})

describe('Grabing attr', () => {
  test('...', () => {
    const arr = grabAttr(
      json,
      {
        tag: 'p'
      },
      'class'
    )

    expect(arr).toEqual('three')
  })
})
