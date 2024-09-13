/** @import { ElementNode, Node } from '../src/options.js' */
import { ok } from 'assert/strict'
import { readFile } from 'fs/promises'

/** @type {ElementNode[]} */
const nodes = JSON.parse(await readFile('scrap.json', 'utf8'))

describe('scrap', function () {
  it('should be valid', function () {
    ok(nodes.every(validNode))
  })
})

/**
 * Check if a node is a valid Himalaya output
 * @param {Node} node - the node to check
 * @returns {boolean} whether the node is a valid Himalaya output
 */
function validNode(node) {
  if (typeof node !== 'object' || Array.isArray(node)) return false

  const types = ['element', 'text', 'comment']
  if (!types.includes(node.type)) return false

  if (node.type === 'text' || node.type === 'comment') return typeof node.content === 'string'

  if (node.type === 'element') {
    return (
      ['tagName', 'attributes', 'children'].every((key) => key in node) &&
      Array.isArray(node.attributes) &&
      node.attributes.every((a) => typeof a === 'object' && !Array.isArray(a) && 'key' in a && 'value' in a) &&
      Array.isArray(node.children) &&
      node.children.every((c) => validNode(c))
    )
  }

  return false
}
