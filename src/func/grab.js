const { findNode } = require('./find')
const { parse } = require('himalaya')

/**
 * @param {string | import('../options').ElementNode | import('../options').Node[]} nodes - .
 * @param {import('../options').Selector} sel - .
 * @param {import('../options').TextOptions} [options] .
 * @returns {string | undefined} .
 */
function grabText(nodes, sel, options) {
  /** @type {import('../options').Node[]} */
  const _nodes = typeof nodes === 'string' ? parse(nodes) : nodes
  return findNode(_nodes, sel)?.text(options)
}

/**
 * @param {string | import('../options').ElementNode | import('../options').ElementNode[]} nodes - .
 * @param {import('../options').Selector} sel - .
 * @param {string} attr .
 * @returns {string | undefined} .
 */
function grabAttr(nodes, sel, attr) {
  /** @type {import('../options').Node[]} */
  const _nodes = typeof nodes === 'string' ? parse(nodes) : nodes
  return findNode(_nodes, sel)?.attr(attr)
}

module.exports = {
  grabText,
  grabAttr
}
