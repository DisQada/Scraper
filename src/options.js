export {}

/** @typedef {string} HTMLStr */
/** @typedef {string} Str */

/**
 * @typedef {object} Selector
 * @property {HTMLTag} [tag] The tag name for the node to look for.
 * @property {AttrStr | AttrStr[]} [attr] The attributes to look for in a node.
 * @property {Selector | Selector[]} [child] The child nodes to look for in a node.
 */

/**
 * @typedef {Node & Mods} ModNode
 */

/**
 * @typedef {object} Mods
 * @property {GetChild} getChild Chain function to find a node in the children array.
 * @property {GetAttr} getAttr Chain function to get the value of an attribute.
 * @property {GetText} getText Property with the text in the node.
 */

/**
 * @typedef {Node | Str} Child
 */

/**
 * @typedef {object} Node
 * @property {HTMLTag} tag The HTML tag name.
 * @property {AttrsObj} [attrs] The attributes of the node.
 * @property {Child[]} [children] The children of the node.
 */

/**
 * @callback GetChild
 * @this {Node}
 * @param {Selector} selector
 * @returns {ModNode | undefined}
 */

/**
 * @callback GetAttr
 * @this {Node}
 * @param {AttrKey} key
 * @returns {AttrValue | undefined}
 */

/**
 * @callback GetText
 * @this {Node}
 * @param {TextOptions} [options]
 * @returns {string}
 */

/**
 * @typedef {object} TextOptions
 * @property {boolean} [deep] Whether to get the text of the children too.
 */

/**
 * Node attributes only
 * @typedef {{ [key: AttrKey]: AttrValue }} AttrsObj
 */

/**
 * Selector attributes only
 * @typedef {`${AttrKey}=${string}` | AttrKey} AttrStr
 */

/**
 * All valid HTML tag attribute keys.
 * @see https://www.w3schools.com/TAGs/ref_attributes.asp
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
 * @typedef {'accept' | 'accept-charset' | 'accesskey' | 'action' | 'align' | 'alt' | 'async' | 'autocapitalize' | 'autocomplete' | 'autofocus' | 'autoplay' | 'background' | 'bgcolor' | 'border' | 'buffered' | 'capture' | 'challenge' | 'charset' | 'checked' | 'cite' | 'class' | 'code' | 'codebase' | 'color' | 'cols' | 'colspan' | 'content' | 'contenteditable' | 'contextmenu' | 'controls' | 'coords' | 'crossorigin' | 'csp' | 'data' | 'datetime' | 'decoding' | 'default' | 'defer' | 'dir' | 'dirname' | 'disabled' | 'download' | 'draggable' | 'enctype' | 'enterkeyhint' | 'for' | 'form' | 'formaction' | 'formenctype' | 'formmethod' | 'formnovalidate' | 'formtarget' | 'headers' | 'height' | 'hidden' | 'high' | 'href' | 'hreflang' | 'http-equiv' | 'icon' | 'id' | 'importance' | 'integrity' | 'intrinsicsize' | 'inputmode' | 'is' | 'ismap' | 'itemprop' | 'keytype' | 'kind' | 'label' | 'lang' | 'language' | 'loading' | 'list' | 'loop' | 'low' | 'manifest' | 'max' | 'maxlength' | 'minlength' | 'media' | 'method' | 'min' | 'multiple' | 'muted' | 'name' | 'novalidate' | 'open' | 'optimum' | 'pattern' | 'ping' | 'placeholder' | 'playsinline' | 'poster' | 'preload' | 'radiogroup' | 'readonly' | 'referrerpolicy' | 'rel' | 'required' | 'reversed' | 'rows' | 'rowspan' | 'sandbox' | 'scope' | 'scoped' | 'selected' | 'shape' | 'size' | 'sizes' | 'slot' | 'span' | 'spellcheck' | 'src' | 'srcdoc' | 'srclang' | 'srcset' | 'start' | 'step' | 'style' | 'summary' | 'tabindex' | 'target' | 'title' | 'translate' | 'type' | 'usemap' | 'value' | 'width' | 'wrap' | string} AttrKey
 */

/**
 * @typedef {string | number | boolean | array | object} AttrValue
 */

/**
 * All valid HTML tags.
 * @see https://www.w3schools.com/TAGs/
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 * @typedef {"a" | "abbr" | "address" | "area" | "article" | "aside" | "audio" | "b" | "base" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "footer" | "form" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "input" | "ins" | "kbd" | "label" | "legend" | "li" | "link" | "main" | "map" | "mark" | "meta" | "meter" | "nav" | "noscript" | "object" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "progress" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "select" | "small" | "source" | "span" | "strong" | "style" | "sub" | "summary" | "sup" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr"} HTMLTag
 */
