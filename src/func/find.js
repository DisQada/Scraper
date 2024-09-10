/** @import {Node, Selector, ModifiedENode, ElementNode, GetChild, GetAttr, GetText} from '../options.js' */
import { matchNode } from './match.js'
import { parse } from 'himalaya'

/**
 * Finding a node according to the given selector.
 * @param {string | Node[]} nodes - The node array to search in.
 * @param {Selector} sel - The selectors defining the node wanted to be returned.
 * @returns {ModifiedENode | undefined} The found node.
 * @public
 */
export function findNode(nodes, sel) {
  /** @type {Node[]} */
  const _nodes = typeof nodes === 'string' ? parse(nodes) : nodes

  if (!_nodes || _nodes.length === 0) return

  for (let i = 0; i < _nodes.length; i++) {
    const node = _nodes[i]
    if (node.type !== 'element') continue

    if (matchNode(node, sel)) return modifyNode(node)

    const found = findNode(node.children, sel)
    if (found) return found
  }
}

/**
 * Prepare a node for chaining.
 * @param {ElementNode} node - The found node.
 * @returns {ModifiedENode} The node after adding to it the chain properties.
 * @private
 */
export function modifyNode(node) {
  // @ts-expect-error
  node.getChild = getChild.bind(node)
  // @ts-expect-error
  node.getAttr = getAttr.bind(node)
  // @ts-expect-error
  node.getText = getText.bind(node)

  // @ts-expect-error
  return node
}

/** @type {GetChild} */
export function getChild(sel) {
  return findNode(this.children, sel)
}

/** @type {GetAttr} */
export function getAttr(key) {
  const len = this.attributes.length
  if (len === 0) return

  for (let i = 0; i < len; i++) {
    const attr = this.attributes[i]
    if (attr.key === key) return attr.value
  }
}

/** @type {GetText} */
export function getText(options) {
  const len = this.children.length
  if (len === 0) return ''

  let text = ''
  for (let i = 0; i < len; i++) {
    const c = this.children[i]
    if (c.type === 'text') text += c.content
    else if (options?.deep && c.type === 'element') text += getText.call(c, options)
  }

  return text
}
