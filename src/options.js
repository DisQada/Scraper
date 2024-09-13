export {}

/** @typedef {string} HTMLStr */

/**
 * @typedef {ElementNode | TextNode | CommentNode} Node
 * @property {string} type The type of the node.
 */

/**
 * @typedef {ElementNode & NodeModifications} ModifiedENode
 */

/**
 * @typedef {object} NodeModifications
 * @property {GetChild} getChild Chain function to find a node in the children array.
 * @property {GetAttr} getAttr Chain function to get the value of an attribute.
 * @property {GetText} getText Property with the text in the node.
 */

/**
 * @typedef {object} ElementNode
 * @property {'element'} type The type of the node.
 * @property {Tag} tagName The HTML tag name.
 * @property {AttrObj[]} attributes The attributes of the node.
 * @property {Node[]} children The children of the node.
 */

/**
 * @callback GetChild
 * @this {ElementNode}
 * @param {Selector} selector
 * @returns {ModifiedENode | undefined}
 */

/**
 * @callback GetAttr
 * @this {ElementNode}
 * @param {AttrKey} key
 * @returns {AttrValue | undefined}
 */

/**
 * @callback GetText
 * @this {ElementNode}
 * @param {TextOptions} [options]
 * @returns {string}
 */

/**
 * @typedef {object} TextNode
 * @property {'text'} type The type of the node.
 * @property {string} content The text of the node.
 */

/**
 * @typedef {object} CommentNode
 * @property {'comment'} type The type of the node.
 * @property {string} content The text of the comment.
 */

/**
 * All valid HTML tags.
 * @see https://www.w3schools.com/TAGs/
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 * @typedef {"a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "meta" | "meter" | "nav" | "noscript" | "object" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr"} HTMLTag
 */

/**
 * All valid HTML tag attribute keys.
 * @see https://www.w3schools.com/TAGs/ref_attributes.asp
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 * @typedef {'accept' | 'accept-charset' | 'accesskey' | 'action' | 'align' | 'alt' | 'async' | 'autocapitalize' | 'autocomplete' | 'autofocus' | 'autoplay' | 'background' | 'bgcolor' | 'border' | 'buffered' | 'capture' | 'challenge' | 'charset' | 'checked' | 'cite' | 'class' | 'code' | 'codebase' | 'color' | 'cols' | 'colspan' | 'content' | 'contenteditable' | 'contextmenu' | 'controls' | 'coords' | 'crossorigin' | 'csp' | 'data' | 'datetime' | 'decoding' | 'default' | 'defer' | 'dir' | 'dirname' | 'disabled' | 'download' | 'draggable' | 'enctype' | 'enterkeyhint' | 'for' | 'form' | 'formaction' | 'formenctype' | 'formmethod' | 'formnovalidate' | 'formtarget' | 'headers' | 'height' | 'hidden' | 'high' | 'href' | 'hreflang' | 'http-equiv' | 'icon' | 'id' | 'importance' | 'integrity' | 'intrinsicsize' | 'inputmode' | 'is' | 'ismap' | 'itemprop' | 'keytype' | 'kind' | 'label' | 'lang' | 'language' | 'loading' | 'list' | 'loop' | 'low' | 'manifest' | 'max' | 'maxlength' | 'minlength' | 'media' | 'method' | 'min' | 'multiple' | 'muted' | 'name' | 'novalidate' | 'open' | 'optimum' | 'pattern' | 'ping' | 'placeholder' | 'playsinline' | 'poster' | 'preload' | 'radiogroup' | 'readonly' | 'referrerpolicy' | 'rel' | 'required' | 'reversed' | 'rows' | 'rowspan' | 'sandbox' | 'scope' | 'scoped' | 'selected' | 'shape' | 'size' | 'sizes' | 'slot' | 'span' | 'spellcheck' | 'src' | 'srcdoc' | 'srclang' | 'srcset' | 'start' | 'step' | 'style' | 'summary' | 'tabindex' | 'target' | 'title' | 'translate' | 'type' | 'usemap' | 'value' | 'width' | 'wrap' | string} AttrKey
 */

/**
 * @typedef {object} TextOptions
 * @property {boolean} [deep] Whether to get the text of the children too.
 */

/**
 * @typedef {AttrObj | AttrStr} Attribute
 */

/**
 * @typedef {`${AttrKey}=${AttrValue}`} AttrStr
 */

/**
 * @typedef {object} AttrObj
 * @property {AttrKey} key The attribute name.
 * @property {AttrValue} [value] The value of the attribute.
 */

/**
 * @typedef {string | number | boolean | array | object} AttrValue
 */

/**
 * @typedef {object} Selector
 * @property {Tag} [tag] The tag name for the node to look for.
 * @property {Attribute | Attribute[]} [attr] The attributes to look for in a node.
 * @property {Selector | Selector[]} [child] The child nodes to look for in a node.
 */

// TODO: Make selector use object instead of array of objects, the property name will be the key, and the value will be the value.
