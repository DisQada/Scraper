/** @import {Node, Selector, ModifiedENode, ElementNode, TextOptions, Key} from '../options.js' */
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

  if (!_nodes || _nodes.length === 0) {
    return
  }

  for (let i = 0; i < _nodes.length; i++) {
    const node = _nodes[i]
    if (node.type !== 'element') {
      continue
    }

    if (matchNode(node, sel)) {
      return modifyNode(node)
    }

    const found = findNode(node.children, sel)
    if (found !== undefined) {
      return found
    }
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
  node.child = (/** @type {Selector} */ selector) => findNode(node.children, selector)

  // @ts-expect-error
  node.attr = (/** @type {Key} */ key) => {
    const length = node.attributes.length
    if (length === 0) {
      return ''
    }

    for (let i = 0; i < length; i++) {
      const attr = node.attributes[i]
      if (attr.key === key) {
        return attr.value
      }
    }
  }

  // @ts-expect-error
  node.text = (/** @type {TextOptions | undefined} */ options) => {
    const length = node.children.length
    if (length === 0) {
      return ''
    }

    let text = ''
    for (let i = 0; i < length; i++) {
      const child = node.children[i]
      if (child.type === 'text') {
        text += child.content
      } else if (options && options.deep && child.type === 'element') {
        text += modifyNode(child).text(options)
      }
    }

    return text
  }

  // @ts-expect-error
  return node
}
