/** @import { HTMLStr, Node, Child, AttrValue, AttrKey } from '../options.js' */
import { parse as himalaya } from 'himalaya'

/**
 * Parses an HTML string into an array of nodes and text.
 *
 * Using the `himalaya` package to parse the HTML string into an array of nodes and text.
 * @param {HTMLStr} html - The HTML string to parse.
 * @returns {Child[]} An array of nodes and text extracted from the HTML string.
 */
export function parse(html) {
  /** @type {HNode[]} */
  const hNodes = himalaya(html)

  /** @type {Child[]} */
  const nodes = removeComments(hNodes).map(fixNode)
  return nodes
}

/**
 * @param {ElementNode | TextNode} el
 * @returns {Child}
 */
export function fixNode(el) {
  if (el.type === 'text') return el.content

  /** @type {Node} */ // @ts-expect-error
  const n = { tag: el.tagName }

  if (el.attributes.length > 0) {
    const attrs = {}

    for (let i = 0; i < el.attributes.length; i++) {
      const { key, value } = el.attributes[i]
      if (key === 'style') continue

      attrs[key] = parseValue(key, value)
    }

    if (Object.keys(attrs).length > 0) n.attrs = attrs
  }

  if (el.children.length > 0) {
    n.children = removeComments(el.children).map(fixNode)
  }

  return n
}

/**
 * Merges adjacent text nodes in an array of nodes.
 * @param {HNode[]} nodes - The array of nodes to process.
 * @returns {HNode2[]} The processed array with merged text nodes.
 */
function removeComments(nodes) {
  /** @type {HNode2[]} */
  const newNodes = []

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]

    if (n.type === 'text') newNodes.push(n)
    else if (n.type === 'comment') {
      if (newNodes.length === 0) continue

      const prev = newNodes[newNodes.length - 1]
      const next = nodes[i + 1]

      if (prev.type === 'text' && next.type === 'text') {
        // Merge with the previous text node
        prev.content += next.content
        newNodes[newNodes.length - 1] = prev
        i++ // Skip the next text node
      }
    } else if (n.type === 'element') {
      if (n.children.length > 0) n.children = removeComments(n.children) // Recursively process children
      newNodes.push(n)
    }
  }

  return newNodes
}

/**
 * Parses a single attribute value from a string.
 * @param {AttrKey} key
 * @param {string} value
 * @returns {AttrValue}
 */
export function parseValue(key, value) {
  if (value === 'true' || value === null) return true
  if (value === 'false') return false

  const num = Number(value)
  if (!isNaN(num)) return num

  if (['class', 'rel', 'headers', 'autocomplete', 'sandbox', 'ping'].some((x) => key === x)) return value.split(' ')
  if (value.includes('=') && ['srcset', 'accept', 'content'].some((x) => key === x))
    return value.split(',').map((v) => v.trim())

  return value
}

/**
 * @private
 * @typedef {ElementNode | TextNode} HNode2
 */

/**
 * @private
 * @typedef {ElementNode | TextNode | CommentNode} HNode
 */

/**
 * @private
 * @typedef {object} ElementNode
 * @property {'element'} type
 * @property {string} tagName
 * @property {HNode[]} children
 * @property {{key:string, value:string}[]} attributes
 */

/**
 * @private
 * @typedef {object} TextNode
 * @property {'text'} type
 * @property {string} content
 */

/**
 * @private
 * @typedef {object} CommentNode
 * @property {'comment'} type
 * @property {string} content
 */
