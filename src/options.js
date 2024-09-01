export {}

/**
 * @typedef {ElementNode | TextNode | CommentNode} Node
 * @property {string} type The type of the node.
 * @property {object} [position] The position of the node.
 * @property {Position} position.start Where the node starts.
 * @property {Position} position.end Where the node ends.
 */

/**
 * @typedef {ElementNode & NodeModifications} ModifiedENode
 */

/**
 * @typedef {object} NodeModifications
 * @property {Child} child Chain function to find a node in the children array.
 * @property {Attr} attr Chain function to get the value of an attribute.
 * @property {Text} text Property with the text in the node.
 */

/**
 * @typedef {object} ElementNode
 * @property {"element"} type The type of the node.
 * @property {Tag} tagName The HTML tag name.
 * @property {ObjAttr[]} attributes The attributes of the node.
 * @property {Node[]} children The children of the node.
 */

/**
 * @callback Child
 * @param {Selector} selector
 * @returns {ModifiedENode | undefined}
 */

/**
 * @callback Attr
 * @param {Key} key
 * @returns {string | undefined}
 */

/**
 * @callback Text
 * @param {TextOptions} [options]
 * @returns {string}
 */

/**
 * @typedef {object} TextNode
 * @property {"text"} type The type of the node.
 * @property {string} content The text of the node.
 */

/**
 * @typedef {object} CommentNode
 * @property {"comment"} type The type of the node.
 * @property {string} content The text of the comment.
 */

/**
 * All valid HTML tags.
 * @typedef {"div" | "span" | "a" | "h1"| "h2"| "h3"| "h4"| "h5"| "h6" | string} Tag
 */

/**
 * All valid HTML tag attribute key.
 * @see https://www.w3schools.com/TAGs/
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 * @typedef {"class" | "id" | "href" | string}  Key
 */

/**
 * @typedef {object} TextOptions
 * @property {boolean} [deep] Whether to get the text of the children too.
 */

/**
 * @typedef {ObjAttr | StrAttr} Attribute
 */

/**
 * @typedef {`${Key}=${string}`} StrAttr
 */

/**
 * @typedef {object} ObjAttr
 * @property {Key} key The attribute name.
 * @property {string} [value] The value of the attribute.
 */

/**
 * @typedef {object} Position
 * @property {number} index The position of the attribute.
 * @property {number} line The position of the attribute.
 * @property {number} column The position of the attribute.
 * @private
 */

/**
 * @typedef {object} Selector
 * @property {Tag} [tag] The tag name for the node to look for.
 * @property {Attribute | Attribute[]} [attr] The attributes to look for in a node.
 * @property {Selector | Selector[]} [child] The child nodes to look for in a node.
 */

// TODO: Make selector use object instead of array of objects, the property name will be the key, and the value will be the value.
