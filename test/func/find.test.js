const { findNode } = require('../../src/func/find')

/** @type {import('../../src/options').ElementNode[]} */
// @ts-expect-error
const nodes = require('../scrap.json')

describe('Find the first node', () => {
  test('Using tag name and attributes', () => {
    const node = findNode(nodes, {
      tag: 'p',
      attr: [
        {
          key: 'class',
          value: 'three'
        },
        {
          key: 'id',
          value: 'other'
        }
      ]
    })

    if (node) {
      // @ts-expect-error
      delete node.text
      // @ts-expect-error
      delete node.attr
      // @ts-expect-error
      delete node.child
    }

    expect(node).toEqual({
      type: 'element',
      tagName: 'p',
      attributes: [
        {
          key: 'class',
          value: 'three'
        },
        {
          key: 'id',
          value: 'other'
        }
      ],
      children: []
    })
  })

  test('Using tag name only', () => {
    const node = findNode(nodes, {
      tag: 'a'
    })

    if (node) {
      // @ts-expect-error
      delete node.text
      // @ts-expect-error
      delete node.attr
      // @ts-expect-error
      delete node.child
    }

    expect(node).toEqual({
      type: 'element',
      tagName: 'a',
      attributes: [
        {
          key: 'class',
          value: 'one'
        }
      ],
      children: []
    })
  })

  test('Using attributes only', () => {
    const node = findNode(nodes, {
      attr: [
        {
          key: 'class',
          value: 'two'
        }
      ]
    })

    if (node) {
      // @ts-expect-error
      delete node.text
      // @ts-expect-error
      delete node.attr
      // @ts-expect-error
      delete node.child
    }

    expect(node).toEqual({
      type: 'element',
      tagName: 'img',
      attributes: [
        {
          key: 'class',
          value: 'two'
        }
      ],
      children: []
    })
  })
})

describe('Find the first node with string attributes', () => {
  test('Using tag name and string attributes', () => {
    const node = findNode(nodes, {
      tag: 'p',
      attr: ['class=three', 'id=other']
    })

    if (node) {
      // @ts-expect-error
      delete node.text
      // @ts-expect-error
      delete node.attr
      // @ts-expect-error
      delete node.child
    }

    expect(node).toEqual({
      type: 'element',
      tagName: 'p',
      attributes: [
        {
          key: 'class',
          value: 'three'
        },
        {
          key: 'id',
          value: 'other'
        }
      ],
      children: []
    })
  })

  test('Using string attributes only', () => {
    const node = findNode(nodes, {
      attr: ['class=two']
    })

    if (node) {
      // @ts-expect-error
      delete node.text
      // @ts-expect-error
      delete node.attr
      // @ts-expect-error
      delete node.child
    }

    expect(node).toEqual({
      type: 'element',
      tagName: 'img',
      attributes: [
        {
          key: 'class',
          value: 'two'
        }
      ],
      children: []
    })
  })

  test('Using array of string attributes only', () => {
    const node = findNode(nodes, {
      attr: ['class=three', 'id=other']
    })

    if (node) {
      // @ts-expect-error
      delete node.text
      // @ts-expect-error
      delete node.attr
      // @ts-expect-error
      delete node.child
    }

    expect(node).toEqual({
      type: 'element',
      tagName: 'p',
      attributes: [
        {
          key: 'class',
          value: 'three'
        },
        {
          key: 'id',
          value: 'other'
        }
      ],
      children: []
    })
  })

  test('Using child property', () => {
    const node = findNode(nodes, {
      tag: 'p',
      child: {
        tag: 'href'
      }
    })

    if (node) {
      // @ts-expect-error
      delete node.text
      // @ts-expect-error
      delete node.attr
      // @ts-expect-error
      delete node.child
    }

    expect(node).toEqual({
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

  test('Using child chain function', () => {
    const node = findNode(nodes, {
      tag: 'nested2'
    })?.child({
      tag: 'nested3'
    })

    if (node) {
      // @ts-expect-error
      delete node.text
      // @ts-expect-error
      delete node.attr
      // @ts-expect-error
      delete node.child
    }

    expect(node).toEqual({
      type: 'element',
      tagName: 'nested3',
      attributes: [],
      children: [
        {
          type: 'text',
          content: 'Hello World!'
        }
      ]
    })
  })
})

describe('Get value', () => {
  test('Get text value', () => {
    const text = findNode(nodes, {
      tag: 'nested3'
    })?.text()

    expect(text).toEqual('Hello World!')
  })

  test('Get attribute value', () => {
    const attr = findNode(nodes, {
      tag: 'p'
    })?.attr('class')

    expect(attr).toEqual('three')
  })
})
