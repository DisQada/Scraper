/** @import { Attribute, AttrObj, ElementNode, Node, Selector } from '../options.js' */
import { removeQuotes } from './util.js'

/**
 * Check if the selector matches the node.
 * @param {ElementNode} node - The node to match against the selector.
 * @param {Selector} sel - The selectors to look for in the node.
 * @returns {boolean} True if the selector exist in the node, false otherwise.
 * @private
 */
export function matchNode(node, sel) {
  // If sel.tag is defined and it's not equal to n.tag, then skip this node.
  if (sel.tag && sel.tag !== node.tagName) return false

  if (sel.attr) {
    if (Array.isArray(sel.attr)) {
      // If sel.attr is an array and it's not a subset of n.attrs, then skip this node.
      if (!includesAttrs(node.attributes, sel.attr)) return false
      // If sel.attr doesn't exist in n.attrs, then skip this node.
    } else if (!includesAttr(node.attributes, sel.attr)) return false
  }

  if (sel.child) {
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
 * @param {AttrObj[]} nodeAttrs - The attributes array from a node.
 * @param {Attribute[]} selAttrs - The attributes to look for. (if array is empty then it'll check if `nodeAttrs` is empty too)
 * @returns {boolean} True if the selectorAttrs exist in the `nodeAttrs`, false otherwise.
 * @private
 */
export function includesAttrs(nodeAttrs, selAttrs) {
  if (selAttrs.length === 0) return true
  if (selAttrs.length > nodeAttrs.length) return false

  let nAttrsCopy = nodeAttrs.slice()
  const attrsTuples = toObjAttrs(selAttrs.slice())

  for (let i = 0; i < attrsTuples.length; i++) {
    if (!includesAttr(nAttrsCopy, attrsTuples[i])) return false
  }

  return true
}

/**
 * Check that the nodeAttrs has at least one attribute equal to the selectorAttr.
 * @param {AttrObj[]} nodeAttrs - The attributes array from a node.
 * @param {Attribute} selAttr - The attribute to look for.
 * @returns {boolean} True if the nodeAttrs has at least one attribute equal to the selectorAttr, false otherwise.
 * @private
 */
export function includesAttr(nodeAttrs, selAttr) {
  selAttr = /** @type {AttrObj} */ (toObjAttr(selAttr))

  for (let i = 0; i < nodeAttrs.length; i++) {
    const { key, value } = nodeAttrs[i]
    if (selAttr.key === key && (selAttr.value === undefined || selAttr.value === value)) return true
  }

  return false
}

/**
 * @param {Attribute[]} attrs
 * @returns {AttrObj[]}
 */
export function toObjAttrs(attrs) {
  for (let i = 0; i < attrs.length; i++) attrs[i] = toObjAttr(attrs[i])
  // @ts-expect-error
  return attrs
}

/**
 * @param {Attribute} attr
 * @returns {AttrObj}
 */
export function toObjAttr(attr) {
  if (typeof attr === 'object') return attr

  let [key, value] = attr.split('=')
  if (value) value = removeQuotes(value)
  return { key, value }
}

/**
 * Check that the `attrs` exist in the `nodeAttrs`.
 * @param {Node[]} children - The attributes array from a node.
 * @param {Selector[]} selArr - The attributes to look for. (if array is empty then it'll check if `nodeChildren` is empty too)
 * @returns {boolean} True if the selectorAttrs exist in the `nodeAttrs`, false otherwise.
 * @private
 */
export function matchChildren(children, selArr) {
  if (selArr.length === 0) return true
  if (selArr.length > children.length) return false

  for (let i = 0; i < selArr.length; i++) {
    // If one child doesn't match, then return false.
    if (!matchChild(children, selArr[i])) return false
  }

  return true
}

/**
 * Check that the nodeAttrs has at least one attribute equal to the selectorAttr.
 * @param {Node[]} children - The attributes array from a node.
 * @param {Selector} sel - The attribute to look for.
 * @returns {boolean} True if the nodeAttrs has at least one attribute equal to the selectorAttr, false otherwise.
 * @private
 */
export function matchChild(children, sel) {
  for (let i = 0; i < children.length; i++) {
    const c = children[i]
    // If n is a text child, then skip it.
    if (c.type !== 'element') continue
    if (matchNode(c, sel)) return true
  }

  return false
}
