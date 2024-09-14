import { ok, deepEqual } from 'assert/strict'
import { parse, fixNode } from '../../src/func/parse.js'

describe('parse', function () {
  describe('parse()', function () {
    it('should parse a text node without comment', function () {
      const html = '<div>Hello <!-- comment -->World</div>'
      const node = parse(html)
      deepEqual(node, [
        {
          tag: 'div',
          children: ['Hello World']
        }
      ])
    })

    it('should parse text nodes', function () {
      const html = 'Hello World'
      const nodes = parse(html)
      deepEqual(nodes, ['Hello World'])
    })

    it('should parse text nodes with tags', function () {
      const html = 'Hello <span>World</span>'
      const nodes = parse(html)
      deepEqual(nodes, [
        'Hello ',
        {
          tag: 'span',
          children: ['World']
        }
      ])
    })

    it('should parse a text node', function () {
      const html = '<div>Hello<span>My</span>World</div>'
      const node = parse(html)
      deepEqual(node, [
        {
          tag: 'div',
          children: [
            'Hello',
            {
              tag: 'span',
              children: ['My']
            },
            'World'
          ]
        }
      ])
    })

    it('should parse text nodes with multiple tags', function () {
      const html = 'Hello <span>World</span> <span>!</span>!'
      const nodes = parse(html)
      deepEqual(nodes, [
        'Hello ',
        {
          tag: 'span',
          children: ['World']
        },
        ' ',
        { tag: 'span', children: ['!'] },
        '!'
      ])
    })

    it('should parse text nodes with nested tags', function () {
      const html = 'Hello <span>World <b>bold</b></span>!'
      const nodes = parse(html)
      deepEqual(nodes, [
        'Hello ',
        {
          tag: 'span',
          children: ['World ', { tag: 'b', children: ['bold'] }]
        },
        '!'
      ])
    })

    it('should parse text nodes with self-closing tags', function () {
      const html = 'Hello <img src="image.jpg"/>!'
      const nodes = parse(html)
      deepEqual(nodes, ['Hello ', { tag: 'img', attrs: { src: 'image.jpg' } }, '!'])
    })

    it('should parse text nodes with multiple tags2', function () {
      const html = 'Hello <img src="image.jpg"/><br/>!'
      const nodes = parse(html)
      deepEqual(nodes, ['Hello ', { tag: 'img', attrs: { src: 'image.jpg' } }, { tag: 'br' }, '!'])
    })

    it('should parse index.html example without formatting', function () {
      const html =
        '<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Document</title></head><body></body></html>'
      const nodes = parse(html)
      deepEqual(nodes, [
        {
          tag: '!doctype',
          attrs: { html: true }
        },
        {
          tag: 'html',
          attrs: { lang: 'en' },
          children: [
            {
              tag: 'head',
              children: [
                { tag: 'meta', attrs: { charset: 'UTF-8' } },
                { tag: 'meta', attrs: { name: 'viewport', content: ['width=device-width', 'initial-scale=1.0'] } },
                { tag: 'title', children: ['Document'] }
              ]
            },
            { tag: 'body' }
          ]
        }
      ])
    })
  })

  describe('fixNode()', function () {
    it('should fix a text node', function () {
      const n = fixNode({ type: 'text', content: 'Hello World' })
      deepEqual(n, 'Hello World')
    })

    it('should fix an element node', function () {
      const n = fixNode({
        type: 'element',
        tagName: 'div',
        attributes: [],
        children: [{ type: 'text', content: 'Hello World' }]
      })
      deepEqual(n, {
        tag: 'div',
        children: ['Hello World']
      })
    })

    it('should fix an element node with attributes', function () {
      const n = fixNode({
        type: 'element',
        tagName: 'div',
        attributes: [{ key: 'class', value: 'container' }],
        children: [{ type: 'text', content: 'Hello World' }]
      })
      deepEqual(n, {
        tag: 'div',
        attrs: { class: 'container' },
        children: ['Hello World']
      })
    })
  })
})
