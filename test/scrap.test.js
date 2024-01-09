/**
 * Check if a json is a valid Himalaya output
 * @param {import('../types/options').Node[]} nodes - the json to check (an array of nodes)
 * @returns {boolean} whether the json is a valid Himalaya output
 */
function isValidHimalayaNodesOutput(nodes) {
  return nodes.every(isValidHimalayaNodeOutput)

  /**
   * Check if a json is a valid Himalaya output
   * @param {import('../types/options').Node} node - the json to check (a single node)
   * @returns {boolean} whether the json is a valid Himalaya output
   */
  function isValidHimalayaNodeOutput(node) {
    if (typeof node !== 'object' || Array.isArray(node)) {
      return false
    }

    const acceptedTypes = ['element', 'text', 'comment']
    if (!acceptedTypes.includes(node.type)) {
      return false
    }

    switch (node.type) {
      case 'element':
        return (
          ['tagName', 'attributes', 'children'].every((prop) => prop in node) &&
          Array.isArray(node.attributes) &&
          node.attributes.every(
            (attr) =>
              typeof attr === 'object' && !Array.isArray(attr) && 'key' in attr
          ) &&
          Array.isArray(node.children) &&
          node.children.every((child) => isValidHimalayaNodeOutput(child))
        )

      case 'text':
      case 'comment':
        return 'content' in node && typeof node.content === 'string'
    }
  }
}

describe('scrap', () => {
  it('should be valid', () => {
    /** @type {import('../src/options').Node[]} */
    // @ts-expect-error
    const nodes = require('./scrap.json')
    expect(isValidHimalayaNodesOutput(nodes)).toBeTruthy()
  })
})
