const { findNode } = require('./func/find')
const { grabText, grabAttr } = require('./func/grab')

module.exports = {
  findNode,
  grabText,
  grabAttr
}

// BUG: 'himalaya' ignores any 'type' attrs in the html tag
// FIX: 'himalaya' adds empty array for 'attributes' and 'children' if they don't exist
