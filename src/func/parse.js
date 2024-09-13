/** @import { AttrKey, AttrsObj, AttrValue, HTMLStr, HTMLTag, Node, Child } from '../options.js' */
import { removeQuotes } from './util.js'

const regex = /(?:[^\s"'']+|"[^"]*"|'[^']*')+/g

/**
 * Parses an HTML string into an array of nodes and text.
 * @param {HTMLStr} html - The HTML string to parse.
 * @returns {Child[]} An array of nodes and text extracted from the HTML string.
 */
export function parse(html) {
  /** @type {Child[]} */
  const nodes = []
  let char
  let start = 0
  let depth = 0
  let comment = -1

  for (let i = 0; i < html.length; i++) {
    char = html[i]

    if (comment !== -1) {
      if (char === '-' && html[i + 1] === '-' && html[i + 2] === '>') {
        html = html.slice(0, comment) + html.slice(i + 3)

        i = comment - 1
        comment = -1
      }
      continue
    }

    if (char === '<') {
      if (html[i + 1] === '!') {
        comment = i
        continue
      }

      if (depth === 0 && i > 0) {
        const text = html.slice(start, i)
        start = i

        if (text !== '') nodes.push(text)
      }

      const nextChar = html[i + 1]
      if (nextChar !== '/') depth++
      if (nextChar === '/') depth--
    } else if (char === '>') {
      if (html[i - 1] === '/') depth--

      if (depth === 0) {
        const tag = html.slice(start, i + 1)
        start = i + 1

        const node = parseTag(tag)
        nodes.push(node)
      }
    }
  }
  if (start !== html.length) nodes.push(html.slice(start))

  return nodes
}

/**
 * Parses an HTML tag and its attributes.
 * @param {HTMLStr} html - The tag string to parse.
 * @returns {Node} An object representing the parsed tag and its attributes.
 */
export function parseTag(html) {
  /** @type {Node} */ const node = {}

  if (html.endsWith('/>')) html = html.slice(1, -2).trim()
  else if (html.endsWith('>')) html = html.slice(1, -1).trim()

  const spaceI = html.indexOf(' ')
  const endI = html.indexOf('>')
  const startI = html.lastIndexOf('</')

  const hasSpace = spaceI !== -1
  const hasCloseTag = endI !== -1 && startI !== -1

  const hasAttrs = hasSpace && (!hasCloseTag || (hasCloseTag && spaceI < endI))
  if (hasAttrs) {
    const attrsStr = html.slice(spaceI, endI !== -1 ? endI : html.length).trim()
    const attrs = parseAttrs(attrsStr)

    if (attrs) node.attrs = attrs
    html = html.replace(attrsStr, '').trim()
  }

  if (hasCloseTag) {
    /** @type {HTMLTag} */ // @ts-expect-error
    const tagName = html.slice(0, endI).trim()
    node.tag = tagName

    const inner = html.slice(endI + 1, startI)
    if (inner !== '') {
      const children = parse(inner)
      if (children.length > 0) node.children = children
    }
  } else {
    /** @type {HTMLTag} */ // @ts-expect-error
    const tag = html.slice(0)
    node.tag = tag
  }

  return node
}

/**
 * Parses attributes from a string.
 * @param {HTMLStr} html - The HTML text containing attributes.
 * @returns {AttrsObj | undefined} An object representing the parsed attributes.
 */
export function parseAttrs(html) {
  html = html.trim()
  if (html === '') return undefined

  html = html.replace(/\s*=\s*/g, '=')

  /** @type {AttrsObj} */
  const obj = {}
  const ans = html.match(regex)?.map((s) => s.replace(/["']/g, '')) || html

  for (const attr of ans) {
    const [key, value] = parseAttr(attr)
    obj[key] = value
  }

  return obj
}

/**
 * Parses a single attribute from a string.
 * @param {HTMLStr} html - The HTML text containing the attribute.
 * @returns {[AttrKey, AttrValue]} An array with the attribute name and value.
 */
export function parseAttr(html) {
  html = html.trim()
  const equalIndex = html.indexOf('=')
  if (equalIndex === -1) return [html, true]

  let key = html.slice(0, equalIndex).trim()
  let value = html.slice(equalIndex + 1).trim()

  value = removeQuotes(value)

  if (value === 'true') return [key, true]
  if (value === 'false') return [key, false]

  const num = Number(value)
  if (!isNaN(num)) return [key, num]

  if (value.includes(':')) {
    const obj = {}
    const pairs = value.split(';')
    for (const pair of pairs) {
      const [k, v] = pair.split(':')
      obj[k.trim()] = v.trim()
    }
    return [key, obj]
  }

  if (value.includes(' ')) return [key, value.split(' ')]

  return [key, value]
}
