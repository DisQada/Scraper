/** @import { ElementNode, Node } from '../types/options.js' */
import { ok } from 'assert/strict'
import { readFile } from 'fs/promises'

/** @type {ElementNode[]} */
const nodes = JSON.parse(await readFile('scrap.json', 'utf8'))

describe('scrap', function () {
  it('should be valid', async function () {
    ok(nodes.every(validNode))
  })
})

/**
 * Check if a json is a valid Himalaya output
 * @param {Node} node - the json to check (a single node)
 * @returns {boolean} whether the json is a valid Himalaya output
 */
function validNode(node) {
  if (typeof node !== 'object' || Array.isArray(node)) return false

  const types = ['element', 'text', 'comment']
  if (!types.includes(node.type)) return false

  switch (node.type) {
    case 'element':
      return (
        ['tagName', 'attributes', 'children'].every((prop) => prop in node) &&
        Array.isArray(node.attributes) &&
        node.attributes.every((attr) => typeof attr === 'object' && !Array.isArray(attr) && 'key' in attr) &&
        Array.isArray(node.children) &&
        node.children.every((child) => validNode(child))
      )

    case 'text':
    case 'comment':
      return 'content' in node && typeof node.content === 'string'
  }
}
