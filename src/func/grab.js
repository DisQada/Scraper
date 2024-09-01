/** @import {Node, ElementNode, Selector, TextOptions} from '../options.js' */
import { findNode } from './find.js'
import { parse } from 'himalaya'

/**
 * @param {string | ElementNode | Node[]} nodes - .
 * @param {Selector} sel - .
 * @param {TextOptions} [options] .
 * @returns {string | undefined} .
 */
export function grabText(nodes, sel, options) {
  /** @type {Node[]} */
  const _nodes = typeof nodes === 'string' ? parse(nodes) : nodes
  return findNode(_nodes, sel)?.text(options)
}

/**
 * @param {string | ElementNode | ElementNode[]} nodes - .
 * @param {Selector} sel - .
 * @param {string} attr .
 * @returns {string | undefined} .
 */
export function grabAttr(nodes, sel, attr) {
  /** @type {Node[]} */
  const _nodes = typeof nodes === 'string' ? parse(nodes) : nodes
  return findNode(_nodes, sel)?.attr(attr)
}
