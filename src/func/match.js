/** @import { AttrsObj, Node, Child, Selector, AttrStr } from '../options.js' */
import { removeQuotes } from './util.js'

/**
 * Check if the selector matches the node.
 * @param {Node} node - The node to match against the selector.
 * @param {Selector} sel - The selectors to look for in the node.
 * @returns {boolean} True if the selector exist in the node, false otherwise.
 * @private
 */
export function matchNode(node, sel) {
  // If sel.tag is defined and it's not equal to n.tag, then skip this node.
  if (sel.tag && sel.tag !== node.tag) return false

  if (sel.attr) {
    // If node.attrs doesn't exist but sel.attr does, then this node doesn't match.
    if (!node.attrs) return false

    if (Array.isArray(sel.attr)) {
      // If sel.attr is an array and it's not a subset of n.attrs, then skip this node.
      if (!includesAttrs(node.attrs, sel.attr)) return false
      // If sel.attr doesn't exist in n.attrs, then skip this node.
    } else if (!includesAttr(node.attrs, sel.attr)) return false
  }

  if (sel.child) {
    // If node.children doesn't exist but sel.child does, then this node doesn't match.
    if (!node.children) return false

    if (Array.isArray(sel.child)) {
      // If sel.child is an array and it's not a subset of n.children, then skip this node.
      if (!matchChildren(node.children, sel.child)) return false
      // If sel.child is an object and it's not a subset of n.children, then skip this node.
    } else if (!matchChild(node.children, sel.child)) return false
  }

  // If no condition caused a skip, then return true.
  return true
}

/**
 * Check that the `attrs` exist in the `nodeAttrs`.
 * @param {AttrsObj} nodeAttrs - The attributes array from a node.
 * @param {AttrStr[]} selAttrs - The attributes to look for. (if array is empty then it'll check if `nodeAttrs` is empty too)
 * @returns {boolean} True if the selectorAttrs exist in the `nodeAttrs`, false otherwise.
 * @private
 */
export function includesAttrs(nodeAttrs, selAttrs) {
  const len = Object.keys(nodeAttrs).length

  if (selAttrs.length === 0) return true
  if (len === 0 || selAttrs.length > len) return false

  let nAttrs = { ...nodeAttrs }
  const sAttrs = [...selAttrs]

  for (let i = 0; i < sAttrs.length; i++) {
    if (!includesAttr(nAttrs, sAttrs[i])) return false
  }

  return true
}

/**
 * Check that the nodeAttrs has at least one attribute equal to the selectorAttr.
 * @param {AttrsObj} nodeAttrs - The attributes array from a node.
 * @param {AttrStr} selAttr - The attribute to look for.
 * @returns {boolean} True if the nodeAttrs has at least one attribute equal to the selectorAttr, false otherwise.
 * @private
 */
export function includesAttr(nodeAttrs, selAttr) {
  /** @type {[string, string|undefined]} */ // @ts-expect-error
  let [key, value] = selAttr.split('=')
  if (value === undefined) return key in nodeAttrs

  value = removeQuotes(value)
  return key in nodeAttrs && nodeAttrs[key] === value
}

/**
 * Check that the `attrs` exist in the `nodeAttrs`.
 * @param {Child[]} children - The attributes array from a node.
 * @param {Selector[]} selArr - The attributes to look for. (if array is empty then it'll check if `nodeChildren` is empty too)
 * @returns {boolean} True if the selectorAttrs exist in the `nodeAttrs`, false otherwise.
 * @private
 */
export function matchChildren(children, selArr) {
  if (selArr.length === 0) return true
  if (children.length === 0 || selArr.length > children.length) return false

  for (let i = 0; i < selArr.length; i++) {
    // If one child doesn't match, then return false.
    if (!matchChild(children, selArr[i])) return false
  }

  return true
}

/**
 * Check that the nodeAttrs has at least one attribute equal to the selectorAttr.
 * @param {Child[]} children - The attributes array from a node.
 * @param {Selector} sel - The attribute to look for.
 * @returns {boolean} True if the nodeAttrs has at least one attribute equal to the selectorAttr, false otherwise.
 * @private
 */
export function matchChild(children, sel) {
  for (let i = 0; i < children.length; i++) {
    const c = children[i]
    // If n is a text child, then skip it.
    if (typeof c === 'string') continue
    if (matchNode(c, sel)) return true
  }

  return false
}
