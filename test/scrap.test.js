/** @import { Node, Child } from '../src/options.js' */
import { ok } from 'assert/strict'
import { readFile } from 'fs/promises'

/** @type {Node[]} */
const nodes = JSON.parse(await readFile('scrap.json', 'utf8'))

describe('scrap', function () {
  it('should be valid', function () {
    ok(nodes.every(validNode))
  })
})

/**
 * Check if a json is a valid Himalaya output
 * @param {Child} node - the json to check (a single node)
 * @returns {boolean} whether the json is a valid Himalaya output
 */
function validNode(node) {
  if (typeof node === 'string') return true
  if (typeof node !== 'object' || Array.isArray(node)) return false

  return (
    typeof node.tag === 'string' &&
    (node.attrs === undefined || (typeof node.attrs === 'object' && !Array.isArray(node.attrs))) &&
    (node.children === undefined || (Array.isArray(node.children) && node.children.every(validNode)))
  )
}
