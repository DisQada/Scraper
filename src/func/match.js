/** @import {Node, Attribute, ElementNode, ObjAttr, Selector} from '../options.js' */

/**
 * Check that the selector exist in the node.
 * @param {ElementNode} node - The node to match against the selector.
 * @param {Selector} sel - The selectors to look for in the node.
 * @returns {boolean} True if the selector exist in the node, false otherwise.
 * @private
 */
export function matchNode(node, sel) {
  if (sel.tag && sel.tag !== node.tagName) return false

  if (node.attributes && sel.attr) {
    if (Array.isArray(sel.attr)) {
      if (!attrsSubset(node.attributes, sel.attr)) return false
    } else if (!attrExists(node.attributes, sel.attr)) return false
  }

  if (node.children && sel.child) {
    if (Array.isArray(sel.child)) {
      if (!matchChildren(node.children, sel.child)) return false
    } else if (!matchChild(node.children, sel.child)) return false
  }

  return true
}

/**
 * Check that the `attrs` exist in the `nodeAttrs`.
 * @param {ObjAttr[]} nodeAttrs - The attributes array from a node.
 * @param {Attribute[]} attrs - The attributes to look for. (if array is empty then it'll check if `nodeAttrs` is empty too)
 * @returns {boolean} True if the selectorAttrs exist in the `nodeAttrs`, false otherwise.
 * @private
 */
export function attrsSubset(nodeAttrs, attrs) {
  if (nodeAttrs.length === 0) return true
  else if (attrs.length === 0) return false

  let nodeAttrsCopy = nodeAttrs.slice()
  let attrsCopy = toObjAttrs(attrs.slice())

  for (let i = 0; i < attrsCopy.length; i++) {
    if (attrExists(nodeAttrsCopy, attrsCopy[i])) {
      // TODO: Remove the found attribute from the copy arrays.
      // attrsCopy = attrsCopy.filter((a) => a.key !== attrsCopy[i].key)
      // nodeAttrsCopy = nodeAttrsCopy.filter((a) => a.key !== attrsCopy[i].key)
    } else return false
  }

  return true
}

/**
 * Check that the nodeAttrs has at least one attribute equal to the selectorAttr.
 * @param {ObjAttr[]} nodeAttrs - The attributes array from a node.
 * @param {Attribute} attr - The attribute to look for.
 * @returns {boolean} True if the nodeAttrs has at least one attribute equal to the selectorAttr, false otherwise.
 * @private
 */
export function attrExists(nodeAttrs, attr) {
  attr = toObjAttr(attr)

  const noValue = !('value' in attr)
  for (let i = 0; i < nodeAttrs.length; i++) {
    const nodeAttr = nodeAttrs[i]

    if (attr.key === nodeAttr.key && (noValue || attr.value === nodeAttr.value)) return true
  }

  return false
}

/**
 * @param {Attribute[]} attrs
 * @returns {ObjAttr[]}
 */
export function toObjAttrs(attrs) {
  for (let i = 0; i < attrs.length; i++) {
    attrs[i] = toObjAttr(attrs[i])
  }

  // @ts-expect-error
  return attrs
}

/**
 * @param {Attribute} attr
 * @returns {ObjAttr}
 */
export function toObjAttr(attr) {
  if (typeof attr !== 'string') return attr

  const pair = attr.split('=')
  const key = pair[0]
  const value = pair[1]
  return { key, value }
}

/**
 * Check that the `attrs` exist in the `nodeAttrs`.
 * @param {Node[]} nodes - The attributes array from a node.
 * @param {Selector[]} selectors - The attributes to look for. (if array is empty then it'll check if `nodeChildren` is empty too)
 * @returns {boolean} True if the selectorAttrs exist in the `nodeAttrs`, false otherwise.
 * @private
 */
export function matchChildren(nodes, selectors) {
  if (nodes.length === 0) return true
  else if (selectors.length === 0) return false

  for (let i = 0; i < selectors.length; i++) {
    if (!matchChild(nodes, selectors[i])) return false
  }

  return true
}

/**
 * Check that the nodeAttrs has at least one attribute equal to the selectorAttr.
 * @param {Node[]} nodes - The attributes array from a node.
 * @param {Selector} sel - The attribute to look for.
 * @returns {boolean} True if the nodeAttrs has at least one attribute equal to the selectorAttr, false otherwise.
 * @private
 */
export function matchChild(nodes, sel) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    if (node.type !== 'element') continue

    if (sel.tag && sel.tag !== node.tagName) continue

    if (node.attributes && sel.attr) {
      if (Array.isArray(sel.attr)) {
        if (!attrsSubset(node.attributes, sel.attr)) continue
      } else if (!attrExists(node.attributes, sel.attr)) continue
    }

    if (node.children && sel.child) {
      if (Array.isArray(sel.child)) {
        if (!matchChildren(node.children, sel.child)) continue
      } else if (!matchChild(node.children, sel.child)) continue
    }

    return true
  }

  return false
}
