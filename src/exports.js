export { findNode } from './func/find.js'
export { grabText, grabAttr } from './func/grab.js'

// BUG: 'himalaya' ignores any 'type' attrs in the html tag
// FIX: 'himalaya' adds empty array for 'attributes' and 'children' if they don't exist
