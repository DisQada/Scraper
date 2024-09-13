/** @import { AttrKey, AttrValue, HTMLStr, Node, Selector, TextOptions } from '../options.js' */
import { parse } from 'himalaya'
import { findNode } from './find.js'

/**
 * Grabs a node from the given HTML string or node array based on the selector.
 * @param {HTMLStr | Node[]} from - The HTML string or node array to search in.
 * @param {Selector} sel - The selector defining the node to be returned.
 * @returns {Node | {}} The found node or an empty object if not found.
 */
export function grabNode(from, sel) {
  return findNode(getNodes(from), sel) || {}
}

/**
 * Grabs a node from the given HTML string or node array based on the selector.
 * @param {HTMLStr | Node[]} from - The HTML string or node array to search in.
 * @param {Selector} sel - The selector defining the node to be returned.
 * @param {Selector} cSel - The selector defining the child to be returned.
 * @returns {Node | {}} The found node or an empty object if not found.
 */
export function grabChild(from, sel, cSel) {
  return findNode(getNodes(from), sel)?.getChild(cSel) || {}
}

/**
 * Grabs an attribute value from the given HTML string or node array based on the selector.
 * @param {HTMLStr | Node[]} from - The HTML string or node array to search in.
 * @param {Selector} sel - The selector defining the node.
 * @param {AttrKey} attr - The attribute key whose value is to be returned.
 * @returns {AttrValue} The value of the attribute or an empty string if not found.
 */
export function grabAttr(from, sel, attr) {
  return findNode(getNodes(from), sel)?.getAttr(attr) || ''
}

/**
 * Grabs the text content from the given HTML string or node array based on the selector.
 * @param {HTMLStr | Node[]} from - The HTML string or node array to search in.
 * @param {Selector} sel - The selector defining the node.
 * @param {TextOptions} [options] - Options for getting the text content.
 * @returns {string} The text content of the node or an empty string if not found.
 */
export function grabText(from, sel, options) {
  return findNode(getNodes(from), sel)?.getText(options) || ''
}

/**
 * Parses the HTML string or returns the node array.
 * @param {HTMLStr | Node[]} from - The HTML string or node array to search in.
 * @returns {Node[]} The node array.
 */
function getNodes(from) {
  return typeof from === 'string' ? parse(from) : from
}
