/** @import {Node, Selector, TextOptions, HTMLStr} from '../options.js' */
import { findNode } from './find.js'
import { parse } from 'himalaya'

/**
 * @param {HTMLStr | Node[]} from
 * @param {Selector} sel
 * @returns {Node | {}}
 */
export function grabNode(from, sel) {
  return findNode(getNodes(from), sel) || {}
}

/**
 * @param {HTMLStr | Node[]} from
 * @param {Selector} sel
 * @param {Selector} cSel
 * @returns {Node | {}}
 */
export function grabChild(from, sel, cSel) {
  return findNode(getNodes(from), sel)?.getChild(cSel) || {}
}

/**
 * @param {HTMLStr | Node[]} from
 * @param {Selector} sel
 * @param {TextOptions} [options]
 * @returns {string}
 */
export function grabText(from, sel, options) {
  return findNode(getNodes(from), sel)?.getText(options) || ''
}

/**
 * @param {HTMLStr | Node[]} from
 * @param {Selector} sel
 * @param {string} attr
 * @returns {string}
 */
export function grabAttr(from, sel, attr) {
  return findNode(getNodes(from), sel)?.getAttr(attr) || ''
}

/**
 * @param {HTMLStr | Node[]} from
 * @returns {Node[]}
 */
function getNodes(from) {
  return typeof from === 'string' ? parse(from) : from
}
