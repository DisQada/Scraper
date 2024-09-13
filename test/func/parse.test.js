import { equal, deepEqual } from 'assert/strict'
import { parse, parseTag, parseAttrs, parseAttr } from '../../src/func/parse.js'

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
  })

  describe('parseTag()', function () {
    it('should parse a plain tag', function () {
      const htmlArr = ['<div>', '< div >', '<div/>', '< div />', '<div></div>', '< div ></ div >']
      htmlArr.forEach((html) => {
        const tag = parseTag(html)
        deepEqual(tag, { tag: 'div' })
      })
    })

    it('should parse a tag with attributes', function () {
      const htmlArr = ["<div class='yes'>", "<div class='yes'>", '<div class="yes">', '< div class = "yes" >']
      htmlArr.forEach((html) => {
        const tag = parseTag(html)
        deepEqual(tag, {
          tag: 'div',
          attrs: { class: 'yes' }
        })
      })
    })

    it('should parse a tag with text', function () {
      let tag = parseTag('<p> </p>')
      deepEqual(tag, {
        tag: 'p',
        children: [' ']
      })

      tag = parseTag('<p>Text text</p>')
      deepEqual(tag, {
        tag: 'p',
        children: ['Text text']
      })

      tag = parseTag('<p>Text<p> </p>text</p>')
      deepEqual(tag, {
        tag: 'p',
        children: [
          'Text',
          {
            tag: 'p',
            children: [' ']
          },
          'text'
        ]
      })
    })
  })

  describe('parseAttrs()', function () {
    it('no attributes', function () {
      const htmlArr = ['', ' ']
      htmlArr.forEach((html) => {
        const tag = parseAttrs(html)
        equal(tag, undefined)
      })
    })

    it('one attribute', function () {
      const html = ' id="yes" '
      const tag = parseAttrs(html)
      deepEqual(tag, { id: 'yes' })
    })

    it('many attributes', function () {
      const html = ' id="yes" class="a-container panel" data-value="123" checked '
      const tag = parseAttrs(html)
      deepEqual(tag, {
        id: 'yes',
        class: ['a-container', 'panel'],
        'data-value': 123,
        checked: true
      })
    })
  })

  describe('parseAttr()', function () {
    it('text attributes', function () {
      const htmlArr = [' id="yes" ', " id='yes' "]
      htmlArr.forEach((html) => {
        const tag = parseAttr(html)
        deepEqual(tag, ['id', 'yes'])
      })

      const tag = parseAttr(' color="#fff" ')
      deepEqual(tag, ['color', '#fff'])
    })

    it('boolean attributes', function () {
      let tag = parseAttr(' checked ')
      deepEqual(tag, ['checked', true])

      tag = parseAttr(' checked="true" ')
      deepEqual(tag, ['checked', true])

      tag = parseAttr(' checked=true ')
      deepEqual(tag, ['checked', true])

      tag = parseAttr(' checked="false" ')
      deepEqual(tag, ['checked', false])

      tag = parseAttr(' checked=false ')
      deepEqual(tag, ['checked', false])
    })

    it('number attributes', function () {
      let tag = parseAttr(' priority=10 ')
      deepEqual(tag, ['priority', 10])

      tag = parseAttr(' priority="10" ')
      deepEqual(tag, ['priority', 10])

      tag = parseAttr(' priority="0x10" ')
      deepEqual(tag, ['priority', 0x10])
    })

    it('array attributes', function () {
      const tag = parseAttr(" class='a-container panel' ")
      deepEqual(tag, ['class', ['a-container', 'panel']])
    })

    it('object attributes', function () {
      const tag = parseAttr(' style="width: 360px; height: 120px; background-color: #fff" ')
      deepEqual(tag, [
        'style',
        {
          width: '360px',
          height: '120px',
          'background-color': '#fff'
        }
      ])
    })
  })
})
