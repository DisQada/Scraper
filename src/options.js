export {}

/**
 * A string representing HTML content.
 * @typedef {string} HTMLStr
 */

/**
 * Represents a selector used to find nodes in an HTML structure.
 * @typedef {object} Selector
 * @property {HTMLTag} [tag] The tag name for the node to look for.
 * @property {AttrStr | AttrStr[]} [attr] The attributes to look for in a node.
 * @property {Selector | Selector[]} [child] The child nodes to look for in a node.
 */

/**
 * Node with additional methods for manipulation.
 * @typedef {Node & Mods} ModNode
 */

/**
 * Additional methods for node manipulation.
 * @typedef {object} Mods
 * @property {GetChild} getChild Chain function to find a node in the children array.
 * @property {GetAttr} getAttr Chain function to get the value of an attribute.
 * @property {GetText} getText Property with the text in the node.
 */

/**
 * Child node, which can be a Node or a string.
 * @typedef {Node | string} Child
 */

/**
 * Represents an HTML node.
 * @typedef {object} Node
 * @property {HTMLTag} tag The HTML tag name.
 * @property {AttrsObj} [attrs] The attributes of the node.
 * @property {Child[]} [children] The children of the node.
 */

/**
 * Function to find a child node based on a selector.
 * @callback GetChild
 * @this {Node}
 * @param {Selector} sel The selector to find the child node.
 * @returns {ModNode | undefined} The found child node or undefined if not found.
 */

/**
 * Function to get the value of an attribute.
 * @callback GetAttr
 * @this {Node}
 * @param {AttrKey} key The key of the attribute.
 * @returns {AttrValue | undefined} The value of the attribute or undefined if not found.
 */

/**
 * Function to get the text content of a node.
 * @callback GetText
 * @this {Node}
 * @param {TextOptions} [options] Options for getting the text content.
 * @returns {string} The text content of the node.
 */

/**
 * Options for getting the text content of a node.
 * @typedef {object} TextOptions
 * @property {boolean} [deep] Whether to get the text of the children too.
 */

/**
 * Object containing node attributes.
 *
 * Used for node attributes only
 * @typedef {{ [key: AttrKey]: AttrValue }} AttrsObj
 */

/**
 * String defining an attribute key or key-value pair.
 *
 * Used for selector attributes only
 * @typedef {`${AttrKey}=${string}` | AttrKey} AttrStr
 */

/**
 * All valid HTML tag attribute keys.
 * @see https://www.w3schools.com/TAGs/ref_attributes.asp
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 * @typedef {'accept' | 'accept-charset' | 'accesskey' | 'action' | 'align' | 'alt' | 'async' | 'autocapitalize' | 'autocomplete' | 'autofocus' | 'autoplay' | 'background' | 'bgcolor' | 'border' | 'buffered' | 'capture' | 'challenge' | 'charset' | 'checked' | 'cite' | 'class' | 'code' | 'codebase' | 'color' | 'cols' | 'colspan' | 'content' | 'contenteditable' | 'contextmenu' | 'controls' | 'coords' | 'crossorigin' | 'csp' | 'data' | 'datetime' | 'decoding' | 'default' | 'defer' | 'dir' | 'dirname' | 'disabled' | 'download' | 'draggable' | 'enctype' | 'enterkeyhint' | 'for' | 'form' | 'formaction' | 'formenctype' | 'formmethod' | 'formnovalidate' | 'formtarget' | 'headers' | 'height' | 'hidden' | 'high' | 'href' | 'hreflang' | 'http-equiv' | 'icon' | 'id' | 'importance' | 'integrity' | 'intrinsicsize' | 'inputmode' | 'is' | 'ismap' | 'itemprop' | 'keytype' | 'kind' | 'label' | 'lang' | 'language' | 'loading' | 'list' | 'loop' | 'low' | 'manifest' | 'max' | 'maxlength' | 'minlength' | 'media' | 'method' | 'min' | 'multiple' | 'muted' | 'name' | 'novalidate' | 'open' | 'optimum' | 'pattern' | 'ping' | 'placeholder' | 'playsinline' | 'poster' | 'preload' | 'radiogroup' | 'readonly' | 'referrerpolicy' | 'rel' | 'required' | 'reversed' | 'rows' | 'rowspan' | 'sandbox' | 'scope' | 'scoped' | 'selected' | 'shape' | 'size' | 'sizes' | 'slot' | 'span' | 'spellcheck' | 'src' | 'srcdoc' | 'srclang' | 'srcset' | 'start' | 'step' | 'style' | 'summary' | 'tabindex' | 'target' | 'title' | 'translate' | 'type' | 'usemap' | 'value' | 'width' | 'wrap' | string} AttrKey
 */

/**
 * Value of an attribute.
 * @typedef {string | number | boolean | array | object} AttrValue
 */

/**
 * All valid HTML tags.
 * @see https://www.w3schools.com/TAGs/
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 * @typedef {"a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "meta" | "meter" | "nav" | "noscript" | "object" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr"} HTMLTag
 */
