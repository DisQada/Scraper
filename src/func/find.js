/** @import { GetAttr, GetChild, GetText, ModNode, Node, Child, Selector } from '../options.js' */
import { matchNode } from './match.js'

/**
 * Finding a node according to the given selector.
 * @param {Node[]} nodes - The node array to search in.
 * @param {Selector} sel - The selectors defining the node wanted to be returned.
 * @returns {ModNode | undefined} The found node.
 * @public
 */
export function findNode(nodes, sel) {
  if (nodes.length === 0) return

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]

    if (matchNode(n, sel)) return modifyNode(n)

    if (!n.children) continue
    const cArr = n.children.filter((c) => typeof c === 'object')
    const found = findNode(cArr, sel)
    if (found) return found
  }
}

/**
 * Prepare a node for chaining.
 * @param {Node} node - The found node.
 * @returns {ModNode} The node after adding to it the chain properties.
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
  if (!this.children) return
  return findNode(
    this.children.filter((c) => typeof c === 'object'),
    sel
  )
}

/** @type {GetAttr} */
export function getAttr(key) {
  if (!this.attrs) return
  return this.attrs[key]
}

/** @type {GetText} */
export function getText(options) {
  if (!this.children || this.children.length === 0) return ''

  let text = ''
  for (let i = 0; i < this.children.length; i++) {
    const c = this.children[i]
    if (typeof c === 'string') text += c
    else if (options?.deep) text += getText.call(c, options)
  }

  return text
}
